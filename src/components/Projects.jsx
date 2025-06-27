import React from "react";
import projects from "../data/projects.json";

const Projects = () => (
  <section id="proyectos" className="max-w-5xl mx-auto py-20 px-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Proyectos</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col">
          <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold text-blue-800 mb-1">{project.title}</h3>
          <p className="text-gray-700 mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{tag}</span>
            ))}
          </div>
          <div className="flex gap-4 mt-auto">
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Código</a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">Demo</a>
            )}
            {project.links.project && (
              <a href={project.links.project} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Ver proyecto</a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects; 