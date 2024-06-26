import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import FullPageWrapper from "./components/FullPageWrapper/FullPageWrapper";
import Navbar from "./components/NavBar/Navbar";
import BrushMouseIcon from "./components/Common/BrushMouseIcon/BrushMouseIcon";
import { withDelayedVisibility } from "./hoc/withDelayedVisibility/withDelayedVisibility";

const DelayedNavBar = withDelayedVisibility(Navbar);

function App() {
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        window.screen.orientation.lock("portrait-primary");
      }
    };
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <>
      <DelayedNavBar />
      <BrushMouseIcon />
      <Routes>
        <Route path="/" element={<FullPageWrapper />} />
      </Routes>
    </>
  );
}

export default App;
