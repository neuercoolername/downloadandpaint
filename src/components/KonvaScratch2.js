import useImage from "use-image";
import { Stage, Layer, Image, Line, Shape } from "react-konva";
import React, { Component, useState } from "react";
import ForeGroundImage from "./ForeGroundImage";
import BackGroundImage from "./BackGroundImage";
import Scratch from "./Scratch";

export const KonvaScratch = () => {
  const [tool, setTool] = React.useState("eraser");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(true);

  console.log(lines)


  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;

  // const handleMouseMove = (e) => {
  //   // isDrawing.current = true;
  //   const pos = e.target.getStage().getPointerPosition();
  //   setLines([...lines, { tool, points: [pos.x, pos.y] }]);

  //   console.log(lines[0].points);

  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   let lastLine = lines[lines.length - 1];
  //   // add point
  //   lastLine.points = lastLine.points.concat([point.x, point.y]);

  //   // replace last
  //   lines.splice(lines.length - 1, 1, lastLine);
  //   setLines(lines.concat());
  // };

  const handleMouseMove = (e) => {

    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);

    // console.log(lines[0].points);

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);


    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };




  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
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
      </Layer>

      <Layer>
        <ForeGroundImage
          src={
            window.innerWidth > 900
              ? "./images/foreground-wide.jpg"
              : "./images/foreground.jpg"
          }
        />
        {/* {lines.map((line, i) => (
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(line.points[0], line.points[1]);
              context.lineTo(line.points[0] +20, line.points[1] +80);
              // context.quadraticCurveTo(150, 100, 260, 170);
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            points={line.points}

            fill="#00D2FF"
            stroke="black"
            strokeWidth={4}
            globalCompositeOperation="destination-out"

          />
        ))} */}
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={50}
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

{
  /* <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={50}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation="destination-out"
          /> */
}
