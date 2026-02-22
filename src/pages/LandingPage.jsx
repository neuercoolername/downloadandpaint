import { MOBILE_BREAKPOINT } from "../constants/constants";
import LandingPageDesktop from "../components/LandingPage/LandingPageDesktop";
import LandingPageMobile from "../components/LandingPage/LandingPageMobile";

const LandingPage = () => {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  return isMobile ? <LandingPageMobile /> : <LandingPageDesktop />;
};

export default LandingPage;
