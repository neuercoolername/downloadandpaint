import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>

    </>
  );
}

export default App;
