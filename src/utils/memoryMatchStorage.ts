export type MemoryMatchAttempt = {
  ts: number;
  score: number;
  maxScore: number;
};

const KEY = "smartvision:memory-match:history";

export function loadMemoryMatchHistory(): MemoryMatchAttempt[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((x) => {
        const o = x as Partial<MemoryMatchAttempt>;
        if (typeof o.ts !== "number" || typeof o.score !== "number" || typeof o.maxScore !== "number") return null;
        return { ts: o.ts, score: o.score, maxScore: o.maxScore };
      })
      .filter((x): x is MemoryMatchAttempt => x !== null)
      .sort((a, b) => b.ts - a.ts);
  } catch {
    return [];
  }
}

export function saveMemoryMatchAttempt(score: number, maxScore: number): MemoryMatchAttempt[] {
  const history = loadMemoryMatchHistory();
  const next: MemoryMatchAttempt[] = [{ ts: Date.now(), score, maxScore }, ...history].slice(0, 30);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore write failures (private mode / quota)
  }
  return next;
}

export function bestFromHistory(history: MemoryMatchAttempt[]): number {
  if (history.length === 0) return 0;
  return history.reduce((best, a) => Math.max(best, a.score), 0);
}

