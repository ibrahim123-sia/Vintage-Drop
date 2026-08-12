import React from "react";
import { Link } from "react-router-dom";

import featuredImg from '../../assets/hero_banner.jpg';
import Reveal from "../Common/Reveal";
import { scaleIn } from "../../utils/motion";

const FeaturedCollection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <Reveal
        as="div"
        variants={scaleIn}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center bg-white border border-vintage-sand/50 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 text-center lg:text-left">
          <span className="text-vintage-gold text-xs font-bold uppercase tracking-widest block mb-2">Exclusive Edition</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-vintage-obsidian mb-6 leading-tight">
            Handpicked Vintage Finds, Timeless Character
          </h2>
          <p className="text-base sm:text-lg text-vintage-umber/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Each piece tells a story — antique ceramic planters paired with thriving indoor plants, creating living art for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/collections/all"
              className="bg-vintage-obsidian hover:bg-vintage-gold text-vintage-cream px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-300 shadow-md"
            >
              Shop Planters →
            </Link>
            <Link
              to="/collections/plants"
              className="border border-vintage-sand/80 hover:border-vintage-gold text-vintage-umber px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:bg-vintage-sand/20"
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
      </Reveal>
    </section>
  );
};

export default FeaturedCollection;
