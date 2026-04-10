import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import ArtStudio from "./pages/ArtStudio";
//import ArtStudioIntro from "./pages/ArtStudioPlay"; 
import ShapeHunterInfo from "./pages/ShapeHunterInfo";
import SignMasterInfo from "./pages/SignMasterInfo";
import AnimalSoundInfo from "./pages/AnimalSoundInfo";
import AnimalSoundLearn from "./pages/AnimalSoundLearn";
import AnimalSoundPlay from "./pages/AnimalSoundPlay";
import ShapeLearningPhase from "./pages/ShapeLearningPhase";
import MemoryMatchInfo from "./pages/MemoryMatchInfo";
import MemoryMatchLearn from "./pages/MemoryMatchLearn";
import MemoryMatchPlay from "./pages/MemoryMatchPlay";
import ColorMatchInfo from "./pages/ColorMatchInfo";
import ColorMatchLearn from "./pages/ColorMatchLearn";
import ColorMatchPlay from "./pages/ColorMatchPlay";
import NumberCountingInfo from "./pages/NumberCountingInfo";
import NumberCountingLearn from "./pages/NumberCountingLearn";
import NumberCountingPlay from "./pages/NumberCountingPlay";
// import ArtStudioInfo from "./pages/ArtStudioInfo";
// import ArtLearningPhase from "./pages/ArtLearningPhase";
// import ArtStudioPlay from "./pages/ArtStudioPlay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/games/art-info" element={<ArtStudioInfo />} />  
      <Route path="/games/art/learning-info" element={<ArtLearningPhase />} />
      <Route path="/games/art/drawing-info" element={<ArtStudioPlay />} /> */}
      
      {/* 2. Add this route to match your URL */}
      <Route path="/games/shapes-info" element={<ShapeHunterInfo />} />
      <Route path="/games/shapes/learning-info" element={<ShapeLearningPhase />} />
      
      <Route path="/games/road-signs-info" element={<SignMasterInfo />} />
      <Route path="/game/food/info" element={<AnimalSoundInfo />} />
      <Route path="/game/food/learn" element={<AnimalSoundLearn />} />
      <Route path="/game/food/play" element={<AnimalSoundPlay />} />

      <Route path="/game/memory/info" element={<MemoryMatchInfo />} />
      <Route path="/game/memory/learn" element={<MemoryMatchLearn />} />
      <Route path="/game/memory/play" element={<MemoryMatchPlay />} />

      <Route path="/game/colors/info" element={<ColorMatchInfo />} />
      <Route path="/game/colors/learn" element={<ColorMatchLearn />} />
      <Route path="/game/colors/play" element={<ColorMatchPlay />} />

      <Route path="/game/numbers/info" element={<NumberCountingInfo />} />
      <Route path="/game/numbers/learn" element={<NumberCountingLearn />} />
      <Route path="/game/numbers/play" element={<NumberCountingPlay />} />

      {/* You can add your other games here later */}
      {/* <Route path="/games/math-quiz" element={<MathQuiz />} /> */}
    </Routes>
  );
}

export default App;