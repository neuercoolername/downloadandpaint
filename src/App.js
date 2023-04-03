import './App.css';
import LandingPage from './pages/LandingPage';
import { useEffect } from 'react';

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
    <LandingPage/>
  );
}

export default App;
