import React, { useEffect, useRef } from "react";
import { useLang } from "../lib/contexts";

// Murmuración 2D + juego: doble clic crea un cable temporal y las golondrinas
// cercanas se posan en él. Récord persistido en localStorage.
// El color llega por la CSS var --flock (la página la cambia al anochecer).
export default function Murmuration() {
  const hostRef = useRef(null);
  const { t } = useLang();

  // Las etiquetas del marcador viven en un ref para no reiniciar el canvas al cambiar de idioma
  const labelsRef = useRef(t.game);
  labelsRef.current = t.game;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = hostRef.current;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W = 0,
      H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = W < 768 ? 60 : 110;
    const birds = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.9,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      ph: Math.random() * Math.PI * 2,
      mode: "fly",
      slot: null,
      flip: 1,
    }));
    const mouse = { x: -9999, y: -9999 };

    const release = (b, scared) => {
      if (b.slot) b.slot.bird = null;
      b.slot = null;
      b.mode = "fly";
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const sp = scared ? 2.4 : 1.6;
      b.vx = Math.cos(a) * sp;
      b.vy = Math.sin(a) * sp;
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (const b of birds) {
        if (b.mode === "perch" && Math.hypot(b.x - mouse.x, b.y - mouse.y) < 34) release(b, true);
      }
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // --- Juego: cables temporales ---
    const wires = [];
    let best = 0;
    try {
      best = parseInt(localStorage.getItem("murmuracion-game-best") || "0", 10) || 0;
    } catch {
      /* sin localStorage */
    }
    let played = false;
    const HARD_CAP = 8;
    let maxWires = 2;
    let awardedForSet = false;
    // Si se llenan todos los cables activos (pájaros ya posados), se desbloquea uno más
    const evaluateProgress = () => {
      if (awardedForSet || maxWires >= HARD_CAP || wires.length !== maxWires) return;
      const allFull = wires.every((w) => w.slots.every((s) => s.bird && s.bird.mode === "perch"));
      if (allFull) {
        maxWires++;
        awardedForSet = true;
      }
    };
    const spawnWire = (x, y) => {
      if (wires.length >= maxWires) {
        const old = wires.shift();
        old.slots.forEach((s) => s.bird && release(s.bird, false));
        awardedForSet = false;
      }
      const len = Math.min(120, Math.max(80, W * 0.09));
      const cap = Math.floor(len / 16);
      const wire = { x, y, len, t0: performance.now(), ttl: 7500, slots: [] };
      for (let i = 0; i < cap; i++) {
        wire.slots.push({ x: x - len / 2 + (len / (cap - 1)) * i, y, bird: null, wire });
      }
      const free = birds
        .filter((b) => b.mode === "fly")
        .map((b) => ({ b, d: Math.hypot(b.x - x, b.y - y) }))
        .filter((o) => o.d < 300)
        .sort((a, c) => a.d - c.d);
      wire.slots.forEach((slot, i) => {
        if (free[i]) {
          free[i].b.mode = "goto";
          free[i].b.slot = slot;
          slot.bird = free[i].b;
        }
      });
      wires.push(wire);
      awardedForSet = false;
      played = true;
    };
    const onDbl = (e) => {
      if (e.target.closest && e.target.closest("a, button, input, textarea, select")) return;
      if (e.clientY < 80) return; // no bajo el nav
      spawnWire(e.clientX, e.clientY);
      const sel = window.getSelection && window.getSelection();
      if (sel && sel.removeAllRanges) sel.removeAllRanges();
    };
    window.addEventListener("dblclick", onDbl);

    let stop = false;
    let rafId;
    let last = 0;
    const tick = (time) => {
      if (stop) return;
      rafId = requestAnimationFrame(tick);
      if (time - last < 1000 / 60) return;
      last = time;
      const color = getComputedStyle(host).getPropertyValue("--flock").trim() || "rgba(35,41,54,0.5)";
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      // Cables (debajo de los pájaros)
      for (let wi = wires.length - 1; wi >= 0; wi--) {
        const w = wires[wi];
        const age = time - w.t0;
        if (age > w.ttl) {
          w.slots.forEach((s) => s.bird && release(s.bird, false));
          wires.splice(wi, 1);
          awardedForSet = false;
          continue;
        }
        const fade = Math.min(age / 300, 1, (w.ttl - age) / 600);
        ctx.strokeStyle = color;
        ctx.globalAlpha = Math.max(fade, 0) * 1.6;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(w.x - w.len / 2, w.y);
        ctx.quadraticCurveTo(w.x, w.y + 6, w.x + w.len / 2, w.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = color;
      let perched = 0;
      for (let i = 0; i < N; i++) {
        const b = birds[i];
        if (b.mode === "perch") {
          perched++;
          // Silueta posada: cuerpo inclinado + cola bajo el cable
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(b.x + 2.6 * b.flip, b.y - 6.2);
          ctx.quadraticCurveTo(b.x + 0.6 * b.flip, b.y - 3, b.x, b.y - 0.4);
          ctx.moveTo(b.x, b.y - 0.6);
          ctx.lineTo(b.x - 2.4 * b.flip, b.y + 4.6);
          ctx.moveTo(b.x - 0.4, b.y - 0.6);
          ctx.lineTo(b.x - 4 * b.flip, b.y + 3.4);
          ctx.stroke();
          continue;
        }
        if (b.mode === "goto" && b.slot) {
          // "Arrive": frenar al acercarse al hueco del cable
          const dx = b.slot.x - b.x,
            dy = b.slot.y - 1 - b.y,
            d = Math.hypot(dx, dy) || 0.001;
          const sp = Math.min(2.6, 0.35 + d * 0.045);
          b.vx += ((dx / d) * sp - b.vx) * 0.12;
          b.vy += ((dy / d) * sp - b.vy) * 0.12;
          if (d < 3.2) {
            b.mode = "perch";
            b.x = b.slot.x;
            b.y = b.slot.y - 1;
            b.flip = Math.random() < 0.5 ? -1 : 1;
            b.vx = 0;
            b.vy = 0;
            perched++;
            continue;
          }
        } else {
          // Flocking normal
          let cx = 0,
            cy = 0,
            ax = 0,
            ay = 0,
            n = 0;
          for (let j = 0; j < N; j++) {
            if (i === j) continue;
            const o = birds[j];
            if (o.mode !== "fly") continue;
            const dx = o.x - b.x,
              dy = o.y - b.y,
              d2 = dx * dx + dy * dy;
            if (d2 < 420) {
              b.vx -= dx * 0.0016;
              b.vy -= dy * 0.0016;
            }
            if (d2 < 5200) {
              cx += o.x;
              cy += o.y;
              ax += o.vx;
              ay += o.vy;
              n++;
            }
          }
          if (n > 0) {
            b.vx += (cx / n - b.x) * 0.00045 + (ax / n - b.vx) * 0.03;
            b.vy += (cy / n - b.y) * 0.00045 + (ay / n - b.vy) * 0.03;
          }
          const mdx = b.x - mouse.x,
            mdy = b.y - mouse.y,
            md2 = mdx * mdx + mdy * mdy;
          if (md2 < 16000) {
            const f = 0.35 / Math.max(md2, 900);
            b.vx += mdx * f * 60;
            b.vy += mdy * f * 60;
          }
          b.vy += Math.sin(time * 0.0002 + b.ph) * 0.004;
          const s = Math.hypot(b.vx, b.vy) || 0.001;
          const lim = 1.9,
            min = 0.7;
          if (s > lim) {
            b.vx = (b.vx / s) * lim;
            b.vy = (b.vy / s) * lim;
          }
          if (s < min) {
            b.vx = (b.vx / s) * min;
            b.vy = (b.vy / s) * min;
          }
        }
        b.x += b.vx;
        b.y += b.vy;
        if (b.mode === "fly") {
          if (b.x < -20) b.x = W + 20;
          if (b.x > W + 20) b.x = -20;
          if (b.y < -20) b.y = H * 0.85;
          if (b.y > H + 20) b.y = -20;
        }
        const k = 4.2 / (Math.hypot(b.vx, b.vy) || 1);
        const flap = 1 + 0.45 * Math.sin(time * 0.02 + b.ph);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(b.x - b.vx * k, b.y - b.vy * k);
        ctx.lineTo(b.x + b.vx * k, b.y + b.vy * k);
        ctx.moveTo(b.x - b.vy * k * 0.5 * flap, b.y + b.vx * k * 0.5 * flap);
        ctx.lineTo(b.x + b.vy * k * 0.5 * flap, b.y - b.vx * k * 0.5 * flap);
        ctx.stroke();
      }
      evaluateProgress();
      // Marcador
      if (perched > best) {
        best = perched;
        try {
          localStorage.setItem("murmuracion-game-best", String(best));
        } catch {
          /* sin localStorage */
        }
      }
      if (played || best > 0) {
        const labels = labelsRef.current;
        ctx.font = '500 12px "Albert Sans", sans-serif';
        ctx.textAlign = "left";
        ctx.globalAlpha = 1.4;
        ctx.fillStyle = color;
        ctx.fillText(
          `${labels.score}: ${perched}   ·   ${labels.best}: ${best}   ·   ${labels.wires}: ${maxWires}`,
          20,
          H - 22
        );
        ctx.globalAlpha = 1;
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      stop = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("dblclick", onDbl);
      host.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
