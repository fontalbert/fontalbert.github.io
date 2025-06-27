import React from "react";
import technologies from "../data/technologies.json";

const Technologies = () => (
  <section id="sobre-mi" className="max-w-4xl mx-auto py-20 px-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Sobre mí</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {Object.entries(technologies).map(([category, techs]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">{category}</h3>
          <ul className="space-y-2">
            {techs.map((tech) => (
              <li key={tech.name} className="flex justify-between items-center">
                <span className="text-gray-700">{tech.name}</span>
                <span className="text-blue-500 text-sm">{tech.years} años</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Technologies; 