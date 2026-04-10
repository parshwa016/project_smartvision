import { Link } from "react-router-dom";
import { Trophy, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../auth";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  // ✅ 1. Monitor Auth State (Prevents data loss on redirect/refresh)
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ 2. Logout Function
  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-b-4 border-slate-200 rounded-[2rem] px-8 py-3 shadow-xl flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">
            Smart<span className="text-primary">Vision</span>
          </span>
        </Link>

        {/* RIGHT: Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Link to="/activity" className="flex items-center gap-2 font-black text-slate-600 hover:text-primary transition-colors uppercase text-sm tracking-widest">
              <LayoutDashboard size={20} />
              Activity
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-2 font-black text-slate-600 hover:text-yellow-500 transition-colors uppercase text-sm tracking-widest">
              <Trophy size={20} />
              Hall of Fame
            </Link>
          </div>

          <div className="h-8 w-[2px] bg-slate-200 hidden md:block" />

          {/* ✅ DYNAMIC LOGIN/LOGOUT SECTION */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* User Profile Info */}
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-100">
                <img 
                  src={user.photoURL} 
                  className="h-7 w-7 rounded-full border-2 border-white shadow-sm" 
                  alt="avatar" 
                />
                <span className="text-xs font-black text-slate-700 uppercase hidden lg:block">
                  {user.displayName?.split(" ")[0]}
                </span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border-b-2 border-slate-200 active:border-0"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            /* Login Button */
            <button 
              type="button"
              title={auth ? undefined : "Add VITE_FIREBASE_* variables in .env to enable Google login"}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_5px_0_0_#be123c] active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:pointer-events-none"
              disabled={!auth}
              onClick={async () => {
                const loggedUser = await signInWithGoogle();
                if (loggedUser) setUser(loggedUser);
              }}
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="h-5 w-5 bg-white rounded-full p-0.5" alt="G" />
              <span className="text-sm tracking-widest">LOGIN</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;