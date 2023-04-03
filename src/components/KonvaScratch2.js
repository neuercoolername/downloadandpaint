import { Stage, Layer, Line,  } from "react-konva";
import React, { useState } from "react";
import ForeGroundImage from "./ForeGroundImage";
import BackGroundImage from "./BackGroundImage";
import Text2 from "./Headline";

export const KonvaScratch = () => {
  const [lines, setLines] = useState([]);
  const isDrawing = React.useRef(true);


// eslint-disable-next-line
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

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
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  
  const handleTouchMove = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMousemove={handleMouseMove}
      onTouchMove={handleTouchMove}

    >
      <Layer className="konvaBackground">
        <BackGroundImage
          src={
            window.innerWidth > 900
              ? "./images/background-wide.jpg"
              : "./images/background.jpg"
          }
        />

        <Text2 />
      </Layer>

      <Layer>
        <ForeGroundImage
          src={
            window.innerWidth > 900
              ? "./images/foreground-wide.jpg"
              : "./images/foreground.jpg"
          }
        />

        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={window.innerWidth < 576 ? 100 : 200 }
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation="destination-out"
          />
        ))}
      </Layer>
    </Stage>
  );
};
