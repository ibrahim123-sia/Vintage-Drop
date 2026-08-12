import React from "react";
import { motion } from "framer-motion";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiTruck } from "react-icons/hi2";
import { fadeUp, staggerContainer } from "../../utils/motion";

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12)}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl border border-vintage-sand/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="p-4 rounded-full mb-5 text-vintage-gold bg-vintage-sand/30 group-hover:bg-vintage-gold group-hover:text-vintage-obsidian transition-colors duration-300 shadow-sm">
                {feature.icon}
              </div>
              <h4 className="text-sm font-bold text-vintage-obsidian mb-2 uppercase tracking-widest">
                {feature.title}
              </h4>
              <p className="text-vintage-umber/70 text-xs sm:text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
