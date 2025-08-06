import { Stage, Layer, Shape } from "react-konva";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ForeGroundImage from "../components/LandingPage/ForeGroundImage";
import BackGroundImage from "../components/LandingPage/BackGroundImage";
import Headline from "../components/LandingPage/Headline";
import StartText from "../components/LandingPage/StartText";
import { interpolatedPoints as startPosition } from "../utilities/drawStartPosition";
import BrushMouseIcon from "../components/Common/BrushMouseIcon/BrushMouseIcon";
import LandingPageStyle from "./LandingPageStyle.module.css";
import { brushSize } from "../constants/constants";

const LandingPage = () => {
  const [lines, setLines] = useState([startPosition]);
  const lastUpdateTime = useRef(Date.now());
  const [brushImage, setBrushImage] = useState(null);
  const imageRef = useRef();

  // eslint-disable-next-line
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    imageRef.current = new window.Image();
    imageRef.current.src = "./images/brushstroke_shape.png";

    const handleLoad = () => {
      setBrushImage(imageRef.current);
    };

    const handleError = (error) => {
      console.error("Error loading image:", error);
    };

    imageRef.current.addEventListener("load", handleLoad);
    imageRef.current.addEventListener("error", handleError);

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
        imageRef.current.removeEventListener("error", handleError);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoize rendered shapes to prevent unnecessary re-renders
  const renderedShapes = useMemo(() => {
    return lines.map((line, i) => (
      <Shape
        key={i}
        sceneFunc={(context, shape) => {
          context.globalCompositeOperation = "destination-out";
          
          line.points.forEach((point) => {
            const x = point.x - brushSize / 2;
            const y = point.y - brushSize / 2;

            context.save();
            context.translate(x + brushSize / 2, y + brushSize / 2);
            context.rotate(point.angle || 0);
            context.drawImage(
              brushImage,
              -brushSize / 2,
              -brushSize / 2,
              brushSize,
              brushSize
            );
            context.restore();
          });

          context.fillStrokeShape(shape);
        }}
      />
    ));
  }, [lines, brushImage, brushSize]);


  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 16) return; // Throttle to ~60fps
    lastUpdateTime.current = now;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    setLines((lines) => {
      const linesCopy = [...lines];
      let lastLine = linesCopy[linesCopy.length - 1];

      if (lastLine) {
        const lastPoint = lastLine.points[lastLine.points.length - 1];
        const dx = point.x - lastPoint.x;
        const dy = point.y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 3) return linesCopy;
        
        const angle = Math.atan2(dy, dx);

        lastLine = {
          ...lastLine,
          points: [...lastLine.points, { ...point, angle }],
        };
        linesCopy[linesCopy.length - 1] = lastLine;
      } else {
        lastLine = { points: [{ ...point, angle: 0 }] };
        linesCopy.push(lastLine);
      }

      return linesCopy;
    });
  }, []);

  return (
    <div className={LandingPageStyle.noCursor}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMousemove={handleMouseMove}
      >
        <Layer className="konvaBackground">
          <BrushMouseIcon />
          <BackGroundImage
            src={
              window.innerWidth > 900
                ? "./images/background-wide.jpg"
                : "./images/background.jpg"
            }
          />
          <Headline />
        </Layer>

        <Layer>
          <ForeGroundImage
            src={
              window.innerWidth > 900
                ? "./images/foreground-wide.jpg"
                : "./images/foreground.jpg"
            }
          />

          {brushImage && renderedShapes}
        </Layer>
      </Stage>
      <StartText />
    </div>
  );
};

export default LandingPage;
