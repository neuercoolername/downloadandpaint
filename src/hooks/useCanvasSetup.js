import { useState, useEffect, useRef, useCallback } from "react";
import { interpolatedPoints as startPosition } from "../utilities/drawStartPosition";
import { brushSize } from "../constants/constants";

export function useCanvasSetup() {
  const canvasRef = useRef(null);
  const brushImageRef = useRef(null);
  const foregroundImageRef = useRef(null);
  const lastPointRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());
  const isReadyRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

    const pattern = ctx.createPattern(fgImg, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "destination-out";
    startPosition.points.forEach((point) => {
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(point.angle || 0);
      ctx.drawImage(brushImg, -brushSize / 2, -brushSize / 2, brushSize, brushSize);
      ctx.restore();
    });
    ctx.globalCompositeOperation = "source-over";

    isReadyRef.current = true;
  }, []);

  // Load brush, foreground, and background images, then initialize canvas
  useEffect(() => {
    let cancelled = false;
    const brushImg = new Image();
    const fgImg = new Image();
    const bgImg = new Image();

    const isDesktop = window.innerWidth > 767;
    const fgSrc = window.innerWidth > 900
      ? "./images/foreground-wide.webp"
      : "./images/foreground.webp";
    const bgSrc = window.innerWidth > 900
      ? "./images/background-wide.webp"
      : "./images/background.webp";

    const threshold = isDesktop ? 3 : 2;
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === threshold && !cancelled) {
        brushImageRef.current = brushImg;
        foregroundImageRef.current = fgImg;
        initCanvas();
        setIsLoaded(true);
      }
    };

    brushImg.addEventListener("load", onLoad);
    fgImg.addEventListener("load", onLoad);
    brushImg.addEventListener("error", onLoad);
    fgImg.addEventListener("error", onLoad);
    brushImg.src = "./images/brushstroke_shape.png";
    fgImg.src = fgSrc;

    if (isDesktop) {
      bgImg.addEventListener("load", onLoad);
      bgImg.addEventListener("error", onLoad);
      bgImg.src = bgSrc;
    }

    return () => {
      cancelled = true;
      brushImg.removeEventListener("load", onLoad);
      fgImg.removeEventListener("load", onLoad);
      bgImg.removeEventListener("load", onLoad);
      brushImg.removeEventListener("error", onLoad);
      fgImg.removeEventListener("error", onLoad);
      bgImg.removeEventListener("error", onLoad);
    };
  }, [initCanvas]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
      if (foregroundImageRef.current && brushImageRef.current) {
        setTimeout(() => initCanvas(), 0);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  // Throttled brush painting
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
    ctx.drawImage(brushImageRef.current, -brushSize / 2, -brushSize / 2, brushSize, brushSize);
    ctx.restore();
    ctx.globalCompositeOperation = "source-over";
  }, []);

  return { canvasRef, dimensions, isLoaded, handleMouseMove };
}
