import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw, Star, Trophy, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import BackgroundMusic from "../components/BackgroundMusic";
import bg from "../assets/game2.png";
import { NUMBER_LEARN_ITEMS, pickRandom, shuffle } from "../data/numberCountingData";
import {
  bestFromHistory,
  loadNumberCountingHistory,
  saveNumberCountingAttempt,
  type NumberCountingAttempt,
} from "../utils/numberCountingStorage";

const TOTAL_ROUNDS = 20;
const BALLOONS_PER_ROUND = 9;

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
          className={`absolute h-3 w-3 rounded-sm opacity-90 ${confettiColors[i % confettiColors.length]} animate-[quiz-fade-up_0.6s_ease-out_forwards]`}
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

type Balloon = {
  id: string;
  n: number;
  leftPct: number;
  delayMs: number;
  hue: number;
};

type Task =
  | { kind: "pop"; target: number; balloons: Balloon[] }
  | { kind: "count"; target: number; emoji: string; noun: string; choices: number[] };

function pluralize(noun: string, n: number) {
  if (n === 1) return noun;
  if (noun === "teddy") return "teddies";
  return `${noun}s`;
}

function newPopTask(): Task {
  const target = pickRandom(NUMBER_LEARN_ITEMS).n;
  const pool = shuffle(NUMBER_LEARN_ITEMS.map((x) => x.n).filter((n) => n !== target)).slice(
    0,
    Math.max(0, BALLOONS_PER_ROUND - 1)
  );
  const nums = shuffle([target, ...pool]);
  const balloons: Balloon[] = nums.map((n, i) => ({
    id: `${Date.now()}-${i}-${n}`,
    n,
    leftPct: 6 + ((i * 13) % 88),
    delayMs: (i * 140) % 900,
    hue: (i * 45 + n * 17) % 360,
  }));
  return { kind: "pop", target, balloons };
}

function newCountTask(): Task {
  const item = pickRandom(NUMBER_LEARN_ITEMS);
  const target = item.n;
  const rest = shuffle(NUMBER_LEARN_ITEMS.map((x) => x.n).filter((n) => n !== target)).slice(0, 3);
  const choices = shuffle([target, ...rest]);
  return { kind: "count", target, emoji: item.emoji, noun: item.noun, choices };
}

function newTask(): Task {
  return Math.random() < 0.55 ? newPopTask() : newCountTask();
}

