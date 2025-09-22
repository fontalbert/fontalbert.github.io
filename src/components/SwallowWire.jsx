import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const NUM_SWALLOWS = 30;
const INITIAL_FLY_COUNT = 8;
const NUM_SCROLL_STEPS = 20;

function generateSwallows() {
  // Distribuye 30 golondrinas a lo largo del cable
  return Array.from({ length: NUM_SWALLOWS }, (_, i) => ({
    left: `${(i * 100) / (NUM_SWALLOWS - 1)}%`,
    img: `/swallow-${(i % 3) + 1}.svg`, // Alterna entre 3 SVGs
    rotation: (Math.random() - 0.5) * 20, // Rotación inicial aleatoria
  }));
}

function getRandomOrder(n) {
  // Devuelve un array con los índices 0..n-1 en orden aleatorio
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SwallowWire() {
  const [flying, setFlying] = useState(Array(NUM_SWALLOWS).fill(false));
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const swallows = useRef(generateSwallows());
  const flyOrder = useRef(getRandomOrder(NUM_SWALLOWS));

  // Al cargar, selecciona 4 golondrinas aleatorias para despegar
  useEffect(() => {
    setTimeout(() => {
      setFlying((prev) =>
        prev.map((f, i) => (flyOrder.current.slice(0, INITIAL_FLY_COUNT).includes(i) ? true : f))
      );
      setScrollTriggered(true);
    }, 800); // Espera breve tras el montaje
  }, []);

  // Al hacer scroll, las demás vuelan progresivamente en orden aleatorio
  useEffect(() => {
    if (!scrollTriggered) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / (maxScroll / 3), 1);
      // Calcula cuántos "pasos" de scroll se han hecho
      const steps = Math.ceil(progress * NUM_SCROLL_STEPS);
      console.info("Scrolls number:", steps);
      // Cuántas golondrinas deben volar en total
      const birdsToFly = Math.min(
        INITIAL_FLY_COUNT + Math.floor((steps / NUM_SCROLL_STEPS) * (NUM_SWALLOWS - INITIAL_FLY_COUNT)),
        NUM_SWALLOWS
      );
      setFlying((prev) =>
        prev.map((f, i) =>
          flyOrder.current.slice(0, birdsToFly).includes(i) ? true : f
        )
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTriggered]);

  return (
    <div className="relative w-full h-32 mb-8">
      {/* Cable */}
      <img
        src="/wire.svg"
        alt="Cable"
        className="absolute left-0 top-1/2 w-full"
        style={{ transform: "translateY(-50%)" }}
        draggable={false}
      />
      {/* Golondrinas */}
      {swallows.current.map((swallow, i) => (
        <motion.img
          key={i}
          src={swallow.img}
          alt="Swallow"
          className="absolute"
          style={{
            left: swallow.left,
            top: "30%",
            zIndex: 2,
            pointerEvents: "none",
          }}
          initial={{
            y: 0,
            opacity: 1,
            rotate: swallow.rotation,
            scale: 1,
          }}
          animate={
            flying[i]
              ? {
                  y: -120 - Math.random() * 60,
                  x: 60 + Math.random() * 80,
                  opacity: 0,
                  rotate: swallow.rotation + (Math.random() - 0.5) * 60,
                  scale: 0.8 + Math.random() * 0.4,
                  transition: {
                    duration: 1.2 + Math.random() * 0.5,
                    delay: i < INITIAL_FLY_COUNT ? i * 0.2 : 0,
                  },
                }
              : {
                  y: 0,
                  x: 0,
                  opacity: 1,
                  rotate: swallow.rotation,
                  scale: 1,
                }
          }
          width={40}
          draggable={false}
        />
      ))}
    </div>
  );
} 