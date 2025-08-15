import NavbarStyles from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Navbar({ isLandingPage = true, currentSectionIndex = 0 }) {
  const navigate = useNavigate();
  const [isChaptersDropdownOpen, setIsChaptersDropdownOpen] = useState(false);
  const chaptersRef = useRef(null);

  // Chapter mapping with section ranges
  const chapters = [
    { id: 1, title: "Painter by the Wall", startSection: 3, endSection: 5 },
    { id: 2, title: "Walls and Windows", startSection: 6, endSection: 9 },
    { id: 3, title: "Bird droppings", startSection: 10, endSection: 16 },
    { id: 4, title: "Download and Paint Like A Master", startSection: 17, endSection: 21 },
    { id: 5, title: "Hidden treasures of creativity", startSection: 22, endSection: 26 },
    { id: 6, title: "Center and Periphery", startSection: 27, endSection: 33 }
  ];

  // Click away to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chaptersRef.current && !chaptersRef.current.contains(event.target)) {
        setIsChaptersDropdownOpen(false);
      }
    };

    if (isChaptersDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChaptersDropdownOpen]);

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

  const handleChaptersClick = () => {
    setIsChaptersDropdownOpen(!isChaptersDropdownOpen);
  };

  const handleChapterSelect = (chapter) => {
    // Navigate to the first section of the selected chapter
    if (window.fullpage_api) {
      window.fullpage_api.moveTo(chapter.startSection);
    }
    setIsChaptersDropdownOpen(false);
  };

  // Determine which chapter is currently active
  const getCurrentChapter = () => {
    // Convert currentSectionIndex to FullPage section number (add 1 for 1-based indexing)
    const fullPageSectionIndex = currentSectionIndex + 1;
    return chapters.find(chapter => 
      fullPageSectionIndex >= chapter.startSection && 
      fullPageSectionIndex <= chapter.endSection
    );
  };

  const activeChapter = getCurrentChapter();

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
      <li className={NavbarStyles.chaptersContainer} ref={chaptersRef} onClick={handleChaptersClick}>
        <span>Chapters</span>
        {isChaptersDropdownOpen && (
          <ul className={NavbarStyles.chaptersDropdown}>
            {chapters.map(chapter => (
              <li 
                key={chapter.id}
                onClick={() => handleChapterSelect(chapter)}
                className={activeChapter?.id === chapter.id ? NavbarStyles.activeChapter : ''}
              >
                {chapter.title}
              </li>
            ))}
          </ul>
        )}
      </li>
      <li onClick={handleAboutClick}>About</li>
    </ul> 
    </div>
    
  );
}
