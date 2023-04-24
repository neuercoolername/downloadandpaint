import { Stage, Layer, Line } from "react-konva";
import React, { useState } from "react";
import ForeGroundImage from "../components/ForeGroundImage";
import BackGroundImage from "../components/BackGroundImage";
import Headline from "../components/Headline";
import Starttext from "../components/StartText";
import startPosition from "../utilities/drawStartPosition";

const LandingPage = () => {
  const [lines, setLines] = useState([startPosition]);
  const isDrawing = React.useRef(false);


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
    let lastLine = lines.length === 1 ? null : lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleTouchStart = (e) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines([...lines, { points: [point.x, point.y] }]);
  };

  const handleTouchMove = (e) => {
    if (isDrawing.current) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines([...lines]);
    }
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
    setLines([...lines, { points: [] }]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMousemove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
        {/* <Starttext /> */}
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
            strokeWidth={window.innerWidth < 576 ? 100 : 200}
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

export default LandingPage;
