import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BirdsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración de escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    mountRef.current.appendChild(renderer.domElement);

    // Parámetros de la bandada
    const BIRDS = 300;
    const BOUNDS = 300;
    const speed = 0.1;

    // Geometría y material para los pájaros
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(BIRDS * 3);
    const velocities = new Float32Array(BIRDS * 3);
    const phases = new Float32Array(BIRDS);

    for (let i = 0; i < BIRDS; i++) {
      positions[i * 3] = Math.random() * BOUNDS - BOUNDS / 2;
      positions[i * 3 + 1] = Math.random() * BOUNDS - BOUNDS / 2;
      positions[i * 3 + 2] = Math.random() * BOUNDS - BOUNDS / 2;

      velocities[i * 3] = Math.random() * 2 - 1;
      velocities[i * 3 + 1] = Math.random() * 2 - 1;
      velocities[i * 3 + 2] = Math.random() * 2 - 1;

      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));

    // Material de puntos
    const material = new THREE.PointsMaterial({
      size: 3,
      color: 0x4a5568,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const birds = new THREE.Points(geometry, material);
    scene.add(birds);

    // Animación de flocking (versión simplificada)
    const animate = () => {
      const positions = birds.geometry.attributes.position.array;
      const velocities = birds.geometry.attributes.velocity.array;

      for (let i = 0; i < BIRDS; i++) {
        const i3 = i * 3;

        // Regla 1: Cohesión (moverse hacia el centro)
        let centerX = 0,
          centerY = 0,
          centerZ = 0;
        let count = 0;
        for (let j = 0; j < BIRDS; j++) {
          if (j === i) continue;
          const j3 = j * 3;
          const dx = positions[j3] - positions[i3];
          const dy = positions[j3 + 1] - positions[i3 + 1];
          const dz = positions[j3 + 2] - positions[i3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (distance < 50) {  // 👈 Radio de vecindad para cohesión
            centerX += positions[j3];
            centerY += positions[j3 + 1];
            centerZ += positions[j3 + 2];
            count++;
          }
        }
        if (count > 0) {
          centerX /= count;
          centerY /= count;
          centerZ /= count;
          velocities[i3] += (centerX - positions[i3]) * 0.0002; // 👈 FACTOR DE COHESIÓN
          velocities[i3 + 1] += (centerY - positions[i3 + 1]) * 0.0005;
          velocities[i3 + 2] += (centerZ - positions[i3 + 2]) * 0.0005;
        }

        // Regla 2: Separación
        for (let j = 0; j < BIRDS; j++) {
          if (j === i) continue;
          const j3 = j * 3;
          const dx = positions[j3] - positions[i3];
          const dy = positions[j3 + 1] - positions[i3 + 1];
          const dz = positions[j3 + 2] - positions[i3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (distance < 15) {
            velocities[i3] -= dx * 0.005; // 👈 FACTOR DE SEPARACIÓN
            velocities[i3 + 1] -= dy * 0.005;
            velocities[i3 + 2] -= dz * 0.005;
          }
        }

        // Regla 3: Alineación (copiar la dirección de los vecinos)
        let avgVelX = 0, avgVelY = 0, avgVelZ = 0;
        let alignCount = 0;
        for (let j = 0; j < BIRDS; j++) {
        if (j === i) continue;
        const j3 = j * 3;
        const dx = positions[j3] - positions[i3];
        const dy = positions[j3 + 1] - positions[i3 + 1];
        const dz = positions[j3 + 2] - positions[i3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < 40) { // 👈 Usa el mismo radio que cohesión, o uno diferente
            avgVelX += velocities[j3];
            avgVelY += velocities[j3 + 1];
            avgVelZ += velocities[j3 + 2];
            alignCount++;
        }
        }
        if (alignCount > 0) {
        avgVelX /= alignCount;
        avgVelY /= alignCount;
        avgVelZ /= alignCount;
        velocities[i3] += (avgVelX - velocities[i3]) * 0.01; // 👈 FACTOR DE ALINEACIÓN
        velocities[i3 + 1] += (avgVelY - velocities[i3 + 1]) * 0.01;
        velocities[i3 + 2] += (avgVelZ - velocities[i3 + 2]) * 0.01;
        }

        // Limitar velocidad
        const speedLimit = 2;
        const speed = Math.sqrt(
          velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2
        );
        if (speed > speedLimit) {
          velocities[i3] = (velocities[i3] / speed) * speedLimit;
          velocities[i3 + 1] = (velocities[i3 + 1] / speed) * speedLimit;
          velocities[i3 + 2] = (velocities[i3 + 2] / speed) * speedLimit;
        }

        // Actualizar posición
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Rebote en los bordes
        if (Math.abs(positions[i3]) > BOUNDS / 2) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > BOUNDS / 2) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > BOUNDS / 2) velocities[i3 + 2] *= -1;
      }

      birds.geometry.attributes.position.needsUpdate = true;

      // Rotar cámara lentamente para efecto dinámico
      camera.position.x = Math.sin(Date.now() * 0.0001) * 300;
      camera.position.z = Math.cos(Date.now() * 0.0001) * 300;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Manejar resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "150vw",
        height: "100vh",
        zIndex: 0, // ¡IMPORTANTE! Lo pone en background
        pointerEvents: "none", // No interfiere con el scroll ni clicks
      }}
    />
  );
};

export default BirdsBackground;