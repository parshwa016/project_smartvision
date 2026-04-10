import React, { useState, useRef, useEffect } from "react";
import { 
  Gamepad2, Rocket, Sparkles, Trophy, Star, 
  Bot, ShieldCheck, Palette, Brush 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Features from "../components/Features";
import background from "../assets/homepage.png";
import BackgroundMusic from "../components/BackgroundMusic";

import game1 from "../assets/game1.png"; // Alphabet Adventure
import game2 from "../assets/game2.png"; // Number Counting
import game3 from "../assets/game3.png"; // Color Match
import game4 from "../assets/game4.png"; // Shape Hunter
import game5 from "../assets/game5.png"; // Animal Sound
import game6 from "../assets/game6.png"; // Memory Match

// --- NEW VIDEO ASSETS ---
import videoA from "../assets/video1.mp4"; 
import videoB from "../assets/video2.mp4";

const Home = () => {
  // --- VIDEO LOGIC ---
  const [currentVideo, setCurrentVideo] = useState(videoA);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  
  const handleVideoEnd = () => {
    // Switch between A and B
    setCurrentVideo((prev) => (prev === videoA ? videoB : videoA));
  };

  // Auto-play when video changes
  useEffect(() => {
  const video = videoRef.current;

  if (video) {
    video.pause(); // stop previous
    video.currentTime = 0;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay blocked:", error);
      });
    }
  }
}, [currentVideo]);

  const games = [
    {
      title: "Alphabet Adventure",
      category: "Letters & Phonics",
      imageUrl: game1,
      color: "text-rose-500",
      path: "/games/art-info" // Path remains as requested
    },
    {
      title: "Number Counting",
      category: "Math Basics 1-20",
      imageUrl: game2,
      color: "text-blue-500",
      path: "/game/numbers/info"
    },
    {
      title: "Color Match",
      category: "Colors & Rainbows",
      imageUrl: game3,
      color: "text-yellow-500",
      path: "/game/colors/info"
    },
    {
      title: "Shape Hunter",
      category: "Geometric Shapes",
      imageUrl: game4,
      color: "text-orange-500",
      path: "/game/animals/info"
    },
    {
      title: "Animal & Sound",
      category: "Nature & Animals",
      imageUrl: game5,
      color: "text-emerald-600",
      path: "/game/food/info"
    },
    {
      title: "Memory Match",
      category: "Focus & Brain Power",
      imageUrl: game6,
      color: "text-purple-500",
      path: "/game/memory/info"
    }
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />

      {/* HERO SECTION */}
<section className="relative flex flex-col md:flex-row items-center justify-between px-10 pt-24 pb-10 max-w-7xl mx-auto gap-12 min-h-[80vh]">
  
  {/* Left: Text Content */}
  <div className="flex-1 text-center md:text-left z-10 scale-90 md:scale-100">
    
    {/* Professional Badge */}
    <div className="inline-flex items-center gap-2 p-2 px-6 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
      <Sparkles size={16} className="text-yellow-500 animate-pulse" />
      <span className="text-primary font-black uppercase tracking-widest text-[10px] md:text-xs">
        Welcome to the Future of Learning
      </span>
    </div>
    
    <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
      Learn & <br />
      <span className="text-primary underline decoration-yellow-400 decoration-8 underline-offset-4">Play!</span>
    </h1>
    
    <p className="flex items-center justify-center md:justify-start gap-3 text-xl md:text-2xl text-slate-600 mb-8 font-bold leading-relaxed max-w-md">
      The fun world where your smart robot friend helps you grow every single day! 
      <Rocket size={28} className="text-primary animate-bounce-slow" />
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <a href="#games" className="group bg-primary text-white px-8 py-4 rounded-[2rem] text-xl font-black hover:scale-105 transition-all shadow-[0_10px_0_0_#be123c] active:translate-y-2 active:shadow-none inline-flex items-center gap-3">
        START ADVENTURE <Star size={24} fill="currentColor" className="group-hover:rotate-45 transition-transform" />
      </a>
    </div>
  </div>

  {/* Right: The Mascot Visual (Both Videos) */}
  <div className="flex-1 flex justify-center relative scale-90 md:scale-100">
    {/* Animated background glow */}
    <div className="absolute w-[500px] h-[500px] bg-yellow-200/30 blur-[120px] rounded-full animate-pulse"></div>
    
    <div className="relative z-10 animate-float">
      {/* 4:3 Video Container */}
      <div className="w-full max-w-[500px] aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white bg-white relative">
        <video
          ref={videoRef}
          src={currentVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        />
        
        {/* --- TROPHY BADGE POSITIONED TO COVER WATERMARK --- */}
        <div className="absolute top-4 right-4 z-50">
  <div className="bg-white p-5 rounded-2xl shadow-xl border-b-4 border-yellow-400 animate-bounce">
    <Trophy size={60} className="text-yellow-500" />
  </div>
</div>
        {/* ---------------------------------------------------- */}
      </div>
      
      {/* Floating Sparkles Badge - Left Side */}
      <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl -rotate-12 animate-pulse border-b-4 border-blue-400 z-20">
        <Sparkles size={40} className="text-blue-500" />
      </div>
    </div>
  </div>
</section>
      {/* GAMES SECTION */}
      <section id="games" className="px-10 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-800 mb-4">
            Pick Your Adventure! <Sparkles className="inline text-yellow-400" />
          </h2>
          <div className="h-2 w-32 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </section>

      <Features />
      <Footer />
      <BackgroundMusic/>    
    </div>
  );
};

export default Home;