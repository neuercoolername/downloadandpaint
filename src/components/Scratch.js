import React, { useRef, useEffect, useState } from "react";
import drawImageProp from "../utilities/drawImageProp";

export default function Scratch() {
  const [deviceType, setDeviceType] = useState(null);
  const canvasRef = useRef(null);

  const windowRatio = window.innerHeight/window.innerWidth


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
    const img = new Image(); // Create new img element
    img.src = "./images/foreground.jpg"; // Set source path

    window.onload = function () {
      drawImageProp(ctx,img)
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");



    console.log(windowRatio)
    //     var heightRatio = 0.5;
    // canvas.height = canvas.width * heightRatio;

    canvas.addEventListener("mousemove", (e) => {
      getPosition(e);
      scratch(mouseX, mouseY);
    });

    const scratch = (x, y) => {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 25, 0, 2 * Math.PI);
      context.fill();
    };

    // const handleResize = e => {
    //   context.canvas.height = window.innerHeight;
    //   context.canvas.width = window.innerWidth;
    // };

    // handleResize();
    // window.addEventListener("resize", handleResize);

    // return () => window.removeEventListener("resize", handleResize)

    //Our draw come here
    draw(context, canvas);
    isTouchDevice();
  }, []);

  return (
    <div className="scratchContainer">
      <canvas
        // width="1000" height="1000"
        className="scratch--canvas"
        width={window.innerWidth }
        height={window.innerHeight }
        ref={canvasRef}
      />

      <img
        className="background--img"
        src="./images/background.png"
        alt="Painter by the Wall by Edvard Munch"
      />
    </div>
  );
}
