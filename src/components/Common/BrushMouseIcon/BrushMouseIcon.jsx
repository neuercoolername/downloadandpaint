import { useState, useEffect } from "react";
import useMousePosition from "../../../hooks/useMousePosition";
import BrushMouseIconStyle from "./BrushMouseIconStyle.module.css";
import { brushSize } from "../../../constants/constants";

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const BrushMouseIcon = () => {
  const { x, y } = useMousePosition();
  const [angle, setAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x, y });

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

  return (
    <img
      className={BrushMouseIconStyle.brushMouseIcon}
      alt={"a brush icon"}
      width={brushSize}
      height={brushSize}
      style={{
        left: `${x - brushSize / 2}px`,
        top: `${y - brushSize / 2}px`,
        transform: `rotate(${angle}rad)`,
      }}
      src="./images/brushstroke_mouse_icon.png"
    ></img>
  );
};

export default BrushMouseIcon;
