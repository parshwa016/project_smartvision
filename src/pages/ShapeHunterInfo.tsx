import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, Trophy, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import shapesBg from "../assets/shapegame.png"; 
import learnThumb from "../assets/lr_shape.png"; 
import quizThumb from "../assets/gm_shape.png";

const ShapeHunterInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* 1. Navbar is fixed at the top */}
      <Navbar />

      {/* 2. HERO & CONTENT WRAPPER */}
      <div className="relative flex-grow flex flex-col items-center pt-32 pb-20 px-6">
        
        {/* Blurred Background Layer */}
        <div className="absolute inset-0 z-0">
  <img 
    src={shapesBg} 
    alt="Background" 
    className="w-full h-full object-cover blur-sm brightness-75"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />
</div>

        {/* 3. CENTERED CONTENT (Capped at 5xl for smaller cards) */}
        <div className="relative z-10 max-w-5xl w-full mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group scale-90 origin-left"
          >
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform shadow-lg">
              <ArrowLeft size={20} />
            </div>
            Back to World
          </button>

          {/* Title Section */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl italic tracking-tighter uppercase mb-2">
              Shape <span className="text-yellow-400">Hunter</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-bold drop-shadow-md flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="text-yellow-400" size={22} /> Become a Geometry Master with AI!
            </p>
          </div>

          {/* 4. BALANCED DUAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* --- LEARNING PHASE --- */}
            <div className="group bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white hover:border-blue-400 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={learnThumb} alt="Learning" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">Learning Phase</h3>
              </div>
              <div className="p-8 bg-white flex flex-col flex-grow">
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-blue-500 italic">Phase 01</p>
                <p className="text-slate-600 font-bold text-sm mb-8 leading-relaxed">
                  Explore 3D models and learn how to find shapes in your room with our AI robot guide!
                </p>
                <button 
                  onClick={() => navigate("/games/shapes/learning-info")}
                  className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-blue-500 text-white text-lg font-black rounded-2xl shadow-[0_6px_0_0_#1d4ed8] active:translate-y-1 active:shadow-none transition-all uppercase"
                >
                  START <BookOpen size={20} />
                </button>
              </div>
            </div>

            {/* --- GAMING MODE --- */}
            <div className="group bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white hover:border-orange-400 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={quizThumb} alt="Gaming" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">Gaming Mode</h3>
              </div>
              <div className="p-8 bg-white flex flex-col flex-grow">
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-orange-500 italic">Phase 02</p>
                <p className="text-slate-600 font-bold text-sm mb-8 leading-relaxed">
                  Take the quiz challenge! Earn your trophy and climb the Hall of Fame.
                </p>
                <button 
                  onClick={() => navigate("/game/shapes/quiz-info")}
                  className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-orange-500 text-white text-lg font-black rounded-2xl shadow-[0_6px_0_0_#c2410c] active:translate-y-1 active:shadow-none transition-all uppercase"
                >
                  PLAY <Play size={20} fill="currentColor" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeHunterInfo;