import { withDelayedVisibility } from "../../hoc/withDelayedVisibility/withDelayedVisibility";
import styles from "./MobileTitle.module.css";

const MobileTitle = () => (
  <div className={styles.title}>
    Download
    <br />
    and <br /> Paint
  </div>
);

export default withDelayedVisibility(MobileTitle, 1000);
