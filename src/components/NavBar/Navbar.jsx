import NavbarStyles from "./Navbar.module.css";

export default function Navbar() {
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

  return (
    <div>
     <ul 
       className={NavbarStyles.navbar}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
     >
      <li>Home</li>
      <li>About</li>
    </ul> 
    </div>
    
  );
}
