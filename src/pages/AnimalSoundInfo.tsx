import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import animalBg from "../assets/game5.png";
import learnThumb from "../assets/game5.png";
import quizThumb from "../assets/game6.png";

const AnimalSoundInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <div className="relative flex-grow flex flex-col items-center pt-32 pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src={animalBg}
            alt=""
            className="w-full h-full object-cover blur-sm brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/25 via-slate-900/45 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-5xl w-full mx-auto">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group scale-90 origin-left"
          >
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform shadow-lg">
              <ArrowLeft size={20} />
            </div>
            Back to World
          </button>

          <div className="mb-12 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl italic tracking-tighter uppercase mb-2">
              Animal <span className="text-emerald-400">&amp; Sound</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 font-bold drop-shadow-md flex items-center gap-2 justify-center md:justify-start flex-wrap">
              <Sparkles className="text-yellow-400 shrink-0" size={22} />
              WELCOME TO ANIMAL AND SOUND GAME — pick learning or quiz!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="group bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white hover:border-emerald-400 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={learnThumb}
                  alt="Learn animals"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">Meet the animals</h3>
              </div>
              <div className="p-8 bg-white flex flex-col flex-grow">
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-emerald-600 italic">Default · Phase 01</p>
                <p className="text-slate-600 font-bold text-sm mb-8 leading-relaxed">
                  Tap each animal to hear a real recorded animal sound.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/game/food/learn")}
                  className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 text-white text-lg font-black rounded-2xl shadow-[0_6px_0_0_#047857] active:translate-y-1 active:shadow-none transition-all uppercase"
                >
                  START <BookOpen size={20} />
                </button>
              </div>
            </div>

            <div className="group bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white hover:border-amber-400 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={quizThumb}
                  alt="Animal quiz"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">Picture quiz</h3>
              </div>
              <div className="p-8 bg-white flex flex-col flex-grow">
                <p className="text-xs font-black uppercase tracking-widest mb-3 text-amber-500 italic">Default · Phase 02</p>
                <p className="text-slate-600 font-bold text-sm mb-8 leading-relaxed">
                  20 rounds — listen to the sound, pick the name, then see your score vs your best!
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/game/food/play")}
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

export default AnimalSoundInfo;
