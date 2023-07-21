import scrollIconStyle from "./scrollIcon.module.css";

export default function ScrollIcon() {
  return (
    <div className={`${scrollIconStyle.wrapper}`}>
      <span className={scrollIconStyle.scroll}></span>
      {/* <span className={scrollIconStyle.text}>Scroll to start</span> */}
    </div>
  );
}
