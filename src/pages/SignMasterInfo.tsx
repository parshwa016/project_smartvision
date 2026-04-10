import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, Trophy, Sparkles, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

// Update these imports to your Sign Master assets
import signsBg from "../assets/roadgame.png"; 
import learnSignThumb from "../assets/lr_shape.png"; 
import quizSignThumb from "../assets/gm_shape.png";

const SignMasterInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      {/* 1. Navbar is fixed at the top */}
      <Navbar />

      {/* 2. HERO & CONTENT WRAPPER */}
      <div className="relative flex-grow flex flex-col items-center pt-32 pb-20 px-6">
        
        {/* Blurred Background Layer (Traffic/City Theme) */}
              <div className="absolute inset-0 z-0">
  <img 
    src={signsBg} 
    alt="Background" 
    className="w-full h-full object-cover blur-sm brightness-75"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />
</div>

        {/* 3. CENTERED CONTENT */}
        <div className="relative z-10 max-w-5xl w-full mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group scale-90 origin-left"
          >
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform shadow-lg">
              <ArrowLeft size={20} />
            </div>
            Back to World
          </button>

          {/* Title Section */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl italic tracking-tighter uppercase mb-2">
              Sign <span className="text-red-500 text-shadow">Master</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-bold drop-shadow-md flex items-center gap-2 justify-center md:justify-start">
              <ShieldCheck className="text-red-400" size={24} /> Stay Safe & Learn Road Signs with AI!
            </p>
          </div>

          {/* 4. BALANCED DUAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* --- LEARNING PHASE (Sign Recognition) --- */}
            <div className="group bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white hover:border-red-400 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={learnSignThumb} 
                  alt="Learning Signs" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">Learning Phase</h3>
              </div>
              <div className="p-8 bg-white flex flex-col flex-grow">
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-red-500 italic">Phase 01</p>
                <p className="text-slate-600 font-bold text-sm mb-8 leading-relaxed">
                  Understand what Stop, Go, and Warning signs mean! Our AI helps you spot them in the streets.
                </p>
                <button 
                  onClick={() => navigate("/game/signs/learning-info")}
                  className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-red-500 text-white text-lg font-black rounded-2xl shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all uppercase"
                >
                  START <BookOpen size={20} />
                </button>
              </div>
            </div>

            {/* --- GAMING MODE (Safety Quiz) --- */}
            <div className="group bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white hover:border-amber-500 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={quizSignThumb} 
                  alt="Safety Quiz" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">Gaming Mode</h3>
              </div>
              <div className="p-8 bg-white flex flex-col flex-grow">
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-amber-500 italic">Phase 02</p>
                <p className="text-slate-600 font-bold text-sm mb-8 leading-relaxed">
                  Put on your seatbelt! Solve 10 road safety puzzles to become a Certified Sign Master.
                </p>
                <button 
                  onClick={() => navigate("/game/signs/quiz-info")}
                  className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-amber-500 text-white text-lg font-black rounded-2xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all uppercase"
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

export default SignMasterInfo;