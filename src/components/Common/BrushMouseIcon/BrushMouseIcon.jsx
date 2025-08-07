import { useState, useEffect } from "react";
import useMousePosition from "../../../hooks/useMousePosition";
import BrushMouseIconStyle from "./BrushMouseIconStyle.module.css";
import { brushSize } from "../../../constants/constants";

const smallBrushSize = 60;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const BrushMouseIcon = ({ isLandingPage = false }) => {
  const { x, y } = useMousePosition();
  const [angle, setAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x, y });
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevIsLandingPage, setPrevIsLandingPage] = useState(isLandingPage);

  useEffect(() => {
    const dx = x - lastPosition.x;
    const dy = y - lastPosition.y;
    const newAngle = Math.atan2(dy, dx);
    setTargetAngle(newAngle);
    setLastPosition({ x, y });
    // eslint-disable-next-line
  }, [x, y]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setAngle((currentAngle) => lerp(currentAngle, targetAngle, 0.2));
    });
    return () => cancelAnimationFrame(id);
  }, [targetAngle]);

  useEffect(() => {
    if (prevIsLandingPage !== isLandingPage) {
      setIsAnimating(true);
      setPrevIsLandingPage(isLandingPage);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLandingPage, prevIsLandingPage]);

  const currentBrushSize = isLandingPage ? brushSize : smallBrushSize;

  const brushClasses = `${BrushMouseIconStyle.brushMouseIcon} ${!isLandingPage ? BrushMouseIconStyle.smallBrush : ''} ${isAnimating ? BrushMouseIconStyle.brushSizeChanging : ''}`;

  return (
    <img
      className={brushClasses}
      alt={"a brush icon"}
      width={currentBrushSize}
      height={currentBrushSize}
      style={{
        left: `${x - currentBrushSize / 2}px`,
        top: `${y - currentBrushSize / 2}px`,
        '--rotation': `${angle}rad`,
      }}
      src="./images/brushstroke_mouse_icon.png"
    ></img>
  );
};

export default BrushMouseIcon;
