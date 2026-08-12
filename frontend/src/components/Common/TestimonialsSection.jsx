import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Ayesha Malik",
    location: "Lahore",
    rating: 5,
    text: "The vintage brass planter I ordered arrived safely in pristine condition. The succulent inside was healthy and thriving. Truly a showstopper on my coffee table!",
    product: "Victorian Brass Pedestal Planter"
  },
  {
    id: 2,
    name: "Zainab Raza",
    location: "Karachi",
    rating: 5,
    text: "Absoutely in love with the blue and white porcelain teapot planter! It brings so much vintage charm to my living room. Packaging was super careful and fast.",
    product: "Jade Bonsai Porcelain Pot"
  },
  {
    id: 3,
    name: "Hamza Siddiqui",
    location: "Islamabad",
    rating: 5,
    text: "Hard to find genuine vintage decor that is both affordable and aesthetic. The Vintage Drop delivered beyond my expectations. 10/10 recommendation!",
    product: "Art Deco Novelty Owl Planter"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-vintage-cream border-t border-b border-vintage-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-vintage-gold text-xs uppercase tracking-widest font-semibold">Client Stories</span>
          <h2 className="font-display text-3xl sm:text-4xl text-vintage-obsidian font-bold mt-1 mb-3">
            Loved By Vintage & Plant Enthusiasts
          </h2>
          <div className="vintage-divider my-3">
            <span className="vintage-divider-mark">✨</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-sm border border-vintage-sand/80 shadow-sm hover:shadow-md hover:border-vintage-gold/60 transition-all duration-300 relative flex flex-col justify-between"
            >
              <FaQuoteLeft className="text-vintage-gold/20 text-4xl absolute top-6 right-6" />
              <div>
                <div className="flex text-vintage-gold space-x-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-vintage-umber/80 italic text-sm sm:text-base leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-4 border-t border-vintage-sand/40">
                <h4 className="font-display font-bold text-vintage-obsidian text-base">{rev.name}</h4>
                <p className="text-xs text-vintage-umber/60">{rev.location} · <span className="text-vintage-gold font-medium">{rev.product}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
