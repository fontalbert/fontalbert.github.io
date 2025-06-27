import React from "react";
import experience from "../data/experience.json";

const Experience = () => (
  <section id="experiencia" className="max-w-4xl mx-auto py-20 px-4" >
    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Experiencia</h2>
    <div className="flex flex-col gap-8">
      {experience.map((exp, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <div>
              <h3 className="text-xl font-semibold text-blue-800">{exp.title}</h3>
              <span className="text-gray-600 font-medium">{exp.company}</span>
            </div>
            <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.period}</span>
          </div>
          <p className="text-gray-700 mb-2">{exp.description}</p>
          <ul className="list-disc list-inside text-gray-600 mb-2">
            {exp.highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-2">
            {exp.tags.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience; 