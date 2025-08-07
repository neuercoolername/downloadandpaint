import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import FullPageWrapper from "./components/FullPageWrapper/FullPageWrapper";
import Navbar from "./components/NavBar/Navbar";
import BrushMouseIcon from "./components/Common/BrushMouseIcon/BrushMouseIcon";
import { withDelayedVisibility } from "./hoc/withDelayedVisibility/withDelayedVisibility";

const DelayedNavBar = withDelayedVisibility(Navbar);

function App() {
  const [isOnLandingSection, setIsOnLandingSection] = useState(true);
  const [isHoveringNavbar, setIsHoveringNavbar] = useState(false);
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        window.screen.orientation.lock("portrait-primary");
      }
    };
    
    const handleSectionChange = (event) => {
      setIsOnLandingSection(event.detail.sectionIndex === 0);
    };
    
    const handleNavbarHover = (event) => {
      setIsHoveringNavbar(event.detail.isHovering);
    };
    
    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("sectionChange", handleSectionChange);
    window.addEventListener("navbarHover", handleNavbarHover);
    
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("sectionChange", handleSectionChange);
      window.removeEventListener("navbarHover", handleNavbarHover);
    };
  }, []);

  return (
    <>
      <DelayedNavBar />
      <BrushMouseIcon isLandingPage={isOnLandingSection && !isHoveringNavbar} />
      <Routes>
        <Route path="/" element={<FullPageWrapper />} />
      </Routes>
    </>
  );
}

export default App;
