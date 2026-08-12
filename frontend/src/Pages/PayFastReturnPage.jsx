import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const PayFastReturnPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (status === "success") {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
  }, [status, dispatch]);

  const pageWrapper = "min-h-screen bg-vintage-cream flex items-center justify-center py-12 px-4";
  const cardWrapper = "w-full max-w-lg bg-white p-10 rounded-sm border border-vintage-sand text-center";

  if (status === "success") {
    return (
      <div className={pageWrapper}>
        <div className={cardWrapper}>
          <div className="vintage-divider mb-6">
            <span className="vintage-divider-mark"></span>
          </div>
          <h1 className="font-display text-3xl text-vintage-obsidian mb-4">Payment Successful</h1>
          <p className="text-vintage-umber/70 mb-8">
            Your PayFast payment was confirmed and your order has been placed.
          </p>
          {orderId && (
            <p className="text-sm text-vintage-umber/50 mb-8">Order ID: {orderId}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/my-orders"
              className="bg-vintage-obsidian text-vintage-cream hover:bg-vintage-gold px-6 py-3 rounded-sm uppercase text-sm tracking-widest transition-all duration-200"
            >
              View My Orders
            </Link>
            <Link
              to="/collections/all"
              className="border border-vintage-sand hover:border-vintage-gold text-vintage-umber px-6 py-3 rounded-sm uppercase text-sm tracking-widest transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      <div className={cardWrapper}>
        <h1 className="font-display text-3xl text-vintage-obsidian mb-4">Payment Not Completed</h1>
        <p className="text-vintage-umber/70 mb-2">
          {status === "failed" ? "Your PayFast payment was not successful." : "Something went wrong verifying your payment."}
        </p>
        {reason && <p className="text-sm text-vintage-umber/50 mb-8">{reason}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-vintage-obsidian text-vintage-cream hover:bg-vintage-gold px-6 py-3 rounded-sm uppercase text-sm tracking-widest transition-all duration-200"
          >
            Retry Checkout
          </button>
          <Link
            to="/"
            className="border border-vintage-sand hover:border-vintage-gold text-vintage-umber px-6 py-3 rounded-sm uppercase text-sm tracking-widest transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PayFastReturnPage;
