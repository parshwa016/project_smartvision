import React, { useState, useRef, useEffect } from 'react';
// Import your assets
import videoA from '../assets/video1.mp4'; 
import videoB from '../assets/video2.mp4';
// Import Lucide icons (already in your project)
import { Sparkles, Rocket, Star, Trophy } from 'lucide-react';

const HeroSection = () => {
  // State to toggle between the 5s and 8s videos
  const [currentVideo, setCurrentVideo] = useState(videoA);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // When a video ends, switch to the other one
  const handleVideoEnd = () => {
    const nextVideo = currentVideo === videoA ? videoB : videoA;
    setCurrentVideo(nextVideo);
  };

  // Ensure the video plays immediately when the source changes
  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.load();
    videoRef.current.play().catch(error => {
      console.log("Autoplay prevented, waiting for user interaction.", error);
    });
  }
}, [currentVideo]);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-10 py-10 max-w-7xl mx-auto gap-12 min-h-[70vh] -mt-1 font-sans">
      
      {/* LEFT SIDE: TEXT & BUTTONS */}
      <div className="flex-1 text-center md:text-left z-10 scale-90 md:scale-100">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 p-2 px-6 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
          <Sparkles size={16} className="text-yellow-500 animate-pulse" />
          <span className="text-rose-600 font-black uppercase tracking-widest text-[10px] md:text-xs">
            KG & Junior KG Learning Fun!
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
          Learn & <br />
          <span className="text-rose-600 underline decoration-yellow-400 decoration-8 underline-offset-4">Play!</span>
        </h1>
        
        <p className="flex items-center justify-center md:justify-start gap-3 text-xl md:text-2xl text-slate-600 mb-8 font-bold leading-relaxed max-w-md">
          The fun world where your smart robot friend helps you grow every single day! 
          <Rocket size={28} className="text-rose-600 animate-bounce-slow" />
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#games" className="group bg-rose-600 text-white px-8 py-4 rounded-[2rem] text-xl font-black hover:scale-105 transition-all shadow-[0_10px_0_0_#be123c] active:translate-y-2 active:shadow-none inline-flex items-center gap-3">
            START ADVENTURE <Star size={24} fill="currentColor" className="group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE: THE VIDEO MASCOT */}
      <div className="flex-1 flex justify-center relative scale-90 md:scale-100">
        {/* Background Glow */}
        <div className="absolute w-[450px] h-[450px] bg-yellow-200/40 blur-[100px] rounded-full animate-pulse"></div>
        
        <div className="relative z-10">
          {/* 4:3 Aspect Ratio Container - Looks like a Tablet */}
          <div className="w-full max-w-[480px] aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white bg-slate-100 ring-8 ring-slate-50/50">
            <video
              ref={videoRef}
              src={currentVideo}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating Badges */}
          <div className="absolute -top-6 -right-2 bg-white p-4 rounded-2xl shadow-xl rotate-12 animate-bounce-slow border-b-4 border-yellow-400 z-20">
            <Trophy size={40} className="text-yellow-500" />
          </div>
          <div className="absolute -bottom-4 -left-6 bg-white p-4 rounded-2xl shadow-xl -rotate-12 animate-pulse border-b-4 border-blue-400 z-20">
            <Sparkles size={40} className="text-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;