import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

const Reveal = ({ children, className = "", delay = 0, variants = fadeUp, as = "div" }) => {
  const MotionTag = motion[as] || motion.div;

  const delayedVariants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: { ...variants.visible.transition, delay },
        },
      }
    : variants;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={delayedVariants}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
