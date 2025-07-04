import React from "react";
import technologies from "../data/technologies.json";

const Technologies = () => (
  <section
    id="tecnologias"
    className="max-w-6xl mx-auto py-20 px-4"
  >
    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
      Tecnologías y Áreas de Especialización
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Object.entries(technologies).map(([category, data]) => (
        <div
          key={category}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:scale-105 transition-transform"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
            {category}
          </h3>
          <div className="grid gap-3 w-full">
            {data.items.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition"
              >
                <i className={`${tech.icon} text-2xl text-blue-700`}></i>
                <span className="font-medium text-gray-800">{tech.name}</span>
                {tech.years?
                <span className="ml-auto text-xs text-blue-500">
                  {tech.years} años
                </span>:null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Technologies;