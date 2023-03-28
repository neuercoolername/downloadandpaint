import { useState } from "react";
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

    <KonvaScratch />

    </>
  );
}

export default LandingPage;
