import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, Volume2 } from "lucide-react";
import Navbar from "../components/Navbar";
import bg from "../assets/game2.png";
import { NUMBER_LEARN_ITEMS, type NumberLearnItem } from "../data/numberCountingData";

const speak = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

function objects(n: number, emoji: string) {
  return Array.from({ length: n }).map((_, i) => (
    <span key={i} className="text-4xl sm:text-5xl" aria-hidden>
      {emoji}
    </span>
  ));
}

const NumberCountingLearn = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);
  const items = useMemo(() => NUMBER_LEARN_ITEMS, []);

  const onTap = (it: NumberLearnItem) => {
    setActive(it.n === active ? null : it.n);
    speak(it.say);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/35 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate("/game/numbers/info")}
            className="mb-6 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group"
          >
            <span className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform">
              <ArrowLeft size={20} />
            </span>
            Back
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-blue-300 font-black uppercase tracking-widest text-xs mb-3">
              <BookOpen size={18} /> 🧠 Learning Phase
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg uppercase">Let&apos;s count!</h1>
            <p className="text-white/75 font-bold mt-2 text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
              <Sparkles size={18} className="text-amber-300" />
              Tap a number to see objects and hear it (1–20).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((it) => {
              const isOpen = active === it.n;
              return (
                <button
                  key={it.n}
                  type="button"
                  onClick={() => onTap(it)}
                  className={`group rounded-3xl p-5 shadow-xl border-4 transition-all active:scale-95 flex flex-col items-center gap-3 ${
                    isOpen
                      ? "bg-white border-blue-400"
                      : "bg-white/95 hover:bg-white border-white/50 hover:border-amber-300"
                  }`}
                  aria-label={`Learn number ${it.n}`}
                >
                  <div className="text-5xl sm:text-6xl font-black text-slate-900">{it.n}</div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700 opacity-80">
                    <Volume2 size={16} /> Tap to hear
                  </div>
                  {isOpen && (
                    <div className="w-full">
                      <div className="grid grid-cols-5 gap-2 justify-items-center">
                        {objects(it.n, it.emoji)}
                      </div>
                      <p className="mt-3 text-sm font-bold text-slate-700 text-center">
                        {it.title}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberCountingLearn;

