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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // --- Parámetros de la simulación ---
    // Menos pájaros en móvil: el flocking es O(n²) y en pantallas pequeñas no se aprecian tantos
    const BIRDS = window.innerWidth < 768 ? 40 : 90;
    const BOUNDS = 800; // Tamaño del mundo de vuelo
    const BOUNDS_HALF = BOUNDS / 2;

    // --- Crear la geometría base de UN pájaro (silueta de golondrina) ---
    const createBirdGeometry = () => {
      const geometry = new THREE.BufferGeometry();

      // Vértices: [x, y, z] - El ave mira hacia +Z. Las alas se mueven en el eje Y.
      const vertices = new Float32Array([
        // Cuerpo
        0.0, 0.0, 0.95,     // 0: punta del pico
        -0.12, 0.0, 0.35,   // 1: cabeza izquierda
        0.12, 0.0, 0.35,    // 2: cabeza derecha
        0.0, -0.16, 0.25,   // 3: quilla (vientre, da volumen 3D)
        0.0, 0.02, -0.3,    // 4: base de la cola

        // Ala izquierda (en falç: borde de ataque adelantado, punta atrasada)
        -0.12, 0.0, 0.3,    // 5: hombro
        -0.68, 0.0, 0.18,   // 6: mitad del borde de ataque
        -1.25, 0.05, -0.45, // 7: punta del ala
        -0.48, 0.0, -0.2,   // 8: borde de salida (medio)
        -0.14, 0.0, -0.05,  // 9: borde de salida (raíz)

        // Ala derecha (espejo)
        0.12, 0.0, 0.3,     // 10: hombro
        0.68, 0.0, 0.18,    // 11: mitad del borde de ataque
        1.25, 0.05, -0.45,  // 12: punta del ala
        0.48, 0.0, -0.2,    // 13: borde de salida (medio)
        0.14, 0.0, -0.05,   // 14: borde de salida (raíz)

        // Cola forcada
        -0.1, 0.0, -0.28,   // 15: raíz izquierda
        0.1, 0.0, -0.28,    // 16: raíz derecha
        0.0, 0.0, -0.6,     // 17: horquilla central
        -0.38, 0.0, -1.0,   // 18: punta izquierda
        0.38, 0.0, -1.0,    // 19: punta derecha
      ]);

      // Índices para formar triángulos
      const indices = [
        // Cuerpo (superficie superior)
        0, 1, 2,
        1, 4, 2,
        // Quilla (vientre)
        0, 1, 3,
        0, 3, 2,
        1, 4, 3,
        3, 4, 2,
        // Ala izquierda
        5, 6, 9,
        9, 6, 8,
        8, 6, 7,
        // Ala derecha
        10, 14, 11,
        14, 13, 11,
        13, 12, 11,
        // Cola
        15, 17, 16,
        15, 18, 17,
        16, 17, 19,
      ];

      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      return geometry;
    };

    const birdGeometry = createBirdGeometry();

    // --- Shaders Personalizados para animar alas ---
    const vertexShader = `
        attribute float birdPhase;
        uniform float time;
        varying float vShade;

        void main() {
        vec3 pos = position;
        float flap = sin(time * 6.0 + birdPhase);

        // Aleteo progresivo: la punta del ala sube/baja mucho más que la base
        float wing = smoothstep(0.12, 1.25, abs(position.x));
        pos.y += flap * wing * wing * 0.5;

        // La cola compensa ligeramente el aleteo
        pos.y -= flap * smoothstep(-0.3, -1.0, position.z) * 0.06;

        // instanceMatrix se inyecta automáticamente por Three.js;
        // modelViewMatrix aplica la cámara (sin ella el vaivén de cámara no se ve)
        vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos, 1.0);

        // Sombreado suave según la orientación del pájaro (da volumen al virar)
        vec3 n = normalize(mat3(modelViewMatrix) * mat3(instanceMatrix) * normal);
        vShade = 0.65 + 0.35 * abs(dot(n, normalize(vec3(0.3, 0.8, 0.5))));

        gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
      varying float vShade;

      void main() {
        // Gris azulado suave, similar a tu web actual (#4a5568), con sombreado
        gl_FragColor = vec4(vec3(0.29, 0.33, 0.4) * vShade, 0.9);
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
    const birdScales = new Float32Array(BIRDS); // Tamaño propio de cada pájaro

    for (let i = 0; i < BIRDS; i++) {
      positions[i * 3] = Math.random() * BOUNDS - BOUNDS_HALF;
      positions[i * 3 + 1] = Math.random() * BOUNDS - BOUNDS_HALF;
      positions[i * 3 + 2] = Math.random() * BOUNDS - BOUNDS_HALF;

      velocities[i * 3] = Math.random() * 2 - 1;
      velocities[i * 3 + 1] = Math.random() * 2 - 1;
      velocities[i * 3 + 2] = Math.random() * 2 - 1;

      birdPhases[i] = Math.random() * Math.PI * 2; // Fase aleatoria para el aleteo
      birdScales[i] = 1.4 + Math.random() * 1.4; // Variedad de tamaños
    }

    // Añadimos el atributo 'birdPhase' a la geometría
    birds.geometry.setAttribute('birdPhase', new THREE.InstancedBufferAttribute(birdPhases, 1));

    // Usamos un objeto dummy para calcular matrices de transformación
    const dummy = new THREE.Object3D();
    const dir = new THREE.Vector3(); // Reutilizado en cada frame (evita crear 300 vectores/frame)

    // --- Bucle de Animación ---
    let rafId;
    const animate = () => {
      const time = Date.now() * 0.001; // Tiempo en segundos
      birdMaterial.uniforms.time.value = time;

      for (let i = 0; i < BIRDS; i++) {
        const i3 = i * 3;

        // --- Reglas de Flocking (Simplificadas) ---
        // Un solo bucle de vecinos: cohesión, separación y alineación
        // comparten el cálculo de distancia (antes se hacía 3 veces por par)
        let centerX = 0, centerY = 0, centerZ = 0;
        let avgVelX = 0, avgVelY = 0, avgVelZ = 0;
        let count = 0;
        for (let j = 0; j < BIRDS; j++) {
          if (j === i) continue;
          const j3 = j * 3;
          const dx = positions[j3] - positions[i3];
          const dy = positions[j3 + 1] - positions[i3 + 1];
          const dz = positions[j3 + 2] - positions[i3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          // Separación (radio 20)
          if (distSq < 400) {
            velocities[i3] -= dx * 0.0005;
            velocities[i3 + 1] -= dy * 0.0005;
            velocities[i3 + 2] -= dz * 0.0005;
          }

          // Cohesión + Alineación (radio 40)
          if (distSq < 1600) {
            centerX += positions[j3];
            centerY += positions[j3 + 1];
            centerZ += positions[j3 + 2];
            avgVelX += velocities[j3];
            avgVelY += velocities[j3 + 1];
            avgVelZ += velocities[j3 + 2];
            count++;
          }
        }
        if (count > 0) {
          // Cohesión: acercarse al centro de los vecinos
          velocities[i3] += (centerX / count - positions[i3]) * 0.0005;
          velocities[i3 + 1] += (centerY / count - positions[i3 + 1]) * 0.0005;
          velocities[i3 + 2] += (centerZ / count - positions[i3 + 2]) * 0.0005;
          // Alineación: copiar la dirección media de los vecinos
          velocities[i3] += (avgVelX / count - velocities[i3]) * 0.01;
          velocities[i3 + 1] += (avgVelY / count - velocities[i3 + 1]) * 0.01;
          velocities[i3 + 2] += (avgVelZ / count - velocities[i3 + 2]) * 0.01;
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
        dir.set(velocities[i3], velocities[i3 + 1], velocities[i3 + 2]);
        if (dir.length() > 0.1) {
          dummy.lookAt(
            dummy.position.x + dir.x,
            dummy.position.y + dir.y,
            dummy.position.z + dir.z
          );
        }

        // Tamaño propio de cada pájaro (fijo: latir de tamaño resulta antinatural)
        const scale = birdScales[i];
        dummy.scale.set(scale, scale, scale);

        birds.setMatrixAt(i, dummy.matrix);
      }

      birds.instanceMatrix.needsUpdate = true;

      // Rotar cámara suavemente para dar sensación de profundidad
      camera.position.x = Math.sin(time * 0.2) * 100;
      camera.position.y = Math.cos(time * 0.3) * 50;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
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
    const mountEl = mountRef.current;
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (mountEl && renderer.domElement.parentNode === mountEl) {
        mountEl.removeChild(renderer.domElement);
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