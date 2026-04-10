export type ColorMatchAttempt = {
  ts: number;
  score: number;
  maxScore: number;
};

const KEY = "smartvision:color-match:history";

export function loadColorMatchHistory(): ColorMatchAttempt[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((x) => {
        const o = x as Partial<ColorMatchAttempt>;
        if (typeof o.ts !== "number" || typeof o.score !== "number" || typeof o.maxScore !== "number") return null;
        return { ts: o.ts, score: o.score, maxScore: o.maxScore };
      })
      .filter((x): x is ColorMatchAttempt => x !== null)
      .sort((a, b) => b.ts - a.ts);
  } catch {
    return [];
  }
}

export function saveColorMatchAttempt(score: number, maxScore: number): ColorMatchAttempt[] {
  const history = loadColorMatchHistory();
  const next: ColorMatchAttempt[] = [{ ts: Date.now(), score, maxScore }, ...history].slice(0, 30);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore write failures
  }
  return next;
}

export function bestFromHistory(history: ColorMatchAttempt[]): number {
  if (history.length === 0) return 0;
  return history.reduce((best, a) => Math.max(best, a.score), 0);
}

