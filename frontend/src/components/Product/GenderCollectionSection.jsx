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
          <div className="relative group overflow-hidden rounded-sm">
            <img
              src={categoryPlanters}
              alt="Vintage Planters & Pots"
              className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian/80 via-vintage-obsidian/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="font-display text-2xl md:text-3xl text-vintage-cream mb-3">Vintage Planters & Pots</h2>
              <Link
                to="/collections/planters"
                className="inline-flex items-center text-vintage-gold hover:text-vintage-cream font-medium uppercase text-sm tracking-widest transition-colors duration-200"
              >
                Shop Now →
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-sm">
            <img
              src={categoryPlants}
              alt="Indoor Plants & Succulents"
              className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian/80 via-vintage-obsidian/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="font-display text-2xl md:text-3xl text-vintage-cream mb-3">Indoor Plants & Succulents</h2>
              <Link
                to="/collections/plants"
                className="inline-flex items-center text-vintage-gold hover:text-vintage-cream font-medium uppercase text-sm tracking-widest transition-colors duration-200"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
