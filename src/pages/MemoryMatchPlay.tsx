import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw, Star, Trophy, Sparkles, Brain } from "lucide-react";
import Navbar from "../components/Navbar";
import BackgroundMusic from "../components/BackgroundMusic";
import bg from "../assets/game6.png";
import { MEMORY_CARD_POOL, pickPairs } from "../data/memoryMatchData";
import {
  bestFromHistory,
  loadMemoryMatchHistory,
  saveMemoryMatchAttempt,
  type MemoryMatchAttempt,
} from "../utils/memoryMatchStorage";

const TOTAL_ROUNDS = 5;
const PAIRS_PER_ROUND = 6; // 12 cards
const MAX_TURNS_PER_ROUND = 18;
const MAX_SCORE = TOTAL_ROUNDS * PAIRS_PER_ROUND;

type CardState = {
  idx: number;
  pairId: string;
  emoji: string;
  label: string;
  flipped: boolean;
  matched: boolean;
};

const speak = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

function tierForScore(score: number, max: number) {
  const p = score / max;
  if (p >= 0.85) return "star" as const;
  if (p >= 0.65) return "great" as const;
  if (p >= 0.45) return "good" as const;
  return "retry" as const;
}

const confettiColors = [
  "bg-yellow-400",
  "bg-pink-400",
  "bg-sky-400",
  "bg-emerald-400",
  "bg-purple-400",
  "bg-orange-400",
];

