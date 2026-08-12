import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi2";
import heroBanner from '../../assets/hero_banner.jpg';
import { fadeUp, staggerContainer } from "../../utils/motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-vintage-obsidian">
      <div className="relative w-full h-[70vh] min-h-[500px] max-h-[750px]">
        <img
          src={heroBanner}
          alt="The Vintage Drop"
          className="w-full h-full object-cover object-center opacity-65 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-obsidian via-vintage-obsidian/45 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="container mx-auto px-6 text-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.16, 0.1)}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-vintage-gold/20 text-vintage-gold border border-vintage-gold/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6 shadow-sm"
          >
            Handpicked Antique & Botanical Collections
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-vintage-cream mb-6 leading-tight tracking-tight"
          >
            Curated Vintage Finds
          </motion.h1>
          <motion.div variants={fadeUp} className="vintage-divider mb-6">
            <span className="vintage-divider-mark">🌿</span>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-vintage-cream/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Antique-inspired planters, rare indoor plants, and timeless décor pieces — each one unique, each one a story.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 350, damping: 20 }}>
              <Link
                to="/collections/all"
                className="inline-block bg-vintage-gold text-vintage-obsidian hover:bg-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-colors duration-300 shadow-xl hover:shadow-vintage-gold/30"
              >
                Explore the Collection →
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 350, damping: 20 }}>
              <Link
                to="/collections/planters"
                className="inline-block bg-white/10 hover:bg-white/20 text-vintage-cream border border-white/20 backdrop-blur-md px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest transition-colors duration-300 shadow-lg"
              >
                Shop Planters
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center text-vintage-cream/70"
      >
        <HiOutlineChevronDown className="w-6 h-6 animate-bounce-chevron" />
      </motion.div>
    </section>
  );
};

export default Hero;
