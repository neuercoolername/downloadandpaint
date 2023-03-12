import { useState } from "react";
import Scratch from "../components/Scratch";
import CanvasWithImage from "../components/Scratchv2";

function LandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return (
    
      <Scratch />
      // <CanvasWithImage />
  );
}

export default LandingPage;
