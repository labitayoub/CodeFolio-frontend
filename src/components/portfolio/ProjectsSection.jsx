import { Github, ExternalLink } from "lucide-react";

const ProjectsSection = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Mes Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              {project.image && (
                <img src={project.image} alt={project.titre} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.titre}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex gap-3">
                  {project.urlGit && (
                    <a
                      href={project.urlGit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.urlDemo && (
                    <a
                      href={project.urlDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
