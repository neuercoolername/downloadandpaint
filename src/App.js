import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import FullPageWrapper from "./FullPageWrapper/FullPageWrapper";

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
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<FullPageWrapper />} />
      </Routes>
    </>
  );
}

export default App;
