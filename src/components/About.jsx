import React from "react";
import about from "../data/about.json";

const About = () => (
  <section id="inicio" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
    <img src={about.photo} alt={about.name} className="w-32 h-32 rounded-full shadow-lg mb-4 object-cover" />
    <h1 className="text-3xl font-bold text-gray-800 mb-1">{about.name}</h1>
    <h2 className="text-lg text-blue-700 font-medium mb-2">{about.role}</h2>
    <p className="text-gray-600 max-w-xl text-center mb-4">{about.description}</p>
    <div className="flex gap-4 mb-4">
      <a href={about.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 text-2xl"><i className="fab fa-linkedin"></i>LinkedIn</a>
      <a href={about.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-800 text-2xl"><i className="fab fa-github"></i>GitHub</a>
    </div>
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {about.technologies.map((tech) => (
        <span key={tech} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">{tech}</span>
      ))}
    </div>
    <div className="flex flex-col items-center gap-2">
      <a href={about.cv} download className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition">Descargar CV</a>
      <div className="text-gray-500 text-sm mt-2">
        <span className="block"><i className="fas fa-envelope mr-1"></i>{about.email}</span>
        <span className="block"><i className="fas fa-phone mr-1"></i>{about.phone}</span>
        <span className="block"><i className="fas fa-map-marker-alt mr-1"></i>{about.location}</span>
      </div>
    </div>
  </section>
);

export default About; 