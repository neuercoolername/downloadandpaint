import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import FullPageWrapper from "./components/FullPageWrapper/FullPageWrapper";
import Navbar from "./components/NavBar/Navbar";
import BrushMouseIcon from "./components/Common/BrushMouseIcon/BrushMouseIcon";
import AboutPage from "./pages/AboutPage";
import { withDelayedVisibility } from "./hoc/withDelayedVisibility/withDelayedVisibility";

const DelayedNavBar = withDelayedVisibility(Navbar, 1000);

function App() {
  const [isOnLandingSection, setIsOnLandingSection] = useState(true);
  const [isHoveringNavbar, setIsHoveringNavbar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hasInitialFadeCompleted, setHasInitialFadeCompleted] = useState(false);
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        window.screen.orientation.lock("portrait-primary");
      }
    };
    
    const handleSectionChange = (event) => {
      const { sectionIndex, direction } = event.detail;
      setIsOnLandingSection(sectionIndex === 0);
      setCurrentSectionIndex(sectionIndex);
      
      // Mark initial fade as completed once user leaves landing section
      if (sectionIndex !== 0 && !hasInitialFadeCompleted) {
        setHasInitialFadeCompleted(true);
      }
      
      if (sectionIndex === 0) {
        // Hide navbar when on landing page
        setShowNavbar(false);
      } else if (direction === 'up') {
        // Show navbar when user scrolls up (in content sections)
        setShowNavbar(true);
      } else if (direction === 'down') {
        // Hide navbar when user scrolls down (in content sections)
        setShowNavbar(false);
      }
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
      {showNavbar && !isOnLandingSection && (
        <Navbar 
          isLandingPage={isOnLandingSection}
          currentSectionIndex={currentSectionIndex}
        />
      )}
      {isOnLandingSection && (
        <DelayedNavBar 
          isLandingPage={isOnLandingSection}
          currentSectionIndex={currentSectionIndex}
          skipAnimation={hasInitialFadeCompleted}
        />
      )}
      <BrushMouseIcon isLandingPage={isOnLandingSection && !isHoveringNavbar} />
      <Routes>
        <Route path="/" element={<FullPageWrapper />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
