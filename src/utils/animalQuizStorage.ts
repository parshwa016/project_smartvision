const KEY = "smartvision-animal-quiz-scores";

export type QuizAttempt = {
  score: number;
  maxScore: number;
  at: string;
};

export function loadQuizHistory(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as QuizAttempt[]) : [];
  } catch {
    return [];
  }
}

/** Saves attempt and returns full history (newest first). */
export function saveQuizAttempt(score: number, maxScore = 20): QuizAttempt[] {
  const attempt: QuizAttempt = { score, maxScore, at: new Date().toISOString() };
  const prev = loadQuizHistory();
  const next = [attempt, ...prev].slice(0, 25);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function bestFromHistory(history: QuizAttempt[]): number {
  return history.reduce((m, a) => Math.max(m, a.score), 0);
}
