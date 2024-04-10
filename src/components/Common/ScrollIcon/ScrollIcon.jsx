import scrollIconStyle from "./scrollIcon.module.css";
import { useState, useEffect } from "react";

export default function ScrollIcon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${scrollIconStyle.wrapper} ${scrollIconStyle.fadeIn} ${
        isVisible ? scrollIconStyle.visible : ""
      }`}
    >
      <span className={scrollIconStyle.scroll}></span>
      <span className={scrollIconStyle.text}>Scroll to start</span>
    </div>
  );
}
