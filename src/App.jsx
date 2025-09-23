import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./index.css";
import BirdsBackground from "./components/BirdsBackground";

const App = () => (
  <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
    <Header />
    <main className="pt-20">
      <BirdsBackground /> 
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