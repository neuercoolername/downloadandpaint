import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Rect } from "react-konva";
import { calcX, calcY } from "../utilities/calcCanvasImageSizes";

export default class Text2 extends React.Component {
  state = {
    text: "Download and Paint",
    canvas: null,
    textsplit: ["Download", "and", "Paint"],
  };

  componentDidMount() {
    var image = new window.Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      ctx.save();
      ctx.beginPath();

      // put text on canvas
      ctx.font = "normal 600 300px Arial";
        // ctx.fillText(this.state.text, 0, 500);
      this.state.textsplit.forEach((element, i) => {
        ctx.fillText(element, 0, 300 * i + 300);
      });
      ctx.fill();

      // use compositing to draw the background image
      // only where the text has been drawn
      ctx.beginPath();
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(image, 0, 0 );
      ctx.restore();

      this.setState({
        canvas: canvas,
      });
    };
    image.src = "./images/foreground-wide.jpg";
  }

  render = () => {
    return (
      // <Image
      // className='konvaImage'
      //   image={this.state.canvas}
      //   x={0}
      //             y={0}
      //             width={window.innerWidth}
      //             height={window.innerHeight}

      //     crop={{
      //             x: 0,
      //             y: 0,
      //             width: 1300,
      //             height: window.innerHeight,
      //           }}
      // />
      <Rect
      width={window.innerWidth}
      height={window.innerHeight}
      fillPatternImage={this.state.canvas}
    />
    );
  };
}
