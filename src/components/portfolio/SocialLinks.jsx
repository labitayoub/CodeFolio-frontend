import SocialIcon from "../ui/SocialIcon";

const SocialLinks = ({ social }) => {
  if (!social || social.length === 0) return null;

  const formatUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Me contacter</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {social.map((item) => (
            <a
              key={item.id}
              href={formatUrl(item.liensSociaux)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <SocialIcon icon={item.icon} size={32} />
              <span className="text-sm font-medium text-gray-700">{item.nom}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
