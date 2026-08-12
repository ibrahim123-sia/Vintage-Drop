import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiMinus, FiPlus, FiLoader } from "react-icons/fi";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { fallbackProducts } from "../../data/fallbackProducts";

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  const product =
    selectedProduct ||
    fallbackProducts.find((p) => p._id === productFetchId) ||
    fallbackProducts[0];

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
    setSelectedMaterial("");
    setSelectedSize("");
  }, [product]);

  const handleQuantityChange = (action) => {
    if (action === "increment") setQuantity((prev) => prev + 1);
    if (action === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const needsMaterial = product?.material?.length > 0;
  const needsSize = product?.size?.length > 0;

  const handleAddToCart = () => {
    if (needsMaterial && !selectedMaterial) {
      toast.error("Please select a material");
      return;
    }
    if (needsSize && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        material: selectedMaterial,
        size: selectedSize,
        guestId,
        userId: user?._id,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Added to bag");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add to bag");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <FiLoader className="animate-spin h-10 w-10 text-vintage-gold" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const addToCartDisabled =
    isButtonDisabled || (needsMaterial && !selectedMaterial) || (needsSize && !selectedSize);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-vintage-cream">
      <div className="bg-white rounded-sm border border-vintage-sand overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image.url)}
                  className={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${
                    mainImage === image.url
                      ? "border-vintage-gold"
                      : "border-transparent hover:border-vintage-sand"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="relative w-full">
              <div className="aspect-[4/5] bg-vintage-sand/30 rounded-sm overflow-hidden flex items-center justify-center">
                <img
                  src={mainImage || product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-vintage-gold mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-vintage-obsidian mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                {product.discountPrice && (
                  <span className="text-lg text-vintage-umber/40 line-through">
                    Rs. {Number(product.price || 0).toFixed(2)}
                  </span>
                )}
                <span className="text-2xl font-semibold text-vintage-gold">
                  Rs. {Number(product.discountPrice || product.price || 0).toFixed(2)}
                </span>
              </div>

              <p className="text-vintage-umber/80 mt-6 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Material Selection */}
            {needsMaterial && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-vintage-obsidian mb-3 uppercase tracking-widest">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.material?.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedMaterial(option)}
                      className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                        selectedMaterial === option
                          ? "bg-vintage-obsidian text-vintage-cream border-vintage-obsidian"
                          : "bg-white text-vintage-umber border-vintage-sand hover:border-vintage-gold"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {needsSize && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-vintage-obsidian mb-3 uppercase tracking-widest">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.size?.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedSize(option)}
                      className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                        selectedSize === option
                          ? "bg-vintage-obsidian text-vintage-cream border-vintage-obsidian"
                          : "bg-white text-vintage-umber border-vintage-sand hover:border-vintage-gold"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-vintage-obsidian mb-3 uppercase tracking-widest">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity <= 1}
                  className="p-2 rounded-sm border border-vintage-sand text-vintage-umber hover:border-vintage-gold disabled:opacity-50 transition-colors"
                >
                  <FiMinus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium text-vintage-obsidian">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="p-2 rounded-sm border border-vintage-sand text-vintage-umber hover:border-vintage-gold transition-colors"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addToCartDisabled}
              className={`w-full py-4 px-6 rounded-sm font-medium uppercase tracking-widest transition-all ${
                isButtonDisabled
                  ? "bg-vintage-umber/40 cursor-not-allowed text-vintage-cream"
                  : "bg-vintage-obsidian hover:bg-vintage-gold text-vintage-cream"
              } ${addToCartDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Bag"}
            </button>

            <div className="mt-12 border-t border-vintage-sand pt-8">
              <h3 className="text-xl font-display text-vintage-obsidian mb-6">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-vintage-umber/50 mb-1">Brand</p>
                  <p className="text-vintage-umber">{product.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-vintage-umber/50 mb-1">Style</p>
                  <p className="text-vintage-umber">{product.occasion?.join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-vintage-umber/50 mb-1">Color</p>
                  <p className="text-vintage-umber">{product.color?.join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-vintage-umber/50 mb-1">Collection</p>
                  <p className="text-vintage-umber">{product.collections}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="border-t border-vintage-sand px-8 py-12 bg-vintage-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-2xl text-vintage-obsidian mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts} loading={false} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
