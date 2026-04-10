export type MemoryLearnItem = {
  id: string;
  type: "alphabet" | "animal" | "fruit" | "shape";
  title: string;
  emoji: string;
  fact: string;
  say?: string;
};

export const MEMORY_LEARN_ITEMS: MemoryLearnItem[] = [
  {
    id: "a-apple",
    type: "alphabet",
    title: "A — Apple",
    emoji: "🍎",
    fact: "Apples can be red, green, or yellow. Crunchy and yummy!",
    say: "A for Apple!",
  },
  {
    id: "b-butterfly",
    type: "alphabet",
    title: "B — Butterfly",
    emoji: "🦋",
    fact: "Butterflies start as caterpillars and grow wings.",
    say: "B for Butterfly!",
  },
  {
    id: "c-cat",
    type: "alphabet",
    title: "C — Cat",
    emoji: "🐱",
    fact: "Cats have soft paws and can jump very high.",
    say: "C for Cat!",
  },
  {
    id: "lion",
    type: "animal",
    title: "Lion",
    emoji: "🦁",
    fact: "Lions are called the king of the jungle.",
  },
  {
    id: "elephant",
    type: "animal",
    title: "Elephant",
    emoji: "🐘",
    fact: "Elephants use their trunks to drink water and pick things up.",
  },
  {
    id: "penguin",
    type: "animal",
    title: "Penguin",
    emoji: "🐧",
    fact: "Penguins cannot fly, but they are amazing swimmers.",
  },
  {
    id: "banana",
    type: "fruit",
    title: "Banana",
    emoji: "🍌",
    fact: "Bananas are full of energy — great for play time!",
  },
  {
    id: "grapes",
    type: "fruit",
    title: "Grapes",
    emoji: "🍇",
    fact: "Grapes grow in bunches on vines.",
  },
  {
    id: "strawberry",
    type: "fruit",
    title: "Strawberry",
    emoji: "🍓",
    fact: "Strawberries have tiny seeds on the outside.",
  },
  {
    id: "circle",
    type: "shape",
    title: "Circle",
    emoji: "⚪",
    fact: "A circle is round — like a ball!",
  },
  {
    id: "triangle",
    type: "shape",
    title: "Triangle",
    emoji: "🔺",
    fact: "A triangle has 3 sides and 3 corners.",
  },
  {
    id: "square",
    type: "shape",
    title: "Square",
    emoji: "🟥",
    fact: "A square has 4 equal sides.",
  },
];

export type MemoryCard = {
  id: string;
  pairId: string;
  emoji: string;
  label: string;
};

export const MEMORY_CARD_POOL: MemoryCard[] = [
  { id: "a1", pairId: "apple", emoji: "🍎", label: "Apple" },
  { id: "a2", pairId: "apple", emoji: "🍎", label: "Apple" },
  { id: "b1", pairId: "banana", emoji: "🍌", label: "Banana" },
  { id: "b2", pairId: "banana", emoji: "🍌", label: "Banana" },
  { id: "c1", pairId: "cat", emoji: "🐱", label: "Cat" },
  { id: "c2", pairId: "cat", emoji: "🐱", label: "Cat" },
  { id: "d1", pairId: "dog", emoji: "🐶", label: "Dog" },
  { id: "d2", pairId: "dog", emoji: "🐶", label: "Dog" },
  { id: "e1", pairId: "elephant", emoji: "🐘", label: "Elephant" },
  { id: "e2", pairId: "elephant", emoji: "🐘", label: "Elephant" },
  { id: "f1", pairId: "fish", emoji: "🐟", label: "Fish" },
  { id: "f2", pairId: "fish", emoji: "🐟", label: "Fish" },
  { id: "g1", pairId: "grapes", emoji: "🍇", label: "Grapes" },
  { id: "g2", pairId: "grapes", emoji: "🍇", label: "Grapes" },
  { id: "h1", pairId: "hat", emoji: "🎩", label: "Hat" },
  { id: "h2", pairId: "hat", emoji: "🎩", label: "Hat" },
  { id: "i1", pairId: "icecream", emoji: "🍦", label: "Ice cream" },
  { id: "i2", pairId: "icecream", emoji: "🍦", label: "Ice cream" },
  { id: "j1", pairId: "lion", emoji: "🦁", label: "Lion" },
  { id: "j2", pairId: "lion", emoji: "🦁", label: "Lion" },
  { id: "k1", pairId: "penguin", emoji: "🐧", label: "Penguin" },
  { id: "k2", pairId: "penguin", emoji: "🐧", label: "Penguin" },
  { id: "l1", pairId: "star", emoji: "⭐", label: "Star" },
  { id: "l2", pairId: "star", emoji: "⭐", label: "Star" },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickPairs(pool: MemoryCard[], pairs: number): MemoryCard[] {
  const byPair = new Map<string, MemoryCard[]>();
  for (const c of pool) {
    const list = byPair.get(c.pairId) ?? [];
    list.push(c);
    byPair.set(c.pairId, list);
  }
  const pairIds = shuffle(Array.from(byPair.keys())).slice(0, pairs);
  const selected: MemoryCard[] = [];
  for (const pid of pairIds) {
    const two = byPair.get(pid) ?? [];
    if (two.length >= 2) selected.push(two[0], two[1]);
  }
  return shuffle(selected);
}

