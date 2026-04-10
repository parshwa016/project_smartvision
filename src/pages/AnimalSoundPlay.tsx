import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Trophy, Sparkles, RotateCcw, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import animalBg from "../assets/game6.png";
import { ANIMALS, pickRandom, pickRandomThree, type AnimalItem } from "../data/animalSoundData";
import { playAnimalSound, stopAnimalSound } from "../utils/animalAudio";
import {
  loadQuizHistory,
  saveQuizAttempt,
  bestFromHistory,
  type QuizAttempt,
} from "../utils/animalQuizStorage";

const TOTAL_ROUNDS = 20;

const speak = (text: string) => {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

function newRound(): { question: AnimalItem; choices: AnimalItem[] } {
  const question = pickRandom(ANIMALS);
  return { question, choices: pickRandomThree(question) };
}

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

const AnimalSoundPlay = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [roundNum, setRoundNum] = useState(1);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState(newRound);
  /** Snapshot of history before this session (for “previous” comparison). */
  const [historyBefore] = useState<QuizAttempt[]>(() => loadQuizHistory());
  const [historyAfter, setHistoryAfter] = useState<QuizAttempt[] | null>(null);

  const prevBest = useMemo(() => bestFromHistory(historyBefore), [historyBefore]);
  const lastGameScore = historyBefore[0]?.score ?? null;

  useEffect(() => () => stopAnimalSound(), []);

  const finishGame = (finalScore: number) => {
    const updated = saveQuizAttempt(finalScore, TOTAL_ROUNDS);
    setHistoryAfter(updated);
    setPhase("complete");
    const tier = tierForScore(finalScore, TOTAL_ROUNDS);
    if (tier === "star" || tier === "great") {
      speak(`Amazing! You scored ${finalScore} out of ${TOTAL_ROUNDS}!`);
    } else if (tier === "good") {
      speak(`Nice work! You got ${finalScore} right.`);
    } else {
      speak("Keep practicing! You can score higher next time.");
    }
  };

  const nextRound = (picked: AnimalItem) => {
    const correct = picked.id === quiz.question.id;
    let nextScore = score;
    if (correct) {
      nextScore = score + 1;
      setScore(nextScore);
      speak("Yes! Great job!");
    } else {
      speak(`Nice try! The answer was ${quiz.question.name}.`);
    }

    if (roundNum >= TOTAL_ROUNDS) {
      finishGame(nextScore);
      return;
    }
    setQuiz(newRound());
    setRoundNum((r) => r + 1);
  };

  const hearAnimal = () => {
    playAnimalSound(quiz.question.soundFile);
  };

  const restart = () => {
    stopAnimalSound();
    window.speechSynthesis.cancel();
    setPhase("playing");
    setRoundNum(1);
    setScore(0);
    setQuiz(newRound());
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
          <img src={animalBg} alt="" className="w-full h-full object-cover blur-sm brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-slate-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto w-full">
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

          {phase === "playing" && (
            <div className="bg-white/95 rounded-[2rem] shadow-2xl border-4 border-white p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-xs">
                  <Play size={18} fill="currentColor" /> Picture quiz
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
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 ease-out"
                    style={{ width: `${(roundNum / TOTAL_ROUNDS) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <span className="text-8xl sm:text-9xl block mb-4 animate-bounce" aria-hidden>
                  {quiz.question.emoji}
                </span>
                <button
                  type="button"
                  onClick={hearAnimal}
                  className="text-sm font-black text-purple-600 uppercase tracking-wide underline decoration-2 underline-offset-4 hover:text-purple-800"
                >
                  Hear the animal sound
                </button>
              </div>

              <p className="text-center font-black text-slate-800 uppercase text-lg mb-6">Who am I?</p>

              <div className="grid gap-3">
                {quiz.choices.map((c) => (
                  <button
                    key={`${roundNum}-${c.id}`}
                    type="button"
                    onClick={() => nextRound(c)}
                    className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg border-b-4 border-emerald-800 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-wide"
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
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
                      className={`text-amber-600 ${tier === "star" ? "animate-quiz-celebrate" : "animate-quiz-pop"}`}
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
                    tier === "retry" ? "text-slate-700" : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600"
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
                    <Sparkles className="text-purple-500 shrink-0" size={20} />
                    Listen to each sound and match the picture — you&apos;ll get there!
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
                    onClick={() => navigate("/game/food/info")}
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
    </div>
  );
};

export default AnimalSoundPlay;
