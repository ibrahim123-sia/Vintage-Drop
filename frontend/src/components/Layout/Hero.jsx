import React from "react";
import { Link } from "react-router-dom";
import heroBanner from '../../assets/hero_banner.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-vintage-obsidian">
      <div className="relative w-full h-[75vh] min-h-[520px] max-h-[800px]">
        <img
          src={heroBanner}
          alt="The Vintage Drop"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian via-vintage-obsidian/40 to-vintage-obsidian/10" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <span className="block text-vintage-gold text-xs uppercase tracking-[0.3em] mb-6">
            The Festive Edit
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-vintage-cream mb-6 leading-tight">
            Curated Vintage Finds
          </h1>
          <div className="vintage-divider mb-8">
            <span className="vintage-divider-mark"></span>
          </div>
          <p className="text-lg md:text-xl text-vintage-cream/70 mb-10 max-w-2xl mx-auto">
            Antique-inspired planters, rare indoor plants, and timeless décor pieces — each one unique, each one a story.
          </p>

          <Link
            to="/collections/all"
            className="inline-block border border-vintage-gold text-vintage-gold hover:bg-vintage-gold hover:text-vintage-obsidian px-8 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-300"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
