import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const navigate = useNavigate();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && drawerOpen) {
        toggleCartDrawer();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [drawerOpen, toggleCartDrawer]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/register?redirect=/checkout");
    }
  };

  const calculateSubtotal = () => {
    if (cart?.products && cart.products.length > 0) {
      const subtotal = cart.products.reduce(
        (total, product) => total + (Number(product.price) || 0) * (Number(product.quantity) || 1),
        0
      );
      return Number(subtotal || 0).toFixed(2);
    }
    return "0.00";
  };

  const subtotal = calculateSubtotal();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-vintage-cream shadow-xl flex flex-col z-50"
          >
            <div className="flex justify-between items-center p-6 border-b border-vintage-sand">
              <h2 className="font-display text-xl text-vintage-obsidian">Your Bag</h2>
              <button
                onClick={toggleCartDrawer}
                className="text-vintage-umber hover:text-vintage-gold transition-colors duration-200 p-1 rounded-full"
                aria-label="Close cart"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto">
              {cart?.products?.length > 0 ? (
                <CartContents cart={cart} userId={userId} guestId={guestId} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-vintage-umber/60 mb-4 text-lg">Your bag is empty</p>
                  <button
                    onClick={toggleCartDrawer}
                    className="text-vintage-gold hover:text-vintage-umber font-medium uppercase text-sm tracking-widest transition-colors duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {cart?.products?.length > 0 && (
              <div className="p-6 border-t border-vintage-sand bg-vintage-cream sticky bottom-0">
                <div className="flex justify-between mb-4">
                  <span className="text-vintage-umber/70">Subtotal</span>
                  <span className="font-medium text-vintage-obsidian">Rs. {subtotal}</span>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-vintage-obsidian hover:bg-vintage-gold text-vintage-cream py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-colors duration-200"
                >
                  Proceed to Checkout
                </motion.button>
                <p className="text-xs text-vintage-umber/50 mt-3 text-center">
                  Shipping and payment calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
