import drawImageProp from "../utilities/drawImageProp";
import scratch from "../utilities/drawScratch";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";

export default function ScratchBasic() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [canvasIsLoaded, setCanvasIsLoaded] = useState(false);
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const canvasRef = useRef(null);

  let windowRatio = window.innerHeight / window.innerWidth;

  // initial values for mouse x and y

  let mouseX = 0;
  let mouseY = 0;

  // get position of mouse/touch

  const getPosition = (e) => {
    mouseX = !isTouchDevice ? e.pageX : e.touches[0].pageX;
    mouseY = !isTouchDevice ? e.pageY : e.touches[0].pageY;
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    getPosition(e);
    scratch(ctx, mouseX, mouseY);
  };

  const draw = (ctx, canvas) => {
    // windowRatio = window.innerHeight / window.innerWidth;
    // setBackgroundImageLoaded(false);
    const img = new Image();

    img.onload = () => {
      if (!canvasRef.current) return;
      console.log(canvasRef.current);

    //   const ctx = canvasRef.current.getContext("2d");

      if (!ctx || !img) return;

      // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      drawImageProp(ctx, img);
      //   ctx.drawImage(img, 100, 100)
      setBackgroundImageLoaded(true);
      setCanvasIsLoaded(true);
      //   window.location.reload()
    };

    // await drawImage();
    console.log(canvasIsLoaded);

    // if (windowRatio < 0.75) {
    img.src = "./images/foreground-wide.jpg";
    // } else {
    //   img.src = "./images/foreground.jpg";
    // }    //
  };
  //
  //   useLayoutEffect (()=> {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //       draw(ctx, canvas);

  //   }, [window.onload]) //

  // check if device is touch device

  //   useEffect(() => {
  //     const isTouchDevice = () => {
  //       try {
  //         document.createEvent("TouchEvent");
  //         setIsTouchDevice(true);
  //         return true;
  //       } catch (e) {
  //         setIsTouchDevice(false);
  //         return false;
  //       }
  //     };

  //     isTouchDevice();
  //   }, []);

  // this handles the resize

  useEffect(
    () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // const handleResize = (e) => {
      //   const handleResize = (e) => {
      //     ctx.canvas.height = window.innerHeight;
      //     ctx.canvas.width = window.innerWidth;
      //   };
      //   canvas.addEventListener("mousemove", (e) => {
      //     getPosition(e);
      //     scratch(ctx, mouseX, mouseY);
      //   });
      //   handleResize();
      draw(ctx, canvas);
    },
    //
    // window.addEventListener("resize", handleResize);

    // return () => window.removeEventListener("resize", handleResize);
    /* } */ []
  );

  // this handles touch devices

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   let touch = {
  //     down: "touchstart",
  //     move: "touchmove",
  //     up: "touchstop",
  //   };

  //   canvas.addEventListener(touch.down, (e) => {
  //     setIsDragged(true);
  //     getPosition(e);
  //     scratch(ctx, mouseX, mouseY);
  //   });

  //   canvas.addEventListener(touch.move, (e) => {
  //     getPosition(e);
  //     scratch(ctx, mouseX, mouseY);
  //   });
  // });

  // this handles the drawing by mouseover

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     canvas.addEventListener("mousemove", (e) => {
  //       getPosition(e);
  //       scratch(ctx, mouseX, mouseY);
  //     });

  //   });

  return (
    <div className="scratchContainer">
      {/* {backgroundImageLoaded && (
        <img
          className="background--img"
          src={
            windowRatio < 0.75
              ? "./images/background-wide.jpg"
              : "./images/background.jpg"
          }
          alt="Painter by the Wall by Edvard Munch"
        />
      )}
      {!backgroundImageLoaded && (
        <img
          className="background--img"
          src={
            windowRatio < 0.75
              ? "./images/foreground-wide.jpg"
              : "./images/foreground.jpg"
          }
          alt="Painter by the Wall by Edvard Munch"
        />
      )} */}
      <canvas
        className="scratch--canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
