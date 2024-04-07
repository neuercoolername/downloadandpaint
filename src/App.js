import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import FullPageWrapper from "./components/FullPageWrapper/FullPageWrapper";
import Navbar from "./components/NavBar/Navbar";
import BrushMouseIcon from "./components/Common/BrushMouseIcon/BrushMouseIcon";

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
      <Navbar />
      <BrushMouseIcon />
      <Routes>
        <Route path="/" element={<FullPageWrapper />} />
      </Routes>
    </>
  );
}

export default App;
