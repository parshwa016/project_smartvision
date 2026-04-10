import React from 'react';
import { Palette, Bot, Gamepad2, Star, Sparkles, Trophy } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 px-10 max-w-7xl mx-auto text-center relative overflow-hidden">
      
      {/* Playful Section Title */}
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-black text-slate-800 mb-4 tracking-tight">
          What can we do today? <span className="text-yellow-400 animate-pulse inline-block">✨</span>
        </h2>
        <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">Pick a fun mission!</p>
      </div>

      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        
        {/* Action 1: Draw */}
        <div className="flex flex-col items-center gap-6 group cursor-pointer">
          <div className="w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center border-8 border-white shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative">
            <Palette size={80} className="text-emerald-600 animate-pulse" />
            <Star size={24} fill="#fbbf24" className="absolute top-2 right-4 text-yellow-400 animate-bounce" />
          </div>
          <span className="text-3xl font-black text-emerald-700 bg-emerald-50 px-6 py-2 rounded-full shadow-sm">Draw Art!</span>
        </div>

        {/* Action 2: Learn */}
        <div className="flex flex-col items-center gap-6 group cursor-pointer">
          <div className="w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-blue-100 to-sky-200 rounded-full flex items-center justify-center border-8 border-white shadow-2xl group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-300 relative">
            <Bot size={80} className="text-sky-600 animate-bounce-slow" />
            <Sparkles size={24} className="absolute top-4 left-4 text-blue-400 animate-pulse" />
          </div>
          <span className="text-3xl font-black text-sky-700 bg-blue-50 px-6 py-2 rounded-full shadow-sm">Talk to Smarty!</span>
        </div>

        {/* Action 3: Play */}
        <div className="flex flex-col items-center gap-6 group cursor-pointer">
          <div className="w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center border-8 border-white shadow-2xl group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300 relative">
            <Gamepad2 size={80} className="text-rose-600" />
            <Trophy size={24} className="absolute bottom-4 right-4 text-rose-400 animate-bounce" />
          </div>
          <span className="text-3xl font-black text-rose-700 bg-rose-50 px-6 py-2 rounded-full shadow-sm">Win Prizes!</span>
        </div>

      </div>
    </section>
  );
};

export default Features;