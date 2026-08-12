import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

import { fallbackProducts } from "../../data/fallbackProducts";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setNewArrivals(response.data);
        } else {
          setNewArrivals(fallbackProducts);
        }
      } catch (err) {
        console.error("Error fetching new arrivals, using fallback:", err);
        setNewArrivals(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      updateScrollButtons();
      container.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (container) container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [newArrivals]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const walk = e.pageX - startX;
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  const arrowBtn = (enabled) =>
    `p-2 rounded-full ${
      enabled ? "bg-white text-vintage-gold border border-vintage-sand hover:border-vintage-gold" : "bg-vintage-sand/40 text-vintage-umber/30 cursor-not-allowed"
    } transition-colors duration-200`;

  const displayArrivals = (newArrivals && newArrivals.length > 0) ? newArrivals : fallbackProducts;

  if (loading && displayArrivals.length === 0) {
    return (
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-vintage-obsidian mb-4">New Arrivals</h2>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-vintage-gold mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <h2 className="font-display text-3xl md:text-4xl text-vintage-obsidian mb-4">New Arrivals</h2>
          <p className="text-lg text-vintage-umber/70 max-w-2xl mx-auto">
            The latest curated pieces added to our collection.
          </p>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:flex space-x-2">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={arrowBtn(canScrollLeft)} aria-label="Scroll left">
              <FiChevronLeft className="text-xl" />
            </button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight} className={arrowBtn(canScrollRight)} aria-label="Scroll right">
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`relative overflow-x-auto flex gap-6 pb-6 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {displayArrivals.map((product) => {
            const productId = product?._id;
            if (!productId) return null;
            const mainImage = product.images?.[0] || {};

            return (
              <div key={productId} className="flex-shrink-0 w-64 sm:w-72 relative group">
                <div className="relative overflow-hidden rounded-sm aspect-[4/5] bg-vintage-sand/30">
                  {mainImage.url ? (
                    <img
                      src={mainImage.url}
                      alt={mainImage.altText || product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable="false"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-vintage-umber/40">No Image</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/product/${productId}`} className="block group-hover:text-vintage-gold transition-colors duration-200">
                    <h3 className="font-display text-sm uppercase tracking-wide text-vintage-obsidian">{product.name}</h3>
                    <p className="text-vintage-gold mt-1">Rs. {product.price?.toFixed(2)}</p>
                  </Link>
                </div>
                <Link to={`/product/${productId}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4 mt-6 md:hidden">
          <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={arrowBtn(canScrollLeft)} aria-label="Scroll left">
            <FiChevronLeft className="text-xl" />
          </button>
          <button onClick={() => scroll("right")} disabled={!canScrollRight} className={arrowBtn(canScrollRight)} aria-label="Scroll right">
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
