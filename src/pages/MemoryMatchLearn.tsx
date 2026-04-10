import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, Volume2 } from "lucide-react";
import Navbar from "../components/Navbar";
import bg from "../assets/game6.png";
import { MEMORY_LEARN_ITEMS, type MemoryLearnItem } from "../data/memoryMatchData";

const speak = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

function groupLabel(t: MemoryLearnItem["type"]) {
  if (t === "alphabet") return "Alphabets";
  if (t === "animal") return "Animals";
  if (t === "fruit") return "Fruits";
  return "Shapes";
}

const MemoryMatchLearn = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);

  const groups = useMemo(() => {
    const m = new Map<MemoryLearnItem["type"], MemoryLearnItem[]>();
    for (const it of MEMORY_LEARN_ITEMS) {
      const list = m.get(it.type) ?? [];
      list.push(it);
      m.set(it.type, list);
    }
    return Array.from(m.entries());
  }, []);

  const onTap = (it: MemoryLearnItem) => {
    setActive(it.id === active ? null : it.id);
    speak(`${it.say ?? it.title}. ${it.fact}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/35 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate("/game/memory/info")}
            className="mb-6 flex items-center gap-2 text-white/90 font-black uppercase tracking-widest hover:text-white transition-all group"
          >
            <span className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:-translate-x-2 transition-transform">
              <ArrowLeft size={20} />
            </span>
            Back
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-purple-300 font-black uppercase tracking-widest text-xs mb-3">
              <BookOpen size={18} /> Learning mode
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg uppercase">
              Mix &amp; learn
            </h1>
            <p className="text-white/75 font-bold mt-2 text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
              <Sparkles size={18} className="text-amber-300" />
              Tap a card to hear it and read a fun fact.
            </p>
          </div>

          <div className="grid gap-8">
            {groups.map(([type, items]) => (
              <section key={type} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-[2rem] p-5 sm:p-6">
                <h2 className="text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-300" />
                  {groupLabel(type)}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((it) => {
                    const isOpen = active === it.id;
                    return (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => onTap(it)}
                        className={`group rounded-3xl p-5 shadow-xl border-4 transition-all active:scale-95 flex flex-col items-center gap-2 text-left ${
                          isOpen
                            ? "bg-white border-purple-400"
                            : "bg-white/95 hover:bg-white border-white/50 hover:border-amber-300"
                        }`}
                        aria-label={`Learn ${it.title}`}
                      >
                        <span className="text-5xl group-hover:scale-110 transition-transform" aria-hidden>
                          {it.emoji}
                        </span>
                        <span className="font-black text-slate-800 uppercase text-sm tracking-wide text-center">
                          {it.title}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-600 opacity-80">
                          <Volume2 size={16} /> Tap to hear
                        </div>

                        {isOpen && (
                          <p className="mt-2 text-sm font-bold text-slate-700 leading-relaxed">
                            {it.fact}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchLearn;

