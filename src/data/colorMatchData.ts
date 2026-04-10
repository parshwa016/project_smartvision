export type ColorItem = {
  id: string;
  name: string;
  /** Solid color for swatch. */
  hex?: string;
  /** Tailwind background classes for gradient swatches (rainbow). */
  bgClass?: string;
  emoji: string;
  funFact: string;
  say?: string;
};

export const COLOR_LEARN_ITEMS: ColorItem[] = [
  {
    id: "red",
    name: "Red",
    hex: "#ef4444",
    emoji: "🍓",
    funFact: "Red is the color of strawberries and apples!",
    say: "Red",
  },
  {
    id: "orange",
    name: "Orange",
    hex: "#f97316",
    emoji: "🍊",
    funFact: "Orange is the color of oranges and sunsets.",
    say: "Orange",
  },
  {
    id: "yellow",
    name: "Yellow",
    hex: "#eab308",
    emoji: "🌟",
    funFact: "Yellow is bright like the sun!",
    say: "Yellow",
  },
  {
    id: "green",
    name: "Green",
    hex: "#22c55e",
    emoji: "🍀",
    funFact: "Green is the color of leaves and grass.",
    say: "Green",
  },
  {
    id: "blue",
    name: "Blue",
    hex: "#3b82f6",
    emoji: "🌊",
    funFact: "Blue is the color of the sky and ocean.",
    say: "Blue",
  },
  {
    id: "purple",
    name: "Purple",
    hex: "#a855f7",
    emoji: "🍇",
    funFact: "Purple is the color of grapes and magic.",
    say: "Purple",
  },
  {
    id: "pink",
    name: "Pink",
    hex: "#ec4899",
    emoji: "🌸",
    funFact: "Pink is the color of flowers and candy.",
    say: "Pink",
  },
  {
    id: "brown",
    name: "Brown",
    hex: "#a16207",
    emoji: "🍫",
    funFact: "Brown is the color of chocolate and trees.",
    say: "Brown",
  },
  {
    id: "black",
    name: "Black",
    hex: "#111827",
    emoji: "🖤",
    funFact: "Black is a strong color — like night time.",
    say: "Black",
  },
  {
    id: "white",
    name: "White",
    hex: "#ffffff",
    emoji: "☁️",
    funFact: "White is the color of clouds and snow.",
    say: "White",
  },
  {
    id: "rainbow",
    name: "Rainbow",
    bgClass: "bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500",
    emoji: "🌈",
    funFact: "A rainbow has many colors together after rain!",
    say: "Rainbow",
  },
];

export const COLOR_PLAY_POOL: ColorItem[] = COLOR_LEARN_ITEMS;

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

export function pickChoices<T extends { id: string }>(pool: T[], correct: T, count: number): T[] {
  const rest = shuffle(pool.filter((x) => x.id !== correct.id)).slice(0, Math.max(0, count - 1));
  return shuffle([correct, ...rest]);
}

