export type NumberLearnItem = {
  n: number;
  title: string;
  emoji: string;
  noun: string;
  say: string;
};

const WORDS_1_TO_20 = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
] as const;

function pickObject(n: number): { emoji: string; noun: string } {
  const pool = [
    { emoji: "🍎", noun: "apple" },
    { emoji: "🎈", noun: "balloon" },
    { emoji: "🍪", noun: "cookie" },
    { emoji: "⭐", noun: "star" },
    { emoji: "🧸", noun: "teddy" },
  ];
  return pool[(n - 1) % pool.length];
}

function pluralize(noun: string, n: number) {
  if (n === 1) return noun;
  if (noun === "teddy") return "teddies";
  return `${noun}s`;
}

export const NUMBER_LEARN_ITEMS: NumberLearnItem[] = Array.from({ length: 20 }).map((_, i) => {
  const n = i + 1;
  const word = WORDS_1_TO_20[i];
  const { emoji, noun } = pickObject(n);
  const nounPlural = pluralize(noun, n);
  return {
    n,
    title: `${n} — ${word}`,
    emoji,
    noun,
    say: `This is number ${n}. ${word}. ${word} ${nounPlural}!`,
  };
});

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

