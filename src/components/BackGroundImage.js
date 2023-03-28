import React, { Component, useState } from "react";
import { Stage, Layer, Image, Line } from "react-konva";


console.log(window.innerWidth)

// add another media query from 900 on
// 

  const calcX = () => {
    if (window.innerWidth < 600) {
        return 900
     }
     if (window.innerWidth < 900) {
        return 600
     }
     if (window.innerWidth > 900) {
        return 500
     }
  }

  const calcY = () => {
    if (window.innerWidth < 600) {
        return 200
     }
     if (window.innerWidth < 900) {
        return 300
     }
     if (window.innerHeight > 900)
     {
        return 0
     }
  }


// const width = window.innerWidth;
//     const height = window.innerHeight;
//     const aspectRatio = width / height;

//     let newWidth;
//     let newHeight;

//     const imageRatio = 1.6;

//     if (aspectRatio >= imageRatio) {
//       newWidth = window.innerWidth;
//       newHeight = window.innerWidth / aspectRatio;
      
//     } else {
//       newWidth = window.innerHeight * aspectRatio ;
//       newHeight = window.innerHeight 
//     }

//    const x = (window.innerWidth - newWidth) / 2;
//    const y = (window.innerHeight - newHeight) / 2;

    // console.log('aspect-ratio',aspectRatio);
    // console.log('image-ratio', imageRatio)
    // console.log(newWidth)

export default class BackGroundImage extends React.Component {
  state = {
    image: null
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
        // cropX={window.innerWidth / 2}

        ref={(node) => {
          this.imageNode = node;
        }}
        crop={{
          x: calcX(),
          y: calcY(),
          width: window.innerWidth,
          height: window.innerHeight,
        }}
        //   fillPatternImage={this.state.fillPatternImage}
        //   fillPatternScaleX={3}
        // fillPatternScaleY={2}
      />
    );
  }
}
