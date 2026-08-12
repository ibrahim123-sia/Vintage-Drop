import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [dispatch, checkout, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  const pageWrapper = "min-h-screen bg-vintage-cream py-12 px-4 sm:px-6 lg:px-8";
  const contentWrapper = "w-full max-w-4xl bg-white p-8 rounded-sm shadow-sm border border-vintage-sand mx-auto";
  const headingPrimary = "font-display text-3xl sm:text-4xl text-center text-vintage-obsidian mb-8";
  const headingSecondary = "text-xl font-semibold text-vintage-obsidian mb-4";
  const textMuted = "text-vintage-umber/70 text-sm";
  const successText = "text-vintage-gold text-sm font-medium";

  return (
    <div className={pageWrapper}>
      <div className={contentWrapper}>
        <h1 className={headingPrimary}>Thank You For Your Order</h1>

        {checkout && (
          <div className="space-y-8">
            <div className="vintage-divider">
              <span className="vintage-divider-mark"></span>
            </div>

            <div className="flex justify-between items-start flex-wrap gap-6 p-6 bg-vintage-cream rounded-sm border border-vintage-sand">
              <div>
                <h2 className="text-lg font-semibold text-vintage-obsidian">Order ID: {checkout._id}</h2>
                <p className={textMuted}>
                  Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className={successText}>
                  Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <h3 className={headingSecondary}>Ordered Items</h3>
              <div className="space-y-4">
                {checkout.checkoutItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-4 border border-vintage-sand rounded-sm bg-white hover:border-vintage-gold transition duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-sm border border-vintage-sand"
                      />
                      <div>
                        <h4 className="text-md font-medium text-vintage-obsidian">{item.name}</h4>
                        <p className="text-sm text-vintage-umber/60">
                          {[item.material, item.size].filter(Boolean).join(" | ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-medium text-vintage-gold">Rs. {item.price}</p>
                      <p className="text-sm text-vintage-umber/60">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-sm border border-vintage-sand">
                <h4 className="text-lg font-semibold mb-3 text-vintage-obsidian">Payment</h4>
                <p className={textMuted}>
                  {checkout.paymentMethod === "PayFast" ? "PayFast" : "Cash on Delivery"}
                </p>
              </div>

              <div className="p-6 bg-white rounded-sm border border-vintage-sand">
                <h4 className="text-lg font-semibold mb-3 text-vintage-obsidian">Delivery Address</h4>
                <p className={textMuted}>{checkout.shippingAddress.address}</p>
                <p className={textMuted}>
                  {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
                </p>
                {checkout.shippingAddress.postalCode && (
                  <p className={textMuted}>Postal Code: {checkout.shippingAddress.postalCode}</p>
                )}
              </div>
            </div>

            <div className="p-6 bg-vintage-cream rounded-sm border border-vintage-sand">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-vintage-obsidian">Total Amount</h4>
                <p className="text-xl font-bold text-vintage-gold">Rs. {checkout.totalPrice}</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => navigate("/collections/all")}
                className="bg-vintage-obsidian text-vintage-cream hover:bg-vintage-gold py-3 px-8 rounded-sm font-medium uppercase text-sm tracking-widest transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
