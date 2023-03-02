import React, { useRef, useEffect, useState } from "react";

export default function Scratch() {
  const [deviceType, setDeviceType] = useState(null);
  // const [canvasLoaded,setCanvasLoaded] = useState(false)
  const canvasRef = useRef(null);

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

  // mouse handling

  // get position of mouse/touch

  const getPosition = (e) => {
    mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  };

  // draw image

  const draw = (ctx) => {
    const img = new Image(); // Create new img element
    img.src = "./images/foreground.jpg"; // Set source path

    console.log(ctx);

    window.onload = function () {
      ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

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
    //Our draw come here
    draw(context);
    isTouchDevice();
  }, []);

  return (
    <div className="scratchContainer">
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
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
