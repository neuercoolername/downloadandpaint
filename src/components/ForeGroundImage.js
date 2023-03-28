import React, { Component, useState } from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import { calcX, calcY } from "../utilities/calcCanvasImageSizes";


export default class ForeGroundImage extends React.Component {
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
    // getPosition = (e) => {
    //   this.mouseX = !this.isTouchDevice ? e.pageX : e.touches[0].pageX;
    //   this.mouseY = !this.isTouchDevice ? e.pageY : e.touches[0].pageY;
    // };
  
    // scratch = () => {
    //   // ctx.beginPath();
    // }
  
    // handleMove = (e) => {
    //   this.getPosition(e.evt);
    // };
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
        //   crop={{
        //   x: calcX(),
        //   y: calcY(),
        //   width: window.innerWidth,
        //   height: window.innerHeight,
        // }}
          // globalCompositeOperation='destination-out'
        />
      );
    }
  }