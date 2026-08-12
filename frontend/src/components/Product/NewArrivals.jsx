import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

import { fallbackProducts } from "../../data/fallbackProducts";
import Reveal from "../Common/Reveal";
import { fadeUp, staggerContainer } from "../../utils/motion";

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
    `p-3 rounded-full ${
      enabled ? "bg-white text-vintage-gold shadow-md border border-vintage-sand/60 hover:bg-vintage-gold hover:text-vintage-obsidian" : "bg-vintage-sand/20 text-vintage-umber/30 cursor-not-allowed"
    } transition-all duration-300`;

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
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-vintage-sand/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex justify-between items-end mb-10">
          <div>
            <span className="text-vintage-gold text-xs font-bold uppercase tracking-widest">Fresh Collection</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-vintage-obsidian mt-1">New Arrivals</h2>
          </div>

          <div className="hidden md:flex space-x-3">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={arrowBtn(canScrollLeft)} aria-label="Scroll left">
              <FiChevronLeft className="text-xl" />
            </button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight} className={arrowBtn(canScrollRight)} aria-label="Scroll right">
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </Reveal>

        <motion.div
          ref={scrollRef}
          className={`relative overflow-x-auto flex gap-6 pb-6 scrollbar-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08)}
        >
          {displayArrivals.map((product) => {
            const productId = product?._id;
            if (!productId) return null;
            const mainImage = product.images?.[0] || {};

            return (
              <motion.div key={productId} variants={fadeUp} className="flex-shrink-0 w-64 sm:w-72 relative group">
                <div className="bg-white rounded-2xl overflow-hidden border border-vintage-sand/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden aspect-[4/5] bg-vintage-sand/20">
                    {mainImage.url ? (
                      <img
                        src={mainImage.url}
                        alt={mainImage.altText || product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        draggable="false"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-vintage-umber/40">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-center">
                    <span className="text-[10px] font-bold text-vintage-gold uppercase tracking-widest block mb-1">New Drop</span>
                    <Link to={`/product/${productId}`} className="block group-hover:text-vintage-gold transition-colors duration-200">
                      <h3 className="font-display text-base font-bold text-vintage-obsidian line-clamp-1">{product.name}</h3>
                      <p className="text-vintage-gold font-bold text-sm mt-1">Rs. {Number(product.price || 0).toFixed(2)}</p>
                    </Link>
                  </div>
                </div>
                <Link to={`/product/${productId}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
              </motion.div>
            );
          })}
        </motion.div>
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
