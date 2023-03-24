import useImage from "use-image";
import { Stage, Layer, Image } from "react-konva";
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
    console.log(e.pageX);
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
        fill={'red'}
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
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <BackGroundImage src="./images/background.jpg" />
        <ForeGroundImage src="./images/foreground.jpg" />
      </Layer>
    </Stage>
  );
};
