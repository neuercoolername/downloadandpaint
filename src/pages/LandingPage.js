import { useState } from "react";
import Scratch from "../components/Scratch";
import ScratchBasic from "../components/Scratchv3";
import ScratchCard from "../components/Scratchv2";
import cardImage from '../foreground.jpg'
import { KonvaScratch } from "../components/KonvaScratch2";


function LandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const settings = {
    width: 640,
    height: 480,
    image: cardImage,
    finishPercent: 50,
    onComplete: () => console.log('The card is now clear!')
  };

  return (
    <>
      {/* <ScratchCard {...settings}> */}
      {/* </ScratchCard> */}
      {/* <ScratchBasic /> */}
    {/* <Scratch /> */}
    <KonvaScratch />

    </>
  );
}

export default LandingPage;
