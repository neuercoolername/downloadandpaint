import React, { Component, useState } from "react";
import { Stage, Layer, Image, Line, Rect } from "react-konva";
import { calcX, calcY } from "../utilities/calcCanvasImageSizes";


export default class BackGroundImage extends React.Component {
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
      <Rect
        width={window.innerWidth}
        height={window.innerHeight}
        shadowBlur={20}
        cornerRadius={10}
        fillPatternImage={this.state.image}
        // fillPatternScale={{x:1,y:1}}
        // fillPatternOffset={window.innerWidth > 900 ? {x:(window.innerWidth / 3),y:200} : {x:(window.innerWidth / 1.5),y:200}}
        // fillPatternRepeat={'repeat-x'}
      />
    );
  }
}
