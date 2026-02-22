import { useState } from "react";
import DelayedMobileTitle from "./MobileTitle";
import StartText from "./StartText";
import LoadingOverlay from "../Common/LoadingOverlay/LoadingOverlay";
import styles from "./LandingPageMobile.module.css";

export default function LandingPageMobile() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.container}>
      <img
        src="./images/mobile-landing-page.webp"
        alt="Landing Page"
        onLoad={() => setIsLoaded(true)}
        className={styles.image}
      />
      <DelayedMobileTitle />
      <StartText />
      <LoadingOverlay isLoaded={isLoaded} />
    </div>
  );
}
