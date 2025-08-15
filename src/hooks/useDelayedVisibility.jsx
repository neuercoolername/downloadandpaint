import { useState, useEffect } from "react";

export function useDelayedVisibility(delay = 6000, skipAnimation = false) {
  const [isVisible, setIsVisible] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, skipAnimation]);

  return isVisible;
}
