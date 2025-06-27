import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./index.css";

const App = () => (
  <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
    <Header />
    <main className="pt-20">
      <About />
      <Technologies />
      <Experience />
      <Projects />
    </main>
    <Footer />
  </div>
);

export default App; 