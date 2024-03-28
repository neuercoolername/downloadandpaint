import { Stage, Layer, Shape } from "react-konva";
import React, { useState, useEffect, useRef } from "react";
import ForeGroundImage from "../components/LandingPage/ForeGroundImage";
import BackGroundImage from "../components/LandingPage/BackGroundImage";
import Headline from "../components/LandingPage/Headline";
import StartText from "../components/LandingPage/StartText";
import startPosition from "../utilities/drawStartPosition";

const LandingPage = () => {
  const [lines, setLines] = useState([startPosition]);
  const isDrawing = React.useRef(true);
  const [brushImage, setBrushImage] = useState(null);
  const imageRef = useRef();

  // eslint-disable-next-line
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    imageRef.current = new window.Image();
    imageRef.current.src = "./images/brushstroke_shape.png";
    imageRef.current.addEventListener("load", () => {
      setBrushImage(imageRef.current);
    });
    imageRef.current.addEventListener("error", (error) => {
      console.error("Error loading image:", error);
    });

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", () => {
          setBrushImage(imageRef.current);
        });
        imageRef.current.removeEventListener("error", (error) => {
          console.error("Error loading image:", error);
        });
      }
    };
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleMouseMove = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [{ x: pos.x, y: pos.y }] }]);

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines.length === 1 ? null : lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([{ x: point.x, y: point.y }]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMousemove={handleMouseMove}
      >
        <Layer className="konvaBackground">
          <BackGroundImage
            src={
              window.innerWidth > 900
                ? "./images/background-wide.jpg"
                : "./images/background.jpg"
            }
          />
          <Headline />
        </Layer>

        <Layer>
          <ForeGroundImage
            src={
              window.innerWidth > 900
                ? "./images/foreground-wide.jpg"
                : "./images/foreground.jpg"
            }
          />

          {brushImage &&
            lines.map((line, i) => (
              <Shape
                key={i}
                sceneFunc={(context, shape) => {
                  line.points.forEach((point) => {
                    const brushSize = 400;
                    const x = point.x - brushSize / 2;
                    const y = point.y - brushSize / 2;
                    context.drawImage(brushImage, x, y, brushSize, brushSize);
                  });

                  context.fillStrokeShape(shape);
                }}
                globalCompositeOperation="destination-out"
              />
            ))}
        </Layer>
      </Stage>
      <StartText />
    </>
  );
};

export default LandingPage;
