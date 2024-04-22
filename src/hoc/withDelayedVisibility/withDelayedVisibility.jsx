import { useDelayedVisibility } from "../../hooks/useDelayedVisibility";
import withDelayedVisibilityStyle from "./withDelayedVisibilityStyle.module.css";

export function withDelayedVisibility(WrappedComponent, delay) {
  return function (props) {
    const isVisible = useDelayedVisibility(delay);

    return (
      <div style={{ position: "static", zIndex: 9001 }}>
        <div
          className={`${withDelayedVisibilityStyle.fadeIn} ${
            isVisible ? withDelayedVisibilityStyle.visible : ""
          }`}
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
}
