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

    {/* Destacado: IA como herramienta principal */}
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 md:p-8 mb-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span aria-hidden="true">✦</span>
            {technologies.destacado.title}
          </h3>
          <p className="text-blue-100 font-medium mt-1">
            {technologies.destacado.subtitle}
          </p>
          <p className="text-blue-50 mt-2 max-w-2xl">
            {technologies.destacado.description}
          </p>
        </div>
        <div className="flex flex-wrap md:flex-col gap-2 md:items-end shrink-0">
          {technologies.destacado.items.map((item) => (
            <span
              key={item}
              className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Object.entries(technologies.categorias).map(([category, data]) => (
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
                {tech.icon && <i className={`${tech.icon} text-2xl text-blue-700`}></i>}
                <span className="font-medium text-gray-800">{tech.name}</span>
                {tech.years?
                <span className="ml-auto text-xs text-blue-500">
                  {tech.years} {tech.years === 1 ? "año" : "años"}
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
