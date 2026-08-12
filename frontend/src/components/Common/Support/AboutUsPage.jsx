import React from "react";
import { Link } from "react-router-dom";
import aboutImg from '../../../assets/hero_banner.jpg';

const AboutUsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-vintage-cream">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-vintage-obsidian mb-6">Our Story</h1>
        <div className="vintage-divider mb-8">
          <span className="vintage-divider-mark"></span>
        </div>
        <p className="text-lg text-vintage-umber/80 max-w-2xl mx-auto">
          The Vintage Drop began with a simple love for unique, beautiful things — the kind you don't find in stores. What started as a small collection of vintage planters and indoor plants has grown into a curated destination for anyone who appreciates the charm of vintage décor and the beauty of living greenery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="font-display text-3xl text-vintage-obsidian mb-6">Who We Are</h2>
          <p className="text-vintage-umber/80 mb-6 leading-relaxed">
            The Vintage Drop curates antique-inspired planters, unique ceramic pots, and hand-selected indoor plants. Every piece in our collection is chosen for its character, craftsmanship, and ability to transform any space into something special.
          </p>
          <p className="text-vintage-umber/80 mb-6 leading-relaxed">
            Each listing details the dimensions, material, and care instructions so you know
            exactly what you're choosing — no surprises when the box arrives.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-vintage-obsidian text-vintage-cream hover:bg-vintage-gold px-6 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-200"
          >
            Explore the Collection
          </Link>
        </div>
        <div className="bg-vintage-sand h-96 rounded-sm overflow-hidden">
          <img
            src={aboutImg}
            alt="The Vintage Drop collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-sm border border-vintage-sand">
          <h3 className="font-display text-xl text-vintage-obsidian mb-4">Our Mission</h3>
          <p className="text-vintage-umber/80 leading-relaxed">
            We believe every home deserves a touch of timeless beauty. Our mission is to make vintage décor accessible and affordable, offering one-of-a-kind pieces that bring warmth, character, and life to your spaces.
          </p>
        </div>
        <div className="bg-white p-8 rounded-sm border border-vintage-sand">
          <h3 className="font-display text-xl text-vintage-obsidian mb-4">Craftsmanship</h3>
          <p className="text-vintage-umber/80 leading-relaxed">
            We work directly with artisans skilled in pottery and vintage restoration, so every planter and decor item holds up to years of beauty and display.
          </p>
        </div>
        <div className="bg-white p-8 rounded-sm border border-vintage-sand">
          <h3 className="font-display text-xl text-vintage-obsidian mb-4">Customer First</h3>
          <p className="text-vintage-umber/80 leading-relaxed">
            Straightforward exchanges, real support, and a checkout that
            respects how you actually want to pay — online, or cash on
            delivery.
          </p>
        </div>
      </div>

      <div className="bg-vintage-obsidian rounded-sm p-10 text-center text-vintage-cream">
        <h2 className="font-display text-3xl mb-4">Ready to Find Your Signature Piece?</h2>
        <p className="text-vintage-cream/70 mb-8 max-w-2xl mx-auto">
          Browse the full collection and find vintage planters and greenery built around your home space.
        </p>
        <Link
          to="/collections/all"
          className="inline-block bg-vintage-gold text-vintage-obsidian px-8 py-3 rounded-sm font-semibold uppercase text-sm tracking-widest hover:bg-vintage-cream transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUsPage;
