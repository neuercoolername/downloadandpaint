import React from "react";
import { Rect } from "react-konva";

export default class Text2 extends React.Component {
  state = {
    text: "Download and Paint",
    canvas: null,
    textsplit: ["Download", "and", "Paint"],
    fontSizeHeading: null,
    lineHightHeading: null,
  };

  // sudo-media-queries for the text

  componentDidMount() {
    if (window.innerWidth < 576) {
      this.setState({
        fontSizeHeading: 50,
        lineHightHeading: 50,
      });
    }
    if (window.innerWidth > 576) {
      this.setState({
        fontSizeHeading: 100,
        lineHightHeading: 100,
      });
    }
    if (window.innerWidth > 768) {
      this.setState({
        fontSizeHeading: 160,
        lineHightHeading: 150,
      });
    }
    if (window.innerWidth > 1000) {
      this.setState({
        fontSizeHeading: 200,
        lineHightHeading: 180,
      });
    }
    if (window.innerWidth > 1400) {
      this.setState({
        fontSizeHeading: 300,
        lineHightHeading: 300,
      });
    }

    var image = new window.Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      ctx.save();
      ctx.beginPath();

      // put text on canvas
      ctx.font = `normal 600 ${this.state.fontSizeHeading}px Arial`;
      this.state.textsplit.forEach((element, i) => {
        ctx.fillText(
          element,
          0,
          this.state.lineHightHeading * i + this.state.lineHightHeading
        );
      });
      ctx.fill();

      // use compositing to draw the background image
      // only where the text has been drawn
      ctx.beginPath();
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(image, 0, 0);
      ctx.restore();

      this.setState({
        canvas: canvas,
      });
    };
    image.src = "./images/foreground-wide.jpg";
  }

  render = () => {
    return (
      <Rect
        width={window.innerWidth}
        height={window.innerHeight}
        fillPatternImage={this.state.canvas}
      />
    );
  };
}
