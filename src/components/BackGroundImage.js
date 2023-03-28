import React, { Component, useState } from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import { calcX, calcY } from "../utilities/calcCanvasImageSizes";

console.log(window.innerWidth);

export default class BackGroundImage extends React.Component {
  state = {
    image: null,
  };

  // resize = () => this.forceUpdate()

  componentDidMount() {
    this.loadImage();
    // window.addEventListener('resize', this.resize);
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
    // window.removeEventListener('resize', this.resize)
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
        // crop={{
        //   x: calcX(),
        //   y: calcY(),
        //   width: window.innerWidth,
        //   height: window.innerHeight,
        // }}
      />
    );
  }
}
