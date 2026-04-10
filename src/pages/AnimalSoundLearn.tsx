import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Volume2 } from "lucide-react";
import Navbar from "../components/Navbar";
import animalBg from "../assets/game5.png";
import { ANIMALS } from "../data/animalSoundData";
import { playAnimalSound, stopAnimalSound } from "../utils/animalAudio";

const AnimalSoundLearn = () => {
  const navigate = useNavigate();

  useEffect(() => () => stopAnimalSound(), []);

  const onAnimal = useCallback((soundFile: string) => {
    playAnimalSound(soundFile);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={animalBg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate("/game/food/info")}
            className="mb-6 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group"
          >
            <span className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform">
              <ArrowLeft size={20} />
            </span>
            Back
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-emerald-300 font-black uppercase tracking-widest text-xs mb-3">
              <BookOpen size={18} /> Learning mode
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg uppercase">
              Meet the animals
            </h1>
            <p className="text-white/75 font-bold mt-2 text-sm sm:text-base">
              Tap an animal to hear a real animal sound recording.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ANIMALS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onAnimal(a.soundFile)}
                className="group bg-white/95 hover:bg-white rounded-3xl p-6 shadow-xl border-4 border-white/50 hover:border-emerald-400 transition-all active:scale-95 flex flex-col items-center gap-2"
                aria-label={`Play ${a.name} sound`}
              >
                <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform" aria-hidden>
                  {a.emoji}
                </span>
                <span className="font-black text-slate-800 uppercase text-sm tracking-wide">{a.name}</span>
                <Volume2 className="text-emerald-600 opacity-70 group-hover:opacity-100" size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalSoundLearn;
