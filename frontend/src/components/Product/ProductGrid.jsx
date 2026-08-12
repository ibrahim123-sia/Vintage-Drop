import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fallbackProducts } from "../../data/fallbackProducts";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import { fadeUp, staggerContainer } from "../../utils/motion";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  const productList = (Array.isArray(products) && products.length > 0) ? products : fallbackProducts;

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer(0.08)}
    >
      {productList.map((product) => (
        <motion.div key={product._id} variants={fadeUp}>
          <Link to={`/product/${product._id}`} className="group block outline-none">
            <div className="bg-white rounded-2xl overflow-hidden border border-vintage-sand/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden bg-vintage-sand/20">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.images?.[0]?.altText || product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.discountPrice && (
                  <div className="absolute top-3 left-3 bg-vintage-obsidian/90 backdrop-blur-sm text-vintage-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-vintage-gold/30 animate-pulse">
                    Sale
                  </div>
                )}
              </div>

              <div className="p-5 text-center">
                <span className="text-[10px] font-bold text-vintage-gold uppercase tracking-widest block mb-1">
                  {product.category || "Vintage Find"}
                </span>
                <h3 className="relative inline-block font-display text-base font-bold tracking-wide text-vintage-obsidian mb-1.5 line-clamp-1 group-hover:text-vintage-gold transition-colors duration-200">
                  {product.name}
                  <span className="absolute left-0 -bottom-0.5 h-px w-full bg-vintage-gold scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
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
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
