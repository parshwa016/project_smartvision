import React from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { Heart, ChevronRight, Star } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-100 pt-32 pb-10 px-10 mt-20 border-t-8 border-white">
      
      {/* Decorative Wave Top - Makes it look more kid-friendly */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-3xl shadow-md inline-block w-fit">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          <p className="text-slate-500 font-bold text-lg leading-relaxed">
            Making learning an adventure for the next generation of geniuses! 
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-pink-500 hover:scale-110 transition-transform cursor-pointer border-b-4 border-pink-100">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </div>

            <div className="p-3 bg-white rounded-2xl shadow-sm text-red-600 hover:scale-110 transition-transform cursor-pointer border-b-4 border-red-100">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Updated Links Logic */}
        {[
          {
            title: "Explore",
            links: [
              { name: "Home", to: "/" },
              { name: "About Us", to: "/about" },
              { name: "My Progress", to: "/activity" },
            ],
          },
          {
            title: "Quick Games",
            links: [
              { name: "Alphabet Fun", to: "/games/art-info" },
              { name: "Number Match", to: "/games/shapes-info" },
              { name: "Color World", to: "/games/road-signs-info" },
            ],
          },
          {
            title: "Support",
            links: [
              { name: "Privacy Policy", to: "/privacy" },
              { name: "Terms of Use", to: "/terms" },
              { name: "Contact Us", to: "/contact" },
            ],
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="bg-white/60 p-8 rounded-[2.5rem] border-b-4 border-slate-200 hover:shadow-lg transition-shadow"
          >
            <h4 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">
              {section.title}
            </h4>

            <ul className="space-y-4">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-primary font-bold flex items-center gap-2 group transition-all"
                  >
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform text-primary"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t-2 border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-slate-400 font-bold flex items-center gap-2">
          © 2026 Smart Vision | Built with
          <Heart
            size={20}
            className="text-rose-500 fill-rose-500 animate-pulse"
          />
          for kids
        </p>

        <div className="flex items-center gap-2 px-6 py-2 bg-yellow-50 rounded-full border-2 border-yellow-200 text-yellow-600 font-black">
          <Star fill="currentColor" size={20} className="animate-spin-slow" />
          <span>RATED BY TEACHERS & PARENTS</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;