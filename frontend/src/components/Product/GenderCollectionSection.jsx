import React from "react";
import { Link } from "react-router-dom";

import categoryPlanters from '../../assets/category_planters.jpg';
import categoryPlants from '../../assets/category_plants.jpg';

const GenderCollectionSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="block text-vintage-gold text-xs uppercase tracking-[0.3em] mb-3">Shop by Category</span>
          <h2 className="font-display text-3xl md:text-4xl text-vintage-obsidian">Plants to Planters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500">
            <img
              src={categoryPlanters}
              alt="Vintage Planters & Pots"
              className="w-full h-[450px] md:h-[550px] object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian/90 via-vintage-obsidian/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-vintage-gold text-xs font-bold uppercase tracking-widest block mb-1">Handcrafted Ceramics</span>
              <h2 className="font-display text-2xl md:text-3xl text-vintage-cream font-bold mb-4">Vintage Planters & Pots</h2>
              <Link
                to="/collections/planters"
                className="inline-flex items-center bg-vintage-gold text-vintage-obsidian hover:bg-white font-bold uppercase text-xs tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-md"
              >
                Shop Planters →
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500">
            <img
              src={categoryPlants}
              alt="Indoor Plants & Succulents"
              className="w-full h-[450px] md:h-[550px] object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian/90 via-vintage-obsidian/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-vintage-gold text-xs font-bold uppercase tracking-widest block mb-1">Living Greenery</span>
              <h2 className="font-display text-2xl md:text-3xl text-vintage-cream font-bold mb-4">Indoor Plants & Succulents</h2>
              <Link
                to="/collections/plants"
                className="inline-flex items-center bg-vintage-gold text-vintage-obsidian hover:bg-white font-bold uppercase text-xs tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-md"
              >
                Explore Plants →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
