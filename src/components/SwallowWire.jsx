import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const swallows = [
  { left: "8%", img: "/swallow-2.svg", delay: 0 },
  { left: "18%", top: "18%", img: "/swallow-rest2.svg", delay: 10000 },
  { left: "28%", img: "/swallow-3.svg", delay: 0.2 },
  { left: "38%", img: "/swallow-1.svg", delay: 1 },
  { left: "48%", img: "/swallow-3.svg", delay: 0.6 },
  { left: "58%", img: "/swallow-rest3.svg", delay: 10000 },
  { left: "68%", img: "/swallow-1.svg", delay: 1.1 },
  { left: "78%", img: "/swallow-2.svg", delay: 2 },
  { left: "88%", img: "/swallow-rest.svg", delay: 10000 },
];

export default function SwallowWire() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className="relative w-full h-32 mb-8">
      {/* Cable */}
      <img
        src="/wire.svg"
        alt="Cable"
        className="absolute left-0 top-1/2 w-full"
        style={{ transform: "translateY(-50%)" }}
        draggable={false}
      />
      {/* Golondrinas */}
      {swallows.map((swallow, i) => (
        <motion.img
          key={i}
          src={swallow.img}
          alt="Swallow"
          className="absolute"
          style={{ left: swallow.left, top: swallow.top ? swallow.top : "30%" }}
          initial={{ y: 0, opacity: 1 }}
          animate={inView ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ delay: swallow.delay, duration: 0.8 }}
          width={40}
          draggable={false}
        />
      ))}
    </div>
  );
} 