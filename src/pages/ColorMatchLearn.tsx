import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, Volume2 } from "lucide-react";
import Navbar from "../components/Navbar";
import bg from "../assets/game3.png";
import { COLOR_LEARN_ITEMS, type ColorItem } from "../data/colorMatchData";

const speak = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

function swatchStyle(it: ColorItem): React.CSSProperties | undefined {
  if (it.hex) return { backgroundColor: it.hex };
  return undefined;
}

const ColorMatchLearn = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);

  const items = useMemo(() => COLOR_LEARN_ITEMS, []);

  const onTap = (it: ColorItem) => {
    setActive(it.id === active ? null : it.id);
    speak(`${it.say ?? it.name}. ${it.funFact}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/35 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate("/game/colors/info")}
            className="mb-6 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group"
          >
            <span className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform">
              <ArrowLeft size={20} />
            </span>
            Back
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sky-300 font-black uppercase tracking-widest text-xs mb-3">
              <BookOpen size={18} /> 🧠 Phase 1: Learning Time
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg uppercase">First, let&apos;s learn!</h1>
            <p className="text-white/75 font-bold mt-2 text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
              <Sparkles size={18} className="text-amber-300" />
              Tap colors, hear their names, and remember them.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((it) => {
              const isOpen = active === it.id;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onTap(it)}
                  className={`group rounded-3xl p-5 shadow-xl border-4 transition-all active:scale-95 flex flex-col items-center gap-3 text-left ${
                    isOpen
                      ? "bg-white border-sky-400"
                      : "bg-white/95 hover:bg-white border-white/50 hover:border-amber-300"
                  }`}
                  aria-label={`Learn ${it.name}`}
                >
                  <div
                    className={`w-full aspect-square rounded-2xl border-4 border-white shadow-inner overflow-hidden ${
                      it.bgClass ? it.bgClass : ""
                    }`}
                    style={swatchStyle(it)}
                    aria-hidden
                  />
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="font-black text-slate-800 uppercase text-sm tracking-wide">{it.name}</span>
                    <span className="text-xl" aria-hidden>
                      {it.emoji}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-700 opacity-80">
                    <Volume2 size={16} /> Tap to hear
                  </div>
                  {isOpen && <p className="text-sm font-bold text-slate-700 leading-relaxed">{it.funFact}</p>}
                </button>
              );
            })}
          </div>

          <p className="mt-8 text-center text-white/75 font-bold text-sm">
            Learning colors is fun and easy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorMatchLearn;

