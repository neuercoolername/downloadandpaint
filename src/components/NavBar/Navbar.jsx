import NavbarStyles from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom';

export default function Navbar({ isLandingPage = true, currentSectionIndex = 0 }) {
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    window.dispatchEvent(new CustomEvent('navbarHover', { 
      detail: { isHovering: true } 
    }));
  };

  const handleMouseLeave = () => {
    window.dispatchEvent(new CustomEvent('navbarHover', { 
      detail: { isHovering: false } 
    }));
  };

  const handleHomeClick = () => {
    // Use FullPage.js API to navigate to first section (landing page)
    if (window.fullpage_api) {
      window.fullpage_api.moveTo(1); // FullPage.js uses 1-based indexing
    }
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const navbarColor = isLandingPage ? 'white' : '#333';

  return (
    <div>
     <ul 
       className={NavbarStyles.navbar}
       style={{ color: navbarColor }}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
     >
      <li onClick={handleHomeClick}>Home</li>
      <li onClick={handleAboutClick}>About</li>
    </ul> 
    </div>
    
  );
}
