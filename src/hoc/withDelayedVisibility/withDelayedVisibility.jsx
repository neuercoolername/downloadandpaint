import { useDelayedVisibility } from "../../hooks/useDelayedVisibility";
import withDelayedVisibilityStyle from "./withDelayedVisibilityStyle.module.css";

export function withDelayedVisibility(WrappedComponent, delay) {
  return function (props) {
    const isVisible = useDelayedVisibility(delay);

    return (
      <div style={{ position: "fixed", zIndex: 9001, top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <div
          className={`${withDelayedVisibilityStyle.fadeIn} ${
            isVisible ? withDelayedVisibilityStyle.visible : ""
          }`}
          style={{ pointerEvents: "auto" }}
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
}
