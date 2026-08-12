const express = require("express");
const Checkout = require("../models/Checkout");
const { protect } = require("../middleware/authMiddleware");
const payfastConfig = require("../config/payfast");
const { generateSignature, verifySignature } = require("../utils/payfastHash");
const { markCheckoutPaidAndFinalize } = require("../utils/checkoutHelpers");

const router = express.Router();

// yyyy-MM-dd, the date format PayFast's API expects for ORDER_DATE
const formatPayFastDate = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

//@route GET /api/payfast/config-status
//@desc  lets the frontend know whether PayFast is configured, so it can
//       hide the option entirely instead of erroring when it isn't
//@access public
router.get("/config-status", (req, res) => {
  res.json({ enabled: payfastConfig.isConfigured });
});

//@route POST /api/payfast/initiate
//@desc  build the signed PayFast hosted-checkout form fields for a checkout
//@access private
router.post("/initiate", protect, async (req, res) => {
  if (!payfastConfig.isConfigured) {
    return res.status(503).json({ message: "PayFast is not configured" });
  }

  const { checkoutId } = req.body;

  try {
    const checkout = await Checkout.findById(checkoutId);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!checkout.user.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized for this checkout" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    const now = new Date();
    const basketId = `VTD${Date.now()}${checkout._id.toString().slice(-6)}`;

    const fields = {
      MERCHANT_ID: payfastConfig.merchantId,
      STORE_ID: payfastConfig.storeId || "",
      BASKET_ID: basketId,
      TXNAMT: String(checkout.totalPrice),
      CURRENCY_CODE: "PKR",
      ORDER_DATE: formatPayFastDate(now),
      SUCCESS_URL: payfastConfig.returnUrl,
      FAILURE_URL: payfastConfig.returnUrl,
      CHECKOUT_URL: payfastConfig.checkoutUrl,
      CUSTOMER_EMAIL_ADDRESS: req.user.email || "",
      TXNDESC: `The Vintage Drop Order ${checkout._id}`,
    };

    fields.SIGNATURE = generateSignature(fields, payfastConfig.securedKey);

    checkout.paymentMethod = "PayFast";
    checkout.paymentDetails = { basketId };
    await checkout.save();

    res.json({ actionUrl: payfastConfig.checkoutUrl, fields });
  } catch (error) {
    console.error("PayFast initiate error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//@route POST /api/payfast/callback
//@desc  PayFast posts the transaction result here (x-www-form-urlencoded)
//@access public (verified via SIGNATURE, not auth)
router.post("/callback", async (req, res) => {
  const frontendUrl = payfastConfig.frontendUrl || "/";

  try {
    if (!payfastConfig.isConfigured) {
      return res.redirect(`${frontendUrl}/payfast-return?status=error&reason=not-configured`);
    }

    const isValid = verifySignature(req.body, payfastConfig.securedKey);
    if (!isValid) {
      console.error("PayFast callback: signature verification failed");
      return res.redirect(`${frontendUrl}/payfast-return?status=error&reason=signature-mismatch`);
    }

    const checkout = await Checkout.findOne({
      "paymentDetails.basketId": req.body.BASKET_ID,
    });

    if (!checkout) {
      return res.redirect(`${frontendUrl}/payfast-return?status=error&reason=checkout-not-found`);
    }

    const responseCode = req.body.RESPONSE_CODE || req.body.TRAN_STATUS;
    const isSuccess = responseCode === "00" || responseCode === "0" || responseCode === "A";

    if (isSuccess) {
      const { order } = await markCheckoutPaidAndFinalize(checkout._id, {
        method: "PayFast",
        ...req.body,
      });
      return res.redirect(
        `${frontendUrl}/payfast-return?status=success&orderId=${order ? order._id : checkout._id}`
      );
    }

    return res.redirect(
      `${frontendUrl}/payfast-return?status=failed&reason=${encodeURIComponent(
        req.body.ERROR_MESSAGE || req.body.RESPONSE_MESSAGE || "Payment failed"
      )}`
    );
  } catch (error) {
    console.error("PayFast callback error:", error);
    return res.redirect(`${frontendUrl}/payfast-return?status=error&reason=server-error`);
  }
});

module.exports = router;
