/** Plays bundled MP3s from `/public/sounds` (one clip at a time). */

let active: HTMLAudioElement | null = null;

export function soundUrlForFile(filename: string): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}sounds/${filename}`;
}

export function playAnimalSound(filename: string): void {
  stopAnimalSound();
  const audio = new Audio(soundUrlForFile(filename));
  audio.preload = "auto";
  active = audio;
  void audio.play().catch(() => {});
}

export function stopAnimalSound(): void {
  if (active) {
    active.pause();
    active.currentTime = 0;
    active.src = "";
    active = null;
  }
}
