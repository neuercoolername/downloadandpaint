import useImage from "use-image";
import { Stage, Layer, Image, Line } from "react-konva";
import React, { Component, useState } from "react";

// const BackgroundImage = () => {
//     const [image] = useImage('./images/background.jpg');
//     return <Image image={image} />;
//   };

class ForeGroundImage extends React.Component {
  state = {
    image: null,
    mouseX: 0,
    mouseY: 0,
    isTouchDevice: false,
  };
  componentDidMount() {
    this.loadImage();
    // window.addEventListener('onMousemove', this.handleVisible);
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleMove);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  getPosition = (e) => {
    this.mouseX = !this.isTouchDevice ? e.pageX : e.touches[0].pageX;
    this.mouseY = !this.isTouchDevice ? e.pageY : e.touches[0].pageY;
  };

  scratch = () => {
    // ctx.beginPath();
  }

  handleMove = (e) => {
    this.getPosition(e.evt);
  };
  render() {
    return (
      <Image
        x={0}
        y={0}
        image={this.state.image}
        width={window.innerWidth}
        height={window.innerHeight}
        ref={(node) => {
          this.imageNode = node;
        }}
        onMousemove={this.handleMove}
        // globalCompositeOperation='destination-out'
      />
    );
  }
}

class BackGroundImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={0}
        y={0}
        image={this.state.image}
        width={window.innerWidth}
        height={window.innerHeight}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

export const KonvaScratch = () => {
    const [tool, setTool] = React.useState('eraser');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(true);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <Stage width={window.innerWidth} height={window.innerHeight}         onMouseDown={handleMouseDown}
    onMousemove={handleMouseMove}
    onMouseup={handleMouseUp}>
    <Layer>
    <BackGroundImage src="./images/background.jpg" />

    </Layer>

      <Layer>
        <ForeGroundImage src="./images/foreground.jpg" />
        {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={50}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation=
                'destination-out'
              
            />
          ))}
            
      </Layer>
    </Stage>
  );
};
