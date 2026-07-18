import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Aparición suave al entrar en el viewport (una sola vez)
export default function Reveal({ children, delay = 0, className, style }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.6, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
