import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import bgMusic from '../assets/music.mp3';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // This function handles the hardware directly to ensure it STOPS
  const toggleMusic = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => console.log("Playback blocked", err));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Gentle volume for kids
    }

    // Auto-start logic on first click
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
        window.removeEventListener('mousedown', handleFirstInteraction);
      }
    };

    window.addEventListener('mousedown', handleFirstInteraction);
    return () => window.removeEventListener('mousedown', handleFirstInteraction);
  }, []);

  return (
    /* Positioning: right-10 and bottom-24 to keep it above the taskbar */
    <div className="fixed bottom-10 right-1 z-[9000]">
      <audio ref={audioRef} src={bgMusic} loop />
      
      <button
        onClick={toggleMusic}
        className={`p-5 rounded-full shadow-2xl border-4 transition-all duration-300 transform hover:scale-110 active:scale-90 ${
          isPlaying 
          ? "bg-white border-rose-500 text-rose-500" 
          : "bg-slate-100 border-slate-300 text-slate-400"
        }`}
      >
        {isPlaying ? <Volume2 size={40} /> : <VolumeX size={40} />}
      </button>
    </div>
  );
};

export default BackgroundMusic;