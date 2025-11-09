const SkillsSection = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.categorie || "Autre";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const colors = {
    Frontend: "bg-blue-100 text-blue-800",
    Backend: "bg-green-100 text-green-800",
    Database: "bg-purple-100 text-purple-800",
    DevOps: "bg-orange-100 text-orange-800",
    Autre: "bg-gray-100 text-gray-800"
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Compétences</h2>
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([categorie, skillsList]) => (
            <div key={categorie}>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{categorie}</h3>
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill) => (
                  <span
                    key={skill.id}
                    className={`px-4 py-2 rounded-full font-medium ${colors[categorie] || colors.Autre}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
