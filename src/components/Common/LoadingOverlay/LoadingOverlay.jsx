import styles from "./LoadingOverlay.module.css";

const LoadingOverlay = ({ isLoaded }) => (
  <div className={`${styles.overlay} ${isLoaded ? styles.hidden : ""}`}>
    <div className={styles.content}>
      <img src="./images/icon/navIcon.png" alt="" className={styles.spinner} />
      <span className={styles.label}>Loading...</span>
    </div>
  </div>
);

export default LoadingOverlay;