function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]" aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className={`absolute h-3 w-3 rounded-sm opacity-90 ${
            confettiColors[i % confettiColors.length]
          } animate-[quiz-fade-up_0.6s_ease-out_forwards]`}
          style={{
            left: `${8 + ((i * 67) % 84)}%`,
            top: `${-6 + ((i * 41) % 30)}%`,
            animationDelay: `${i * 45}ms`,
            transform: `rotate(${i * 24}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function newDeck(): CardState[] {
  const picked = pickPairs(MEMORY_CARD_POOL, PAIRS_PER_ROUND);
  return picked.map((c, idx) => ({
    idx,
    pairId: c.pairId,
    emoji: c.emoji,
    label: c.label,
    flipped: false,
    matched: false,
  }));
}

const MemoryMatchPlay = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [roundNum, setRoundNum] = useState(1);
  const [turnsLeft, setTurnsLeft] = useState(MAX_TURNS_PER_ROUND);
  const [score, setScore] = useState(0);
  const [deck, setDeck] = useState<CardState[]>(() => newDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const lockRef = useRef(false);

  /** Snapshot of history before this session (for “previous” comparison). */
  const [historyBefore] = useState<MemoryMatchAttempt[]>(() => loadMemoryMatchHistory());
  const [historyAfter, setHistoryAfter] = useState<MemoryMatchAttempt[] | null>(null);

  const prevBest = useMemo(() => bestFromHistory(historyBefore), [historyBefore]);
  const lastGameScore = historyBefore[0]?.score ?? null;

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  const finishGame = (finalScore: number) => {
    const updated = saveMemoryMatchAttempt(finalScore, MAX_SCORE);
    setHistoryAfter(updated);
    setPhase("complete");
    const tier = tierForScore(finalScore, MAX_SCORE);
    if (tier === "star" || tier === "great") {
      speak(`Amazing! You scored ${finalScore} points!`);
    } else if (tier === "good") {
      speak(`Nice work! You got ${finalScore} points.`);
    } else {
      speak("Keep practicing! You can match even more next time.");
    }
  };

  const startNextRound = (nextScore: number) => {
    if (roundNum >= TOTAL_ROUNDS) {
      finishGame(nextScore);
      return;
    }
    setRoundNum((r) => r + 1);
    setTurnsLeft(MAX_TURNS_PER_ROUND);
    setDeck(newDeck());
    setFlipped([]);
    lockRef.current = false;
    speak("Next round!");
  };

  const onFlip = (idx: number) => {
    if (phase !== "playing") return;
    if (lockRef.current) return;
    const c = deck[idx];
    if (!c || c.matched || c.flipped) return;
    if (flipped.length >= 2) return;

    setDeck((d) => d.map((x) => (x.idx === idx ? { ...x, flipped: true } : x)));
    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length !== 2) return;

    const [aIdx, bIdx] = nextFlipped;
    const a = deck[aIdx];
    const b = deck[bIdx];
    if (!a || !b) return;

    setTurnsLeft((t) => Math.max(0, t - 1));

    if (a.pairId === b.pairId) {
      const nextScore = score + 1;
      setScore(nextScore);
      setDeck((d) =>
        d.map((x) =>
          x.idx === aIdx || x.idx === bIdx ? { ...x, matched: true } : x
        )
      );
      setFlipped([]);
      speak("Match! Great job!");

      const allMatched = deck.every((x) => x.matched || x.pairId === a.pairId);
      if (allMatched) {
        setTimeout(() => startNextRound(nextScore), 450);
      }
      return;
    }

    lockRef.current = true;
    speak("Oops! Try again.");
    setTimeout(() => {
      setDeck((d) =>
        d.map((x) =>
          x.idx === aIdx || x.idx === bIdx ? { ...x, flipped: false } : x
        )
      );
      setFlipped([]);
      lockRef.current = false;
    }, 650);
  };

  useEffect(() => {
    if (phase !== "playing") return;
    if (turnsLeft > 0) return;
    speak("Round over!");
    startNextRound(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnsLeft, phase]);

  const restart = () => {
    window.speechSynthesis.cancel();
    setPhase("playing");
    setRoundNum(1);
    setTurnsLeft(MAX_TURNS_PER_ROUND);
    setScore(0);
    setDeck(newDeck());
    setFlipped([]);
    lockRef.current = false;
    setHistoryAfter(null);
  };

  const endScore = historyAfter?.[0]?.score ?? score;
  const tier = phase === "complete" ? tierForScore(endScore, MAX_SCORE) : null;
  const newBest = historyAfter ? bestFromHistory(historyAfter) : prevBest;
  const isNewRecord = phase === "complete" && endScore > prevBest;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
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

          {phase === "playing" && (
            <div className="bg-white/95 rounded-[2rem] shadow-2xl border-4 border-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 text-purple-700 font-black uppercase tracking-widest text-xs">
                  <Play size={18} fill="currentColor" /> Memory match
                </div>
                <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-2xl border-2 border-amber-300">
                  <Trophy className="text-amber-600" size={22} />
                  <span className="font-black text-slate-800">{score} pts</span>
                </div>
              </div>

              <div className="grid gap-3 mb-5">
                <div className="flex justify-between text-xs font-black uppercase tracking-wide text-slate-500">
                  <span>
                    Round {roundNum} / {TOTAL_ROUNDS}
                  </span>
                  <span>Turns left: {turnsLeft}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden border-2 border-slate-300">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 ease-out"
                    style={{ width: `${(roundNum / TOTAL_ROUNDS) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-center font-black text-slate-800 uppercase text-lg mb-4 flex items-center justify-center gap-2">
                <Brain className="text-purple-600" size={22} />
                Find the matching pairs!
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {deck.map((c) => {
                  const isFaceUp = c.flipped || c.matched;
                  const isSelected = flipped.includes(c.idx);
                  return (
                    <button
                      key={`${roundNum}-${c.idx}-${c.pairId}`}
                      type="button"
                      onClick={() => onFlip(c.idx)}
                      className={`relative aspect-square rounded-2xl border-4 shadow-lg transition-all active:scale-95 overflow-hidden ${
                        c.matched
                          ? "bg-emerald-50 border-emerald-300"
                          : isSelected
                            ? "bg-purple-50 border-purple-400"
                            : "bg-slate-100 hover:bg-white border-slate-200 hover:border-amber-300"
                      }`}
                      aria-label={isFaceUp ? c.label : "Hidden card"}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {isFaceUp ? (
                          <>
                            <span className="text-5xl sm:text-6xl" aria-hidden>
                              {c.emoji}
                            </span>
                            <span className="mt-1 text-[10px] sm:text-xs font-black uppercase tracking-wide text-slate-700">
                              {c.label}
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl" aria-hidden>
                            ❓
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-center text-xs font-bold text-slate-600">
                Tip: remember where each picture is — that’s brain power!
              </p>
            </div>
          )}

          {phase === "complete" && tier && (
            <div
              className={`relative rounded-[2rem] shadow-2xl border-4 p-6 sm:p-8 overflow-hidden animate-quiz-pop ${
                tier === "retry"
                  ? "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300"
                  : "bg-gradient-to-br from-amber-50 via-white to-purple-50 border-amber-300"
              }`}
            >
              <ConfettiBurst show={tier !== "retry"} />

              <div className="relative z-10 text-center">
                {tier !== "retry" && (
                  <div className="flex justify-center gap-2 mb-2 animate-quiz-sparkle">
                    <Star className="text-amber-500 fill-amber-400" size={36} />
                    <Trophy
                      className={`text-amber-600 ${
                        tier === "star" ? "animate-quiz-celebrate" : "animate-quiz-pop"
                      }`}
                      size={56}
                    />
                    <Star className="text-amber-500 fill-amber-400" size={36} />
                  </div>
                )}

                {tier === "retry" && (
                  <div className="mb-4 flex justify-center animate-quiz-wiggle">
                    <span className="text-7xl" aria-hidden>
                      💪
                    </span>
                  </div>
                )}

                <h2
                  className={`text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2 ${
                    tier === "retry"
                      ? "text-slate-700"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600"
                  }`}
                >
                  {tier === "star" && "Superstar!"}
                  {tier === "great" && "Awesome job!"}
                  {tier === "good" && "Well done!"}
                  {tier === "retry" && "Score more next time!"}
                </h2>

                <p className="text-slate-600 font-bold text-lg mb-6 animate-[quiz-fade-up_0.5s_ease-out_0.15s_both]">
                  You scored{" "}
                  <span className="text-slate-900 font-black text-2xl">
                    {endScore} / {MAX_SCORE}
                  </span>
                </p>

                <div className="grid gap-3 text-left bg-white/80 rounded-2xl p-4 border-2 border-white shadow-inner mb-6 animate-[quiz-fade-up_0.5s_ease-out_0.25s_both]">
                  <div className="flex justify-between items-center font-black text-sm uppercase tracking-wide text-slate-600">
                    <span className="flex items-center gap-2">
                      <Trophy size={18} className="text-amber-500" />
                      Personal best
                    </span>
                    <span className="text-slate-900 text-lg">
                      {newBest}/{MAX_SCORE}
                      {isNewRecord && (
                        <span className="ml-2 text-xs text-emerald-600 font-black normal-case">New record!</span>
                      )}
                    </span>
                  </div>
                  {lastGameScore !== null && (
                    <div className="flex justify-between items-center font-bold text-sm text-slate-600 border-t border-slate-200 pt-3 mt-1">
                      <span>Previous game</span>
                      <span className="text-slate-900">
                        {lastGameScore}/{MAX_SCORE}
                        <span className="text-slate-400 font-normal ml-1">
                          ({endScore >= lastGameScore ? "+" : ""}
                          {endScore - lastGameScore} vs last)
                        </span>
                      </span>
                    </div>
                  )}
                  {lastGameScore === null && (
                    <p className="text-xs font-bold text-slate-500 border-t border-slate-200 pt-3 mt-1">
                      First game saved — play again to build your history!
                    </p>
                  )}
                </div>

                {tier === "retry" && (
                  <p className="text-slate-600 font-bold text-sm mb-6 flex items-center justify-center gap-2 animate-[quiz-fade-up_0.5s_ease-out_0.35s_both]">
                    <Sparkles className="text-purple-500 shrink-0" size={20} />
                    Slow down, remember positions, and match pairs!
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center animate-[quiz-fade-up_0.5s_ease-out_0.4s_both]">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black uppercase tracking-wide bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg border-b-4 border-emerald-800 active:translate-y-1 active:border-b-0 transition-all"
                  >
                    <RotateCcw size={22} />
                    Play again
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/game/memory/info")}
                    className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black uppercase tracking-wide bg-slate-200 text-slate-800 hover:bg-slate-300 transition-all"
                  >
                    Back to hub
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BackgroundMusic />
    </div>
  );
};

export default MemoryMatchPlay;

