import React from "react";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiTruck } from "react-icons/hi2";

const FeaturesSection = () => {
  const features = [
    {
      icon: <HiArrowPathRoundedSquare className="h-7 w-7" />,
      title: "EASY RETURNS",
      description: "Easy exchange on unworn, unopened pieces",
    },
    {
      icon: <HiOutlineCreditCard className="h-7 w-7" />,
      title: "SECURE PAYMENT",
      description: "Pay securely online or cash on delivery",
    },
    {
      icon: <HiTruck className="h-7 w-7" />,
      title: "CAREFUL PACKAGING",
      description: "2-4 business days across Pakistan",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-vintage-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-sm border border-vintage-sand hover:border-vintage-gold transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full mb-5 text-vintage-gold bg-vintage-sand/40">
                {feature.icon}
              </div>
              <h4 className="text-sm font-semibold text-vintage-obsidian mb-3 uppercase tracking-widest">
                {feature.title}
              </h4>
              <p className="text-vintage-umber/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
