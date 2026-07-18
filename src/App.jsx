import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./index.css";

// Carga diferida: Three.js pesa ~700 kB y así no bloquea el primer render
const BirdsBackground = lazy(() => import("./components/BirdsBackground"));

const App = () => (
  <div className="bg-gradient-to-br from-[#bedaff] via-white to-purple-50 min-h-screen">
    <Header />
    <main className="pt-20">
      <Suspense fallback={null}>
        <BirdsBackground />
      </Suspense>
      <div style={{position:'relative', zIndex:0}}>
        <About />
        <Technologies />
        <Experience />
        <Projects />
      </div>
    </main>
    <Footer />
  </div>
);

export default App; 