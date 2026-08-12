import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = ({ productId, delta, quantity, material, size }) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          material,
          size,
        })
      );
    }
  };

  const handleRemoveFromCart = ({ productId, material, size }) => {
    dispatch(
      removeFromCart({ productId, guestId, userId, material, size })
    );
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b border-vintage-sand">
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded-sm"
            />
            <div>
              <h3 className="text-vintage-obsidian font-medium">{product.name}</h3>
              <p className="text-sm text-vintage-umber/60">
                {[product.material, product.size].filter(Boolean).join(" | ")}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleQuantityChange({
                      productId: product.productId,
                      delta: -1,
                      quantity: product.quantity,
                      material: product.material,
                      size: product.size,
                    })
                  }
                  className="border border-vintage-sand rounded-sm px-2 py-1 text-lg font-medium text-vintage-umber hover:border-vintage-gold"
                >
                  -
                </button>
                <span className="mx-4 text-vintage-obsidian">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange({
                      productId: product.productId,
                      delta: 1,
                      quantity: product.quantity,
                      material: product.material,
                      size: product.size,
                    })
                  }
                  className="border border-vintage-sand rounded-sm px-2 py-1 text-lg font-medium text-vintage-umber hover:border-vintage-gold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-vintage-gold font-medium">Rs. {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart({
                  productId: product.productId,
                  material: product.material,
                  size: product.size,
                })
              }
            >
              <RiDeleteBin3Line className="h-5 w-5 mt-2 text-red-500 hover:text-red-700" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
