import { useState, useEffect, useCallback } from "react";
import fontSizeLineHeight from "../../utilities/calcFontSizeLineHeight";

function computeStyles() {
  const { innerWidth, innerHeight } = window;
  const entry =
    fontSizeLineHeight[
      Object.keys(fontSizeLineHeight).find((key) => innerWidth <= Number(key))
    ];
  const imageSrc =
    innerWidth > 900
      ? "./images/foreground-wide.jpg"
      : "./images/foreground.jpg";

  // Replicate x-offset from the old canvas fillText positioning
  const xOffset =
    innerWidth < 576
      ? Math.max(innerWidth < 360 ? 10 : Math.min(innerWidth / 12, 100), 0)
      : 0;

  // Replicate y-offset from the old canvas fillText positioning
  // Old code: y = lineHeight * i + lineHeight (desktop)
  // Old code: y = 20 + (lineHeight * i + lineHeight + innerHeight / 3.5) (mobile-ish < 576)
  // Canvas fillText uses baseline; approximate top offset by subtracting ~fontSize
  const yOffset =
    innerWidth < 576
      ? 20 + entry.lineHeight + innerHeight / 3.5 - entry.fontSize
      : entry.lineHeight - entry.fontSize;

  return {
    fontSize: entry.fontSize,
    lineHeight: entry.lineHeight,
    imageSrc,
    xOffset,
    yOffset,
  };
}

export default function Headline() {
  const [styles, setStyles] = useState(computeStyles);

  const handleResize = useCallback(() => {
    setStyles(computeStyles());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const words = ["Download", "and", "Paint"];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        paddingLeft: `${styles.xOffset}px`,
        paddingTop: `${styles.yOffset}px`,
      }}
    >
      {words.map((word) => (
        <div
          key={word}
          style={{
            fontSize: `${styles.fontSize}px`,
            lineHeight: `${styles.lineHeight}px`,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            backgroundImage: `url(${styles.imageSrc})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "top left",
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
