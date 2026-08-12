import React from "react";
import { Link } from "react-router-dom";

import featuredImg from '../../assets/hero_banner.jpg';

const FeaturedCollection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center bg-white border border-vintage-sand rounded-sm overflow-hidden">
        <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 text-center lg:text-left">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-vintage-obsidian mb-6 leading-tight">
            Handpicked Vintage Finds, Timeless Character
          </h2>
          <p className="text-lg text-vintage-umber/80 mb-8 max-w-lg mx-auto lg:mx-0">
            Each piece tells a story — antique ceramic planters paired with thriving indoor plants, creating living art for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/collections/all"
              className="bg-vintage-obsidian hover:bg-vintage-gold text-vintage-cream px-8 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-300"
            >
              Shop Planters
            </Link>
            <Link
              to="/collections/plants"
              className="border border-vintage-sand hover:border-vintage-gold text-vintage-umber px-8 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-300"
            >
              Browse Plants
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 h-full">
          <img
            src={featuredImg}
            alt="Featured vintage planters collection"
            className="w-full h-full max-h-[500px] object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
