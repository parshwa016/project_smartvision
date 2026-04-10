export type AnimalItem = {
  id: string;
  name: string;
  emoji: string;
  /** Filename in `public/sounds/` */
  soundFile: string;
};

export const ANIMALS: AnimalItem[] = [
  { id: "lion", name: "Lion", emoji: "🦁", soundFile: "lion.mp3" },
  { id: "elephant", name: "Elephant", emoji: "🐘", soundFile: "elephant.mp3" },
  { id: "frog", name: "Frog", emoji: "🐸", soundFile: "frog.mp3" },
  { id: "bird", name: "Bird", emoji: "🐦", soundFile: "bird.mp3" },
  { id: "dog", name: "Dog", emoji: "🐕", soundFile: "dog.mp3" },
  { id: "cat", name: "Cat", emoji: "🐈", soundFile: "cat.mp3" },
];

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function pickRandomThree(correct: AnimalItem): AnimalItem[] {
  const rest = ANIMALS.filter((a) => a.id !== correct.id);
  const shuffled = [...rest].sort(() => Math.random() - 0.5);
  const choices = [correct, shuffled[0]!, shuffled[1]!].sort(() => Math.random() - 0.5);
  return choices;
}
