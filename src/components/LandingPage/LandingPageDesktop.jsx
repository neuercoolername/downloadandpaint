import { useCanvasSetup } from "../../hooks/useCanvasSetup";
import Headline from "./Headline";
import StartText from "./StartText";
import LoadingOverlay from "../Common/LoadingOverlay/LoadingOverlay";
import styles from "./LandingPageDesktop.module.css";

const bgSrc = window.innerWidth > 900
  ? "./images/background-wide.webp"
  : "./images/background.webp";

export default function LandingPageDesktop() {
  const { canvasRef, dimensions, isLoaded, handleMouseMove } = useCanvasSetup();

  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${bgSrc})` }}
      />
      <Headline />
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        className={styles.canvas}
      />
      <StartText />
      <LoadingOverlay isLoaded={isLoaded} />
    </div>
  );
}
