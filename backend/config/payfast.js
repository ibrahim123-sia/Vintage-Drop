const merchantId = process.env.PAYFAST_MERCHANT_ID;
const securedKey = process.env.PAYFAST_SECURED_KEY;
const storeId = process.env.PAYFAST_STORE_ID;
const returnUrl = process.env.PAYFAST_RETURN_URL;
const checkoutUrl = process.env.PAYFAST_CHECKOUT_URL;
const frontendUrl = process.env.FRONTEND_URL;

const isConfigured = Boolean(
  merchantId && securedKey && returnUrl && checkoutUrl
);

module.exports = {
  merchantId,
  securedKey,
  storeId,
  returnUrl,
  checkoutUrl,
  frontendUrl,
  isConfigured,
};
