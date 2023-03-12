import React, { Component } from 'react';

class CanvasWithImage extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = './images/foreground-wide.jpg';
  }

  render() {
    return (
      <canvas ref="canvas" width={500} height={500} />
    );
  }
}

export default CanvasWithImage;