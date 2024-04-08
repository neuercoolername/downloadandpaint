import useMousePosition from "../../../hooks/useMousePosition";
import BrushMouseIconStyle from "./BrushMouseIconStyle.module.css";
import { brushSize } from "../../../constants/constants";

const BrushMouseIcon = () => {
  const { x, y } = useMousePosition();

  return (
    <img
      className={BrushMouseIconStyle.brushMouseIcon}
      alt={"a brush icon"}
      width={brushSize}
      height={brushSize}
      style={{ left: `${x - brushSize / 2}px`, top: `${y - brushSize / 2}px` }}
      src="./images/brushstroke_mouse_icon.png"
    ></img>
  );
};

export default BrushMouseIcon;
