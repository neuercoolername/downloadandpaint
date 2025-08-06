import scrollIconStyle from "./scrollIcon.module.css";

export default function ScrollIcon() {
  return (
    <div className={`${scrollIconStyle.wrapper}`}>
      <span className={`${scrollIconStyle.text} ${scrollIconStyle.pulse}`}>
        Scroll to start
      </span>
    </div>
  );
}
