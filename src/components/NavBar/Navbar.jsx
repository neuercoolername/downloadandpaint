import NavbarStyles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div>
     <ul className={NavbarStyles.navbar}>
      <li>Home</li>
      <li>About</li>
    </ul> 
    </div>
    
  );
}
