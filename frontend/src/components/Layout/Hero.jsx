import React from "react";
import { Link } from "react-router-dom";
import heroBanner from '../../assets/hero_banner.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-vintage-obsidian">
      <div className="relative w-full h-[70vh] min-h-[500px] max-h-[750px]">
        <img
          src={heroBanner}
          alt="The Vintage Drop"
          className="w-full h-full object-cover object-center opacity-65 scale-105 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian via-vintage-obsidian/45 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <span className="inline-block bg-vintage-gold/20 text-vintage-gold border border-vintage-gold/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-sm">
            Handpicked Antique & Botanical Collections
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-vintage-cream mb-6 leading-tight tracking-tight">
            Curated Vintage Finds
          </h1>
          <div className="vintage-divider mb-6">
            <span className="vintage-divider-mark">🌿</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-vintage-cream/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Antique-inspired planters, rare indoor plants, and timeless décor pieces — each one unique, each one a story.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/collections/all"
              className="inline-block bg-vintage-gold text-vintage-obsidian hover:bg-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              Explore the Collection →
            </Link>
            <Link
              to="/collections/planters"
              className="inline-block bg-white/10 hover:bg-white/20 text-vintage-cream border border-white/20 backdrop-blur-md px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-300 shadow-lg"
            >
              Shop Planters
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
