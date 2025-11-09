import { Linkedin, Github, Twitter, Instagram, Youtube, Facebook, Link } from "lucide-react";

const SocialIcon = ({ icon, size = 24, className = "" }) => {
  const iconMap = {
    linkedin: <Linkedin size={size} className={`text-blue-600 ${className}`} />,
    github: <Github size={size} className={`text-gray-800 ${className}`} />,
    twitter: <Twitter size={size} className={`text-blue-400 ${className}`} />,
    instagram: <Instagram size={size} className={`text-pink-600 ${className}`} />,
    youtube: <Youtube size={size} className={`text-red-600 ${className}`} />,
    facebook: <Facebook size={size} className={`text-blue-700 ${className}`} />,
    link: <Link size={size} className={`text-gray-600 ${className}`} />
  };

  return iconMap[icon] || iconMap.link;
};

export default SocialIcon;
