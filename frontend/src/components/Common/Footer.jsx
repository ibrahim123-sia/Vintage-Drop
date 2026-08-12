import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import Reveal from "./Reveal";
import { staggerContainer, fadeUp } from "../../utils/motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email: email.trim().toLowerCase() }
      );

      if (response.data.alreadySubscribed) {
        setAlreadySubscribed(true);
        toast.info("This email is already subscribed");
      } else {
        toast.success("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setAlreadySubscribed(true);
        toast.info("You are already subscribed");
      } else {
        toast.error(error.response?.data?.message || "Subscription failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-vintage-obsidian text-vintage-cream py-12">
      <motion.div
        className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer(0.12)}
      >
        <motion.div variants={fadeUp}>
          <h3 className="font-display text-lg mb-4">Join Our Newsletter</h3>
          <p className="text-vintage-cream/60 mb-4 text-sm">
            Be the first to hear about new arrivals, rare vintage finds, and exclusive drops.
          </p>

          {alreadySubscribed ? (
            <div className="p-3 bg-vintage-cream/10 text-vintage-cream rounded-sm text-sm">
              You're subscribed! Thank you for joining us.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="p-3 w-full text-sm bg-vintage-cream/10 border border-vintage-cream/20 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-vintage-gold focus:shadow-[0_0_16px_rgba(212,175,55,0.35)] transition-shadow duration-300 text-vintage-cream placeholder:text-vintage-cream/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="bg-vintage-gold text-vintage-obsidian px-4 py-3 text-sm font-medium rounded-r-sm hover:bg-vintage-cream transition-colors disabled:opacity-70 flex-shrink-0 uppercase tracking-wide"
                disabled={loading}
              >
                {loading ? "..." : "Join"}
              </motion.button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="font-display text-lg mb-4">Shop</h3>
          <ul className="space-y-3 text-vintage-cream/60">
            <li><Link to="/collections/all?category=Indoor Plants" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">Indoor Plants</Link></li>
            <li><Link to="/collections/all?category=Vintage Planters" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">Vintage Planters</Link></li>
            <li><Link to="/collections/all?category=Succulents %26 Cacti" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">Succulents & Cacti</Link></li>
            <li><Link to="/collections/all?category=Antique Décor" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">Antique Décor</Link></li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="font-display text-lg mb-4">Support</h3>
          <ul className="space-y-3 text-vintage-cream/60">
            <li><Link to="/contact" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">About Us</Link></li>
            <li><Link to="/faqs" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">FAQs</Link></li>
            <li><Link to="/features" className="hover:text-vintage-gold text-sm transition-colors duration-200 block">Features</Link></li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="font-display text-lg mb-4">Connect With Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-vintage-gold text-vintage-cream/60 transition-colors duration-200" aria-label="Facebook">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/thevintagedrop.pk?igsh=eTNmcTRydTBtbXpm" target="_blank" rel="noopener noreferrer" className="hover:text-vintage-gold text-vintage-cream/60 transition-colors duration-200" aria-label="Instagram">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-vintage-gold text-vintage-cream/60 transition-colors duration-200" aria-label="Twitter">
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-vintage-cream/60 text-sm">
            <a href="mailto:hello@thevintagedrop.pk" className="hover:text-vintage-gold transition-colors duration-200">
              hello@thevintagedrop.pk
            </a>
          </p>
          <p className="text-vintage-cream/40 text-sm mt-2">Mon-Sat: 10AM - 7PM</p>
        </motion.div>
      </motion.div>

      <Reveal className="container mx-auto mt-12 px-4 lg:px-0 border-t border-vintage-cream/10 pt-6">
        <p className="text-vintage-cream/40 text-sm text-center">
          © 2026 The Vintage Drop. All Rights Reserved.
        </p>
      </Reveal>
    </footer>
  );
};

export default Footer;
