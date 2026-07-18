import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Swallow from "./Swallow";

const NUM_SLOTS = 30; // posiciones posibles sobre el cable
const KEEP_PROBABILITY = 0.6; // ~60% de posiciones ocupadas: huecos aleatorios
const NUM_SCROLL_STEPS = 20;

function generateSwallows() {
  // Distribuye las golondrinas a lo largo del cable dejando huecos al azar
  // (cada visita hay un número y reparto distinto), cada una con su propia
  // trayectoria de despegue precalculada (así el vuelo es autónomo y estable:
  // los re-renders por scroll no reinician la animación)
  const slots = Array.from({ length: NUM_SLOTS }, (_, i) => i).filter(
    () => Math.random() < KEEP_PROBABILITY
  );
  return slots.map((slot, i) => {
    const dir = Math.random() < 0.5 ? -1 : 1; // hacia dónde despega
    const dip = 8 + Math.random() * 12; // caída al soltarse del cable
    const riseX = 70 + Math.random() * 100; // distancia horizontal
    const riseY = 120 + Math.random() * 80; // altura del vuelo
    const wobble = (Math.random() - 0.5) * 40; // bandazo intermedio
    const rotation = (Math.random() - 0.5) * 12;
    // Pequeño desplazamiento lateral para que no queden equidistantes
    const jitter = (Math.random() - 0.5) * 1.6;

    return {
      left: `${(slot * 100) / (NUM_SLOTS - 1) + jitter}%`,
      variant: i % 3,
      facing: Math.random() < 0.5 ? -1 : 1, // hacia dónde mira posada
      dir,
      flapDuration: 0.15 + Math.random() * 0.1, // ritmo de aleteo propio
      // Reposo: cada una con su ligera inclinación sobre el cable
      rest: { x: 0, y: 0, rotate: rotation, opacity: 1, scale: 1 },
      // Despegue: se deja caer, pica hacia abajo y remonta con bandazos
      flight: {
        x: [0, dir * 6, dir * riseX * 0.4 + wobble, dir * riseX * 0.75, dir * riseX],
        y: [0, dip, -riseY * 0.25, -riseY * 0.65, -riseY],
        rotate: [rotation, dir * 22, dir * -8, dir * 8, dir * -3],
        opacity: [1, 1, 1, 0.85, 0],
        scale: [1, 1.03, 1, 0.9, 0.8],
        transition: {
          duration: 1.5 + Math.random() * 0.9,
          times: [0, 0.15, 0.45, 0.75, 1],
          ease: "easeOut",
          delay: Math.random() * 0.5, // no despegan todas a la vez
        },
      },
    };
  });
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
  const swallows = useRef(generateSwallows());
  const count = swallows.current.length;
  // Primer grupo que despega al cargar (~1/4 de las que haya)
  const initialFlyCount = useRef(Math.max(3, Math.round(count * 0.27))).current;
  const [flying, setFlying] = useState(() => Array(count).fill(false));
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const flyOrder = useRef(getRandomOrder(count));

  // Al cargar, un primer grupo aleatorio despega
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlying((prev) =>
        prev.map((f, i) => (flyOrder.current.slice(0, initialFlyCount).includes(i) ? true : f))
      );
      setScrollTriggered(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [initialFlyCount]);

  // Al hacer scroll, las demás vuelan progresivamente en orden aleatorio
  useEffect(() => {
    if (!scrollTriggered) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / (maxScroll / 3), 1);
      const steps = Math.ceil(progress * NUM_SCROLL_STEPS);
      const birdsToFly = Math.min(
        initialFlyCount + Math.floor((steps / NUM_SCROLL_STEPS) * (count - initialFlyCount)),
        count
      );
      setFlying((prev) =>
        prev.map((f, i) => (flyOrder.current.slice(0, birdsToFly).includes(i) ? true : f))
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTriggered, count, initialFlyCount]);

  return (
    <div className="relative w-full h-32 mb-8">
      {/* Cable */}
      <img
        src="/wire.svg"
        alt=""
        className="absolute left-0 top-1/2 w-full"
        style={{ transform: "translateY(-50%)" }}
        draggable={false}
      />
      {/* Golondrinas */}
      {swallows.current.map((swallow, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: swallow.left,
            top: "30%",
            zIndex: 2,
            pointerEvents: "none",
          }}
          initial={false}
          animate={flying[i] ? swallow.flight : swallow.rest}
        >
          <Swallow
            variant={swallow.variant}
            flying={flying[i]}
            // Al volar mira hacia donde vuela; posada, hacia donde le tocó
            facing={flying[i] ? swallow.dir : swallow.facing}
            flapDuration={swallow.flapDuration}
          />
        </motion.div>
      ))}
    </div>
  );
}
