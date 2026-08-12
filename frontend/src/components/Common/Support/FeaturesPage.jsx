import React from "react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      title: "Handpicked Collection",
      description:
        "Every piece is individually selected for quality and character.",
    },
    {
      title: "Authentic Vintage",
      description:
        "Genuine antique and vintage-inspired pieces, not mass-produced.",
    },
    {
      title: "Safe Delivery",
      description:
        "Careful packaging ensures your delicate items arrive perfectly.",
    },
    {
      title: "Easy Returns",
      description:
        "7-day hassle-free return policy.",
    },
    {
      title: "Flexible Payment",
      description:
        "Cash on Delivery and online payment options.",
    },
    {
      title: "Plant Care Support",
      description:
        "Guidance on keeping your plants thriving.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-vintage-cream">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-vintage-obsidian mb-4">Why Choose The Vintage Drop</h1>
        <div className="vintage-divider mb-6">
          <span className="vintage-divider-mark"></span>
        </div>
        <p className="text-lg text-vintage-umber/80 max-w-2xl mx-auto">
          What sets our vintage decor & plant collection apart.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-sm border border-vintage-sand hover:border-vintage-gold transition-all duration-300"
          >
            <h3 className="font-display text-xl text-vintage-obsidian mb-4">{feature.title}</h3>
            <p className="text-vintage-umber/80 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-vintage-sand rounded-sm p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-vintage-obsidian mb-6">Experience The Vintage Drop Difference</h2>
          <p className="text-vintage-umber/80 mb-8 text-lg">
            A curated collection of vintage planters and indoor greenery, backed by authentic craftsmanship and dedicated support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/collections/all"
              className="bg-vintage-obsidian text-vintage-cream hover:bg-vintage-gold px-8 py-4 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-200"
            >
              Shop Our Collections
            </Link>
            <Link
              to="/about"
              className="bg-white text-vintage-umber px-8 py-4 rounded-sm font-medium border border-vintage-sand hover:border-vintage-gold uppercase text-sm tracking-widest transition-all duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
