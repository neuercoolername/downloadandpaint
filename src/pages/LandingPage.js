import { Stage, Layer, Line, Shape } from "react-konva";
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
    imageRef.current.src = "./images/brushstroke_shape.png"; // Replace with your brush image path
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
    setLines([...lines, { points: [pos.x, pos.y] }]);

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines.length === 1 ? null : lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    console.log(lastLine);

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
                  line.points.forEach((value, index) => {
                    if (index % 2 === 0) {
                      // If the index is even, it's an x coordinate
                      const brushSize = 400;
                      const x = value - brushSize / 2;
                      const y = line.points[index + 1] - brushSize / 2;
                      context.drawImage(brushImage, x, y, brushSize, brushSize);
                    }
                  });

                  context.fillStrokeShape(shape);
                }}
                globalCompositeOperation="destination-out"
              />
            ))}

          {/* {lines.map((line, i) => (
            <Shape
              key={i}
              sceneFunc={(context, shape) => {
                context.beginPath();
                for (let i = 1; i < line.points.length; i += 2) {
                  context.lineTo(line.points[i - 1], line.points[i]);
                }
                // Set the lineCap and lineJoin to "round" for a brushstroke effect
                context.lineJoin = "round";
                context.lineCap = "round";
                context.stroke();
              }}
              stroke="#df4b26"
              strokeWidth={window.innerWidth < 576 ? 100 : 200}
              globalCompositeOperation="destination-out"
            />
          ))} */}

          {/* {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={window.innerWidth < 576 ? 100 : 200}
              tension={0.5}
              lineCap="square"
              lineJoin="bevel"
              globalCompositeOperation="destination-out"
            />
          ))} */}
        </Layer>
      </Stage>
      {/* <StartText /> */}
    </>
  );
};

export default LandingPage;
