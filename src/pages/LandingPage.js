import { useState } from "react";
import Scratch from "../components/Scratch";
import CanvasWithImage from "../components/Scratchv2";
import ScratchBasic from "../components/Scratchv3";

function LandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      {/* <CanvasWithImage /> */}
      {/* <ScratchBasic /> */}
    <Scratch />

    </>
  );
}

export default LandingPage;