const NumberCountingPlay = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [roundNum, setRoundNum] = useState(1);
  const [score, setScore] = useState(0);
  const [task, setTask] = useState<Task>(() => newTask());

  /** Snapshot of history before this session (for “previous” comparison). */
  const [historyBefore] = useState<NumberCountingAttempt[]>(() => loadNumberCountingHistory());
  const [historyAfter, setHistoryAfter] = useState<NumberCountingAttempt[] | null>(null);

  const prevBest = useMemo(() => bestFromHistory(historyBefore), [historyBefore]);
  const lastGameScore = historyBefore[0]?.score ?? null;

  useEffect(() => {
    if (phase !== "playing") return;
    if (task.kind === "pop") speak(`Pop number ${task.target}!`);
    if (task.kind === "count") speak(`Count the objects. Choose number ${task.target}!`);
    return () => window.speechSynthesis.cancel();
  }, [task, phase]);

  const finishGame = (finalScore: number) => {
    const updated = saveNumberCountingAttempt(finalScore, TOTAL_ROUNDS);
    setHistoryAfter(updated);
    setPhase("complete");
    const tier = tierForScore(finalScore, TOTAL_ROUNDS);
    if (tier === "star" || tier === "great") {
      speak(`Amazing! You popped ${finalScore} correct balloons!`);
    } else if (tier === "good") {
      speak(`Nice! You got ${finalScore} correct.`);
    } else {
      speak("Keep practicing! Numbers are getting easier.");
    }
  };

  const onPop = (n: number) => {
    if (phase !== "playing") return;
    const correct = task.kind === "pop" && n === task.target;
    let nextScore = score;
    if (correct) {
      nextScore = score + 1;
      setScore(nextScore);
      speak("Pop! Correct!");
    } else {
      speak(`Oops! That is ${n}. Try again!`);
    }

    if (roundNum >= TOTAL_ROUNDS) {
      finishGame(nextScore);
      return;
    }
    setRoundNum((r) => r + 1);
    setTask(newTask());
  };

  const onPickNumber = (n: number) => {
    if (phase !== "playing") return;
    if (task.kind !== "count") return;
    const correct = n === task.target;
    let nextScore = score;
    if (correct) {
      nextScore = score + 1;
      setScore(nextScore);
      speak("Correct! Great counting!");
    } else {
      speak(`Nice try! The correct answer is ${task.target}.`);
    }
    if (roundNum >= TOTAL_ROUNDS) {
      finishGame(nextScore);
      return;
    }
    setRoundNum((r) => r + 1);
    setTask(newTask());
  };

  const restart = () => {
    window.speechSynthesis.cancel();
    setPhase("playing");
    setRoundNum(1);
    setScore(0);
    setTask(newTask());
    setHistoryAfter(null);
  };

  const endScore = historyAfter?.[0]?.score ?? score;
  const tier = phase === "complete" ? tierForScore(endScore, TOTAL_ROUNDS) : null;
  const newBest = historyAfter ? bestFromHistory(historyAfter) : prevBest;
  const isNewRecord = phase === "complete" && endScore > prevBest;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <div className="relative flex-grow flex flex-col pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/35 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto w-full">
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

          {phase === "playing" && (
            <div className="bg-white/95 rounded-[2rem] shadow-2xl border-4 border-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-blue-700 font-black uppercase tracking-widest text-xs">
                  <Play size={18} fill="currentColor" /> 🎯 Playing Phase
                </div>
                <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-2xl border-2 border-amber-300">
                  <Trophy className="text-amber-600" size={22} />
                  <span className="font-black text-slate-800">{score} pts</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-wide text-slate-500 mb-1">
                  <span>
                    Round {roundNum} / {TOTAL_ROUNDS}
                  </span>
                  <span>{Math.round((roundNum / TOTAL_ROUNDS) * 100)}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden border-2 border-slate-300">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 transition-all duration-300 ease-out"
                    style={{ width: `${(roundNum / TOTAL_ROUNDS) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-center mb-5">
                {task.kind === "pop" && (
                  <>
                    <p className="font-black text-slate-800 uppercase text-lg">Pop number {task.target}!</p>
                    <p className="text-xs font-bold text-slate-600 mt-1">Tap the correct balloon 🎈</p>
                  </>
                )}
                {task.kind === "count" && (
                  <>
                    <p className="font-black text-slate-800 uppercase text-lg">Count and choose the number</p>
                    <p className="text-xs font-bold text-slate-600 mt-1">
                      How many {pluralize(task.noun, task.target)} do you see?
                    </p>
                  </>
                )}
              </div>

              {task.kind === "pop" && (
                <div className="relative h-[320px] sm:h-[360px] rounded-2xl bg-gradient-to-b from-sky-100 to-white border-2 border-slate-200 overflow-hidden">
                  {task.balloons.map((b, i) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onPop(b.n)}
                      className="absolute flex flex-col items-center gap-1 select-none active:scale-95 transition-transform animate-float"
                      style={{
                        left: `${b.leftPct}%`,
                        bottom: `${10 + (i % 4) * 16}px`,
                        animationDelay: `${b.delayMs}ms`,
                      }}
                      aria-label={`Balloon number ${b.n}`}
                    >
                      <div
                        className="w-16 h-20 sm:w-18 sm:h-24 rounded-full shadow-lg border-4 border-white flex items-center justify-center"
                        style={{
                          background: `hsl(${b.hue} 90% 60%)`,
                        }}
                      >
                        <span className="text-2xl font-black text-white drop-shadow">{b.n}</span>
                      </div>
                      <div className="w-0.5 h-7 bg-slate-300 rounded-full" aria-hidden />
                    </button>
                  ))}
                </div>
              )}

              {task.kind === "count" && (
                <div className="rounded-2xl bg-gradient-to-b from-sky-100 to-white border-2 border-slate-200 p-4">
                  <div className="grid grid-cols-5 gap-2 justify-items-center py-2">
                    {Array.from({ length: task.target }).map((_, i) => (
                      <span key={i} className="text-3xl sm:text-4xl" aria-hidden>
                        {task.emoji}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {task.choices.map((n) => (
                      <button
                        key={`${roundNum}-${n}`}
                        type="button"
                        onClick={() => onPickNumber(n)}
                        className="py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg border-b-4 border-blue-900 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-wide text-xl"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-5 text-center text-xs font-bold text-slate-600">
                Tip: count slowly with your finger!
              </p>
            </div>
          )}

          {phase === "complete" && tier && (
            <div
              className={`relative rounded-[2rem] shadow-2xl border-4 p-6 sm:p-8 overflow-hidden animate-quiz-pop ${
                tier === "retry"
                  ? "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300"
                  : "bg-gradient-to-br from-amber-50 via-white to-blue-50 border-amber-300"
              }`}
            >
              <ConfettiBurst show={tier !== "retry"} />

              <div className="relative z-10 text-center">
                {tier !== "retry" && (
                  <div className="flex justify-center gap-2 mb-2 animate-quiz-sparkle">
                    <Star className="text-amber-500 fill-amber-400" size={36} />
                    <Trophy
                      className={`text-amber-600 ${tier === "star" ? "animate-quiz-celebrate" : "animate-quiz-pop"}`}
                      size={56}
                    />
                    <Star className="text-amber-500 fill-amber-400" size={36} />
                  </div>
                )}

                {tier === "retry" && (
                  <div className="mb-4 flex justify-center animate-quiz-wiggle">
                    <span className="text-7xl" aria-hidden>
                      🎈
                    </span>
                  </div>
                )}

                <h2
                  className={`text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2 ${
                    tier === "retry"
                      ? "text-slate-700"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500"
                  }`}
                >
                  {tier === "star" && "Number Champion!"}
                  {tier === "great" && "Awesome job!"}
                  {tier === "good" && "Well done!"}
                  {tier === "retry" && "Try again!"}
                </h2>

                <p className="text-slate-600 font-bold text-lg mb-6 animate-[quiz-fade-up_0.5s_ease-out_0.15s_both]">
                  You scored{" "}
                  <span className="text-slate-900 font-black text-2xl">
                    {endScore} / {TOTAL_ROUNDS}
                  </span>
                </p>

                <div className="grid gap-3 text-left bg-white/80 rounded-2xl p-4 border-2 border-white shadow-inner mb-6 animate-[quiz-fade-up_0.5s_ease-out_0.25s_both]">
                  <div className="flex justify-between items-center font-black text-sm uppercase tracking-wide text-slate-600">
                    <span className="flex items-center gap-2">
                      <Trophy size={18} className="text-amber-500" />
                      Personal best
                    </span>
                    <span className="text-slate-900 text-lg">
                      {newBest}/{TOTAL_ROUNDS}
                      {isNewRecord && (
                        <span className="ml-2 text-xs text-emerald-600 font-black normal-case">New record!</span>
                      )}
                    </span>
                  </div>
                  {lastGameScore !== null && (
                    <div className="flex justify-between items-center font-bold text-sm text-slate-600 border-t border-slate-200 pt-3 mt-1">
                      <span>Previous game</span>
                      <span className="text-slate-900">
                        {lastGameScore}/{TOTAL_ROUNDS}
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
                    <Sparkles className="text-blue-500 shrink-0" size={20} />
                    Listen to the number and pop the matching balloon!
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
                    onClick={() => navigate("/game/numbers/info")}
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

export default NumberCountingPlay;

