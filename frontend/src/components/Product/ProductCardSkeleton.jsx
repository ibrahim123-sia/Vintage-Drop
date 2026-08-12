import React from "react";

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-vintage-sand/50 shadow-sm">
    <div className="relative aspect-[4/5] vintage-shimmer" />
    <div className="p-5 text-center space-y-2">
      <div className="h-2.5 w-16 mx-auto rounded-full vintage-shimmer" />
      <div className="h-4 w-3/4 mx-auto rounded-full vintage-shimmer" />
      <div className="h-2.5 w-1/2 mx-auto rounded-full vintage-shimmer" />
      <div className="pt-3 mt-2 border-t border-vintage-sand/30 flex justify-center">
        <div className="h-3.5 w-14 rounded-full vintage-shimmer" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default ProductCardSkeleton;
