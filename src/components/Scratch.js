import React, { useRef, useEffect, useState } from "react";
import drawImageProp from "../utilities/drawImageProp";
import scratch from "../utilities/drawScratch";

export default function Scratch() {
  const [deviceType, setDeviceType] = useState(null);
  const [backgroundImageLoaded,setBackgroundImageLoaded] = useState(false)
  const canvasRef = useRef(null);

  let windowRatio = window.innerHeight / window.innerWidth;

  // initial values for mouse x and y
  let mouseX = 0;
  let mouseY = 0;

  // let isDragged = true

  // detect device

  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      setDeviceType("touch");
      return true;
    } catch (e) {
      setDeviceType("mouse");
      return false;
    }
  };

  // get position of mouse/touch

  const getPosition = (e) => {
    mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  };

  // draw image

  const draw = (ctx, canvas) => {
    windowRatio = window.innerHeight / window.innerWidth;
    setBackgroundImageLoaded(false)
    const img = new Image(); // Create new img element
    if (windowRatio < 0.75) {
      img.src = "./images/foreground-wide.png";
    } else {
      img.src = "./images/foreground.jpg"; // Set source path
    }

    img.onload = () => {
      
      drawImageProp(ctx, img)
      setBackgroundImageLoaded(true)
    };

  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = (e) => {
      const handleResize = (e) => {
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
      };

      handleResize();
      draw(ctx, canvas);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", (e) => {
      getPosition(e);
      scratch(ctx, mouseX, mouseY);
    });

    draw(ctx, canvas);
    console.log("loaded");
    isTouchDevice();
  }, []);

  return (
    <div className="scratchContainer">
      <canvas
        className="scratch--canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      />

{(backgroundImageLoaded) &&(
  <img
        className="background--img"
        src={
          windowRatio < 0.75
            ? "./images/background-wide.png"
            : "./images/background.png"
        }
        alt="Painter by the Wall by Edvard Munch"
      />
  

 )}
 {!(backgroundImageLoaded) && (
    <img className='background--img' src={windowRatio < 0.75 ? './images/foreground-wide.png' : './images/foreground.jpg'} alt="Painter by the Wall by Edvard Munch" />
  )}

      
    </div>
  );
}
