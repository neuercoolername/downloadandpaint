import { useState } from "react";
import Scratch from "../components/Scratch";

function LandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return (
    
      <Scratch />
   
  );
}

export default LandingPage;
