import scrollIconStyle from "./scrollIcon.module.css";

export default function ScrollIcon() {
  const isMobile = window.innerWidth <= 767;
  
  return (
    <div className={`${scrollIconStyle.wrapper}`}>
      <span className={`${scrollIconStyle.text} ${scrollIconStyle.pulse} ${isMobile ? scrollIconStyle.mobile : ''}`}>
        {isMobile ? "Swipe to start" : "Scroll to start"}
      </span>
    </div>
  );
}
