import NavbarStyles from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Navbar({ isLandingPage = true, currentSectionIndex = 0 }) {
  const navigate = useNavigate();
  const [isChaptersDropdownOpen, setIsChaptersDropdownOpen] = useState(false);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const chaptersRef = useRef(null);
  const mobileOverlayRef = useRef(null);

  // Chapter mapping with section ranges
  const chapters = [
    { id: 1, title: "Painter by the Wall", startSection: 3, endSection: 5 },
    { id: 2, title: "Walls and Windows", startSection: 6, endSection: 9 },
    { id: 3, title: "Bird droppings", startSection: 10, endSection: 16 },
    { id: 4, title: "Download and Paint Like A Master", startSection: 17, endSection: 21 },
    { id: 5, title: "Hidden treasures of creativity", startSection: 22, endSection: 26 },
    { id: 6, title: "Center and Periphery", startSection: 27, endSection: 33 }
  ];

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Click away to close mobile overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileOverlayRef.current && !mobileOverlayRef.current.contains(event.target)) {
        setIsMobileOverlayOpen(false);
      }
    };

    if (isMobileOverlayOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOverlayOpen]);

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
    setIsMobileOverlayOpen(false); // Close mobile overlay too
  };

  const handleMobileIconClick = () => {
    setIsMobileOverlayOpen(!isMobileOverlayOpen);
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
      {isMobile ? (
        // Mobile Navigation
        <>
          <div 
            className={NavbarStyles.mobileNavbar}
            style={{ color: navbarColor }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src="/images/icon/navIcon.png"
              alt="Menu"
              className={NavbarStyles.mobileIcon} 
              onClick={handleMobileIconClick}
            />
          </div>
          
          {isMobileOverlayOpen && (
            <div className={NavbarStyles.mobileOverlay} ref={mobileOverlayRef}>
              <img 
                src="/images/icon/navIcon.png"
                alt="Close"
                className={NavbarStyles.mobileCloseIcon} 
                onClick={handleMobileIconClick}
              />
              <div className={NavbarStyles.mobileChapterList}>
                <div onClick={handleHomeClick} className={NavbarStyles.mobileNavItem}>
                  Home
                </div>
                {chapters.map(chapter => (
                  <div 
                    key={chapter.id}
                    onClick={() => handleChapterSelect(chapter)}
                    className={`${NavbarStyles.mobileNavItem} ${activeChapter?.id === chapter.id ? NavbarStyles.activeChapter : ''}`}
                  >
                    {chapter.title}
                  </div>
                ))}
                <div onClick={handleAboutClick} className={NavbarStyles.mobileNavItem}>
                  About
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // Desktop Navigation
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
      )}
    </div>
  );
}
