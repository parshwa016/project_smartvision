import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

/* ✅ INTERFACE (IMPORTANT) */
interface Shape {
  id: number;
  shape_name: string;
  raw_image_url: string;
  example_1_url: string;
  example_2_url: string;
  description: string;
}

const ShapeLearningPhase: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  /* ✅ FETCH DATA */
  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/get-shapes");
        const data: Shape[] = await res.json();
        setShapes(data);
      } catch (error) {
        console.error("Error fetching shapes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShapes();
  }, []);

  /* ✅ SAFE LOADING */
  if (loading || shapes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold text-primary animate-pulse">
        Loading Adventure...
      </div>
    );
  }

  const currentShape = shapes[currentIndex];
  const progress = ((currentIndex + 1) / shapes.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-29">
        
        {/* 🔹 TOP BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          
          <button
            onClick={() => navigate("/games/shapes-info")}
            className="bg-white px-6 py-3 rounded-2xl shadow hover:scale-105 transition flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={18} /> Exit
          </button>

          <div className="w-full max-w-md bg-white p-2 rounded-full shadow-inner flex items-center gap-4">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-500">
              {currentIndex + 1}/{shapes.length}
            </span>
          </div>
        </div>

        {/* 🔹 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* 🟦 LEFT SIDE (IMAGES) */}
          <div className="flex flex-col gap-6">

            {/* MAIN IMAGE */}
            <div className="bg-white rounded-3xl p-8 shadow flex items-center justify-center min-h-[280px]">
              <img
                src={currentShape.raw_image_url}
                alt="shape"
                className="max-w-[220px] max-h-[220px] w-full h-auto object-contain transition hover:scale-105"
              />
            </div>

            {/* EXAMPLES */}
            <div className="grid grid-cols-2 gap-4">
              {[currentShape.example_1_url, currentShape.example_2_url].map(
                (img, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-2xl shadow flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`example-${index}`}
                      className="w-full h-[140px] object-contain"
                    />
                  </div>
                )
              )}
            </div>

          </div>

          {/* 🟨 RIGHT SIDE (TEXT) */}
          <div className="flex flex-col gap-6">

            {/* TITLE */}
            <div className="bg-yellow-400 rounded-3xl p-6 text-center shadow">
              <h2 className="text-white text-4xl md:text-5xl font-bold uppercase">
                {currentShape.shape_name}
              </h2>
            </div>

            {/* DESCRIPTION CARD */}
            <div className="bg-white rounded-3xl p-8 shadow flex flex-col min-h-[320px]">

              <div className="flex items-center gap-3 mb-4 text-red-500">
                <Lightbulb size={28} />
                <h3 className="text-xl font-bold uppercase">Robot Tips</h3>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                {currentShape.description}
              </p>

              {/* TIPS */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="text-green-500" />
                  Look for edges
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="text-green-500" />
                  Count corners
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-auto flex gap-4">
                
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="flex-1 py-3 bg-gray-200 rounded-xl font-semibold disabled:opacity-50"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    if (currentIndex < shapes.length - 1) {
                      setCurrentIndex((prev) => prev + 1);
                    } else {
                      navigate("/games/shapes-info");
                    }
                  }}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  {currentIndex === shapes.length - 1
                    ? "Finish"
                    : "Next"}
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default ShapeLearningPhase;