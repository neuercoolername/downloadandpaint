import { useState, useEffect, useRef, useCallback } from "react";
import Headline from "../components/LandingPage/Headline";
import StartText from "../components/LandingPage/StartText";
import { interpolatedPoints as startPosition } from "../utilities/drawStartPosition";
import { brushSize } from "../constants/constants";
import { withDelayedVisibility } from "../hoc/withDelayedVisibility/withDelayedVisibility";

// Create a delayed title component
const MobileTitle = () => (
  <div
    style={{
      position: "absolute",
      top: window.innerWidth < 360 ? "15px" : "25px",
      left: window.innerWidth < 360 ? "15px" : "25px",
      color: "white",
      fontWeight: "300",
      fontSize: window.innerWidth < 360 ? "32px" : "36px",
      lineHeight: "1.1",
      fontFamily: "'Inter', sans-serif",
      maxWidth: window.innerWidth < 360 ? "180px" : "220px",
      textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
      zIndex: 10,
      letterSpacing: "2px",
    }}
  >
    Download
    <br />
    and <br /> Paint
  </div>
);

const DelayedMobileTitle = withDelayedVisibility(MobileTitle, 1000);

const LandingPage = () => {
  const canvasRef = useRef(null);
  const brushImageRef = useRef(null);
  const foregroundImageRef = useRef(null);
  const lastPointRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());
  const isReadyRef = useRef(false);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const fgImg = foregroundImageRef.current;
    const brushImg = brushImageRef.current;

    // Draw foreground image as tiled pattern (matches Konva fillPatternImage)
    const pattern = ctx.createPattern(fgImg, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw initial start position strokes with destination-out
    ctx.globalCompositeOperation = "destination-out";
    startPosition.points.forEach((point) => {
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(point.angle || 0);
      ctx.drawImage(
        brushImg,
        -brushSize / 2,
        -brushSize / 2,
        brushSize,
        brushSize
      );
      ctx.restore();
    });
    ctx.globalCompositeOperation = "source-over";

    isReadyRef.current = true;
  }, []);

  // Load brush and foreground images, then initialize canvas
  useEffect(() => {
    let cancelled = false;
    const brushImg = new Image();
    const fgImg = new Image();

    const fgSrc =
      window.innerWidth > 900
        ? "./images/foreground-wide.jpg"
        : "./images/foreground.jpg";

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === 2 && !cancelled) {
        brushImageRef.current = brushImg;
        foregroundImageRef.current = fgImg;
        initCanvas();
      }
    };

    brushImg.addEventListener("load", onLoad);
    fgImg.addEventListener("load", onLoad);
    brushImg.src = "./images/brushstroke_shape.png";
    fgImg.src = fgSrc;

    return () => {
      cancelled = true;
      brushImg.removeEventListener("load", onLoad);
      fgImg.removeEventListener("load", onLoad);
    };
  }, [initCanvas]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      // Re-initialize canvas after resize (canvas clears when dimensions change)
      if (foregroundImageRef.current && brushImageRef.current) {
        setTimeout(() => initCanvas(), 0);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  // Draw brush stroke directly on canvas — no React state updates
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 16) return;
    lastUpdateTimeRef.current = now;

    if (!isReadyRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prev = lastPointRef.current;
    let angle = 0;

    if (prev) {
      const dx = x - prev.x;
      const dy = y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 3) return;
      angle = Math.atan2(dy, dx);
    }

    lastPointRef.current = { x, y };

    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(
      brushImageRef.current,
      -brushSize / 2,
      -brushSize / 2,
      brushSize,
      brushSize
    );
    ctx.restore();
    ctx.globalCompositeOperation = "source-over";
  }, []);

  // Check if mobile view
  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    // Mobile: Use static image
    return (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <img
          src="./images/mobile-landing-page.png"
          alt="Landing Page"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <DelayedMobileTitle />
        <StartText />
      </div>
    );
  }

  const bgSrc =
    window.innerWidth > 900
      ? "./images/background-wide.jpg"
      : "./images/background.jpg";

  return (
    <div
      className="cursor-none"
      style={{
        cursor: "none",
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgSrc})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: "auto",
          zIndex: 0,
        }}
      />

      {/* Headline text (revealed as foreground is erased) */}
      <Headline />

      {/* Foreground canvas (erased by brush strokes to reveal background + headline) */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      />

      <StartText />
    </div>
  );
};

export default LandingPage;
