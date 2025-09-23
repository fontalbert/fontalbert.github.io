import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BirdsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // --- Configuración básica de Three.js ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 0, 500);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // --- Parámetros de la simulación ---
    const BIRDS = 300; // Reduce a 500 si es lento en móvil
    const BOUNDS = 800; // Tamaño del mundo de vuelo
    const BOUNDS_HALF = BOUNDS / 2;

    // --- Crear la geometría base de UN pájaro ---
    const createBirdGeometry = () => {
      const geometry = new THREE.BufferGeometry();

      // Vértices: [x, y, z] - El ave mira hacia +Z. Las alas se mueven en el eje Y.
      const vertices = new Float32Array([
        // Cuerpo (triángulo central)
        0, 0, 0,      // Punta del pico
        -0.2, 0, -0.4, // Ala izquierda (base)
        0.2, 0, -0.4,  // Ala derecha (base)

        // Ala izquierda
        -0.2, 0, -0.4, // Base (compartido)
        -0.6, 0, -0.4, // Punta del ala
        -0.4, 0, -0.8, // Extremo trasero

        // Ala derecha
        0.2, 0, -0.4,  // Base (compartido)
        0.6, 0, -0.4,  // Punta del ala
        0.4, 0, -0.8,  // Extremo trasero

        // Cola
        -0.15, 0, -0.4, // Izquierda
        0.15, 0, -0.4,  // Derecha
        0, 0, -0.8,     // Punta
      ]);

      // Índices para formar triángulos
      const indices = [
        0, 1, 2,  // Cuerpo
        3, 4, 5,  // Ala izquierda
        6, 7, 8,  // Ala derecha
        9, 10, 11 // Cola
      ];

      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 4));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      return geometry;
    };

    const birdGeometry = createBirdGeometry();

    // --- Shaders Personalizados para animar alas ---
    const vertexShader = `
        attribute float birdPhase;
        uniform float time;

        void main() {
        vec3 pos = position;

        // Animar alas: identificamos vértices de alas por su coordenada X
        if (position.x < -0.3 || position.x > 0.3) {
            // Movemos en Y con una onda seno, usando la fase única del pájaro
            pos.y += sin(time * 3.0 + birdPhase) * 0.15;
        }

        // Aplicamos la matriz de transformación de la instancia (posición, rotación, escala)
        // instanceMatrix se inyecta automáticamente por Three.js, ¡no la declares tú!
        vec4 mvPosition = instanceMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
      void main() {
        // Color gris suave, similar a tu web actual (#4a5568)
        gl_FragColor = vec4(0.29, 0.33, 0.4, 0.9);
      }
    `;

    // Creamos el material con los shaders
    const birdMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    // --- Creamos el InstancedMesh ---
    const birds = new THREE.InstancedMesh(birdGeometry, birdMaterial, BIRDS);
    scene.add(birds);

    // --- Inicializamos datos de las instancias ---
    const positions = new Float32Array(BIRDS * 3);
    const velocities = new Float32Array(BIRDS * 3);
    const birdPhases = new Float32Array(BIRDS); // Fase de aleteo única por pájaro

    for (let i = 0; i < BIRDS; i++) {
      positions[i * 3] = Math.random() * BOUNDS - BOUNDS_HALF;
      positions[i * 3 + 1] = Math.random() * BOUNDS - BOUNDS_HALF;
      positions[i * 3 + 2] = Math.random() * BOUNDS - BOUNDS_HALF;

      velocities[i * 3] = Math.random() * 2 - 1;
      velocities[i * 3 + 1] = Math.random() * 2 - 1;
      velocities[i * 3 + 2] = Math.random() * 2 - 1;

      birdPhases[i] = Math.random() * Math.PI * 2; // Fase aleatoria para el aleteo
    }

    // Añadimos el atributo 'birdPhase' a la geometría
    birds.geometry.setAttribute('birdPhase', new THREE.InstancedBufferAttribute(birdPhases, 1));

    // Usamos un objeto dummy para calcular matrices de transformación
    const dummy = new THREE.Object3D();

    // --- Bucle de Animación ---
    const animate = () => {
      const time = Date.now() * 0.001; // Tiempo en segundos
      birdMaterial.uniforms.time.value = time;

      for (let i = 0; i < BIRDS; i++) {
        const i3 = i * 3;

        // --- Reglas de Flocking (Simplificadas) ---

        // Cohesión
        let centerX = 0, centerY = 0, centerZ = 0;
        let count = 0;
        for (let j = 0; j < BIRDS; j++) {
          if (j === i) continue;
          const j3 = j * 3;
          const dx = positions[j3] - positions[i3];
          const dy = positions[j3 + 1] - positions[i3 + 1];
          const dz = positions[j3 + 2] - positions[i3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (distance < 40) {
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
          velocities[i3] += (centerX - positions[i3]) * 0.0005;
          velocities[i3 + 1] += (centerY - positions[i3 + 1]) * 0.0005;
          velocities[i3 + 2] += (centerZ - positions[i3 + 2]) * 0.0005;
        }

        // Separación
        for (let j = 0; j < BIRDS; j++) {
          if (j === i) continue;
          const j3 = j * 3;
          const dx = positions[j3] - positions[i3];
          const dy = positions[j3 + 1] - positions[i3 + 1];
          const dz = positions[j3 + 2] - positions[i3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (distance < 20) {
            velocities[i3] -= dx * 0.0005;
            velocities[i3 + 1] -= dy * 0.0005;
            velocities[i3 + 2] -= dz * 0.0005;
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
        const speedLimit = 2.5;
        const speed = Math.sqrt(velocities[i3]**2 + velocities[i3+1]**2 + velocities[i3+2]**2);
        if (speed > speedLimit) {
          velocities[i3] = (velocities[i3] / speed) * speedLimit;
          velocities[i3 + 1] = (velocities[i3 + 1] / speed) * speedLimit;
          velocities[i3 + 2] = (velocities[i3 + 2] / speed) * speedLimit;
        }

        // Actualizar posición
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Rebote en bordes
        if (Math.abs(positions[i3]) > BOUNDS_HALF) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > BOUNDS_HALF) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > BOUNDS_HALF) velocities[i3 + 2] *= -1;

        // --- Actualizar la matriz de la instancia ---
        dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);

        // Orientar el pájaro hacia su dirección de vuelo
        const dir = new THREE.Vector3(velocities[i3], velocities[i3 + 1], velocities[i3 + 2]);
        if (dir.length() > 0.1) {
          dummy.lookAt(
            dummy.position.x + dir.x,
            dummy.position.y + dir.y,
            dummy.position.z + dir.z
          );
        }

        // Escalar el pájaro (opcional, para variedad)
        const scale = 1 + Math.sin(time + birdPhases[i]) * 0.1;
        dummy.scale.set(scale, scale, scale);

        birds.setMatrixAt(i, dummy.matrix);
      }

      birds.instanceMatrix.needsUpdate = true;

      // Rotar cámara suavemente para dar sensación de profundidad
      camera.position.x = Math.sin(time * 0.2) * 100;
      camera.position.y = Math.cos(time * 0.3) * 50;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- Manejar resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      birdGeometry.dispose();
      birdMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0, // ¡Fondo!
        pointerEvents: "none", // No interfiere con clicks/scroll
      }}
    />
  );
};

export default BirdsBackground;