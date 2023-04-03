import React from "react";
import { Rect } from "react-konva";

// sudo-media-queries for the text

const fontSizeLineHeight = {
  576: { fontSize: 60, lineHeight: 50 },
  768: { fontSize: 100, lineHeight: 100 },
  1000: { fontSize: 160, lineHeight: 150 },
  1400: { fontSize: 200, lineHeight: 180 },
  Infinity: { fontSize: 300, lineHeight: 300 },
};

export default class Text2 extends React.Component {
  state = {
    text: "Download and Paint",
    canvas: null,
    textsplit: ["Download", "and", "Paint"],
    fontSizeHeading: null,
    lineHightHeading: null,
  };

  calcFontSize() {
    const { innerWidth } = window;
    const { fontSize, lineHeight } =
      fontSizeLineHeight[
        Object.keys(fontSizeLineHeight).find((key) => innerWidth <= Number(key))
      ];
    this.setState({ fontSizeHeading: fontSize, lineHightHeading: lineHeight });

    const image = new window.Image();
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
          window.innerWidth < 576
            ? Math.max(
                window.innerWidth < 360
                  ? 20
                  : Math.min(window.innerWidth / 6, 100),
                0
              )
            : 0,
          window.innerWidth < 576
            ? 20 +
                (this.state.lineHightHeading * i +
                  this.state.lineHightHeading +
                  window.innerHeight / 3.5)
            : this.state.lineHightHeading * i + this.state.lineHightHeading
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
