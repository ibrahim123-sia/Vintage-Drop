import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiDroplet, FiHeart, FiShield } from "react-icons/fi";
import Reveal from "./Reveal";

const careTips = [
  {
    id: "light",
    icon: FiSun,
    title: "Light Requirements",
    subtitle: "Bright, Indirect Sunshine",
    desc: "Most succulents and indoor plants in our vintage planters thrive best near east or south-facing windows. Avoid harsh mid-day direct sunlight which can scorch delicate leaves.",
    tag: "Pro Tip: Rotate your vintage planter 90° every week so all sides get equal sunlight."
  },
  {
    id: "water",
    icon: FiDroplet,
    title: "Watering Wisdom",
    subtitle: "Soak & Dry Method",
    desc: "Always allow the soil to dry out completely between waterings. For succulents in antique porcelain pots, water thoroughly once every 10–14 days in summer, and once a month in winter.",
    tag: "Golden Rule: When in doubt, underwater rather than overwater."
  },
  {
    id: "pot",
    icon: FiHeart,
    title: "Vintage Pot Care",
    subtitle: "Protecting Aged Ceramics",
    desc: "Our hand-painted and antique brass planters feature natural patina. Wipe exterior glaze with a soft damp cloth. Never use harsh abrasive chemicals on vintage porcelain finish.",
    tag: "Handcrafted: Each piece is inspected and sealed for water resistance."
  }
];

const PlantCareSection = () => {
  const [activeTab, setActiveTab] = useState("light");
  const currentTip = careTips.find((t) => t.id === activeTab);
  const IconComponent = currentTip.icon;

  return (
    <section className="py-16 md:py-24 bg-vintage-obsidian text-vintage-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-vintage-pattern-bg pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-vintage-gold text-xs uppercase tracking-widest font-semibold">Botanical Wisdom</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-vintage-cream mt-2 mb-4">
            Plant Care & Vintage Maintenance
          </h2>
          <div className="vintage-divider my-4">
            <span className="vintage-divider-mark">🌿</span>
          </div>
          <p className="text-vintage-cream/70 text-sm sm:text-base">
            Keeping your indoor greenery healthy and your vintage ceramic containers radiant with simple expert care steps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {careTips.map((tip) => {
              const TabIcon = tip.icon;
              const isActive = activeTab === tip.id;
              return (
                <motion.button
                  key={tip.id}
                  onClick={() => setActiveTab(tip.id)}
                  animate={{ x: isActive ? 8 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  whileHover={{ x: isActive ? 8 : 4 }}
                  className={`w-full text-left p-5 rounded-sm transition-colors duration-300 flex items-center space-x-4 border ${
                    isActive
                      ? "bg-vintage-cream text-vintage-obsidian border-vintage-gold shadow-lg"
                      : "bg-vintage-obsidian/60 text-vintage-cream/80 border-vintage-cream/10 hover:border-vintage-gold/50 hover:bg-vintage-cream/5"
                  }`}
                >
                  <div className={`p-3 rounded-full transition-colors duration-300 ${isActive ? "bg-vintage-gold text-vintage-obsidian" : "bg-vintage-cream/10 text-vintage-gold"}`}>
                    <TabIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-display text-lg ${isActive ? "font-bold text-vintage-obsidian" : "font-medium text-vintage-cream"}`}>
                      {tip.title}
                    </h3>
                    <p className={`text-xs ${isActive ? "text-vintage-obsidian/70" : "text-vintage-cream/60"}`}>{tip.subtitle}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Detailed Display Card */}
          <div className="lg:col-span-8 bg-vintage-cream/5 border border-vintage-gold/30 rounded-sm p-8 sm:p-12 backdrop-blur-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 rounded-full bg-vintage-gold text-vintage-obsidian">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-vintage-gold text-xs uppercase tracking-widest font-semibold">{currentTip.subtitle}</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-vintage-cream font-bold">{currentTip.title}</h3>
                  </div>
                </div>

                <p className="text-vintage-cream/90 text-base sm:text-lg leading-relaxed mb-8">
                  {currentTip.desc}
                </p>

                <div className="p-4 bg-vintage-gold/10 border-l-4 border-vintage-gold rounded-r-sm text-vintage-gold text-xs sm:text-sm font-medium flex items-center space-x-3">
                  <FiShield className="w-5 h-5 flex-shrink-0" />
                  <span>{currentTip.tag}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantCareSection;
