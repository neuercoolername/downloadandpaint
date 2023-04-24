import React from "react";
import { Rect } from "react-konva";
import fontSizeLineHeight from "../utilities/calcFontSizeLineHeight";

export default class Starttext extends React.Component {
  state = {
    text: "Start",
    canvas: null,
    fontSizeHeading: null,
    lineHightHeading: null,
    textPositionX: null,
    textPositionY: null,
  };

  calcFontSize() {
    const textPosition = {
      576: { x: 60, y: 70 },
      768: { x: 100, y: 100 },
      1000: { x: 140, y: 150 },
      1400: {
        x: window.innerWidth / 2,
        y: this.state.lineHightHeading
          ? this.state.lineHightHeading * 2 + this.state.lineHightHeading
          : 1000,
      },
      Infinity: {
        x: window.innerWidth / 2,
        y: this.state.lineHightHeading
          ? this.state.lineHightHeading * 2 + this.state.lineHightHeading
          : 1000,
      },
    };

    const { innerWidth } = window;
    const { fontSize, lineHeight } =
      fontSizeLineHeight[
        Object.keys(fontSizeLineHeight).find((key) => innerWidth <= Number(key))
      ];
    this.setState({ fontSizeHeading: fontSize, lineHightHeading: lineHeight });

    const { x, y } =
      textPosition[
        Object.keys(textPosition).find((key) => innerWidth <= Number(key))
      ];
    this.setState({ textPositionX: x, textPositionY: y });

    console.log(this.state.textPositionX);

    const image = new window.Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      ctx.save();
      ctx.beginPath();

      // put text on canvas
      ctx.font = `normal 1000 ${this.state.fontSizeHeading}px Arial`;

      ctx.fillText(
        this.state.text,
        this.state.textPositionX,
        this.state.textPositionY
      );

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
    image.src =
      window.innerWidth > 900
        ? "./images/foreground-wide.jpg"
        : "./images/foreground.jpg";
  }

  componentDidMount() {
    this.calcFontSize();

    const resizeHandler = () => {
      this.calcFontSize();
    };

    window.addEventListener("resize", resizeHandler);
    this.resizeHandler = resizeHandler;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
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
