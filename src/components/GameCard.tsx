import { Link } from "react-router-dom";
import { Play, BookOpen } from "lucide-react"; 

interface GameCardProps {
  title: string;
  category: string; // e.g., "Geometric Shape Games"
  imageUrl: string; // The AI-generated image (e.g., from your GitHub/CDN)
  color: string; // Tailwind color class for accents (e.g., "text-orange-600")
  path: string;
}

const GameCard = ({ title, category, imageUrl, color, path }: GameCardProps) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col h-full border-4 border-white hover:border-yellow-400">
      
      {/* 1. Large Game Image (60% Height) */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${title} Game`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Title Floating Over Image */}
        <h3 className="absolute bottom-4 left-6 text-3xl font-black text-white tracking-tight font-display drop-shadow-md">
          {title}
        </h3>
      </div>

      {/* 2. Game Info (Bottom Section) */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        
        <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${color}`}>
          {category}
        </p>

        {/* 3. Action Button - Links to Info Page */}
        <Link
          to={path}
          className="mt-auto inline-flex items-center justify-center gap-3 w-full py-4 bg-gray-900 text-white text-lg font-black rounded-2xl shadow-xl hover:bg-primary active:scale-95 transition-all"
        >
          LET'S GO! <Play size={22} fill="currentColor" />
        </Link>
      </div>
    </div>
  );
};

export default GameCard;