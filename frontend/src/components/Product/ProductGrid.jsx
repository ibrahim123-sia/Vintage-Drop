import React from "react";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { fallbackProducts } from "../../data/fallbackProducts";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] py-12">
        <div className="flex flex-col items-center text-vintage-gold">
          <FiLoader className="animate-spin h-10 w-10 mb-4" />
          <p className="text-lg text-vintage-umber">Loading...</p>
        </div>
      </div>
    );
  }

  const productList = (Array.isArray(products) && products.length > 0) ? products : fallbackProducts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {productList.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group block outline-none"
        >
          <div className="bg-white rounded-2xl overflow-hidden border border-vintage-sand/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/5] overflow-hidden bg-vintage-sand/20">
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              {product.discountPrice && (
                <div className="absolute top-3 left-3 bg-vintage-obsidian/90 backdrop-blur-sm text-vintage-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-vintage-gold/30">
                  Sale
                </div>
              )}
            </div>

            <div className="p-5 text-center">
              <span className="text-[10px] font-bold text-vintage-gold uppercase tracking-widest block mb-1">
                {product.category || "Vintage Find"}
              </span>
              <h3 className="font-display text-base font-bold tracking-wide text-vintage-obsidian mb-1.5 line-clamp-1 group-hover:text-vintage-gold transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-xs text-vintage-umber/60 mb-3">
                {product.material?.[0]}
                {product.occasion?.[0] ? ` · ${product.occasion[0]}` : ""}
              </p>
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-vintage-sand/30">
                {product.discountPrice && (
                  <span className="text-xs text-vintage-umber/40 line-through font-medium">
                    Rs. {Number(product.price || 0).toFixed(2)}
                  </span>
                )}
                <span className="text-vintage-gold font-bold text-sm">
                  Rs. {Number(product.discountPrice || product.price || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
