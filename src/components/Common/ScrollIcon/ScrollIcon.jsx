import scrollIconStyle from "./scrollIcon.module.css";
import { MOBILE_BREAKPOINT } from "../../constants/constants";

export default function ScrollIcon() {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  
  return (
    <div className={`${scrollIconStyle.wrapper}`}>
      <span className={`${scrollIconStyle.text} ${scrollIconStyle.pulse} ${isMobile ? scrollIconStyle.mobile : ''}`}>
        {isMobile ? "Swipe to start" : "Scroll to start"}
      </span>
    </div>
  );
}
