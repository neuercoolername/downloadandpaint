import ReactFullpage from "@fullpage/react-fullpage";
import { useState, useEffect, useRef } from "react";
import parse from 'html-react-parser';
import LandingPage from "../../pages/LandingPage";
import ContentSection from "../ContentSection/ContentSection";
import ContentSectionMobile from "../ContentSection/ContentSectionMobile";
import contentArray from "../../contentArray.js";

const isMobileView = window.innerWidth <= 767;

// Build global footnotes mapping
const buildGlobalFootnotes = () => {
  const globalFootnotes = {};
  let footnoteCounter = 1;
  
  contentArray.forEach(section => {
    section.content?.forEach(item => {
      if (item.footnotes && item.footnotes.length > 0) {
        item.footnotes.forEach(footnoteText => {
          globalFootnotes[footnoteCounter] = footnoteText;
          footnoteCounter++;
        });
      }
    });
  });
  
  return globalFootnotes;
};

export default function FullPageWrapper() {
  const globalFootnotes = buildGlobalFootnotes();
  const [activeFootnote, setActiveFootnote] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const popoverRef = useRef(null);
  
  // Listen for footnote events from ContentSection components
  useEffect(() => {
    const handleFootnoteHover = (event) => {
      const { footnoteIndex, position } = event.detail;
      setActiveFootnote({
        index: footnoteIndex,
        text: globalFootnotes[footnoteIndex]
      });
      setPopoverPosition({
        x: position.x,
        y: position.y,
        isMobile: position.isMobile || false
      });
    };
    
    const handleFootnoteLeave = () => {
      setActiveFootnote(null);
    };
    
    window.addEventListener('footnoteHover', handleFootnoteHover);
    window.addEventListener('footnoteLeave', handleFootnoteLeave);
    
    return () => {
      window.removeEventListener('footnoteHover', handleFootnoteHover);
      window.removeEventListener('footnoteLeave', handleFootnoteLeave);
    };
  }, [globalFootnotes]);

  // Handle click outside to close footnote
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeFootnote && popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActiveFootnote(null);
      }
    };

    if (activeFootnote) {
      // Add slight delay to prevent immediate closing when footnote opens
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [activeFootnote]);
  
  const handleSectionChange = (_, destination) => {
    window.dispatchEvent(new CustomEvent('sectionChange', { 
      detail: { sectionIndex: destination.index } 
    }));
  };

  const handleAfterLoad = (_, destination) => {
    // Dispatch sectionVisible event after section loads
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('sectionVisible', { 
        detail: { sectionIndex: destination.index } 
      }));
    }, 100);
  };

  return (
    <>
      <ReactFullpage
        licenseKey="6K967-M43B6-H90K9-J23GH-LUQNQ"
        onLeave={handleSectionChange}
        afterLoad={handleAfterLoad}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <LandingPage />
            </div>

            {isMobileView ? (
              // Mobile: Let mobile component control section creation
              contentArray.map((contentObj) => (
                <ContentSectionMobile key={contentObj.id} contentObj={contentObj} globalFootnotes={globalFootnotes} />
              ))
            ) : (
              // Desktop: Wrap each component in a section
              contentArray.map((contentObj) => (
                <div key={contentObj.id} className="section">
                  <ContentSection contentObj={contentObj} globalFootnotes={globalFootnotes} />
                </div>
              ))
            )}
          </ReactFullpage.Wrapper>
        )}
      />
      
      {/* Global footnote popover */}
      {activeFootnote && (
        <div 
          ref={popoverRef}
          onClick={() => popoverPosition.isMobile && setActiveFootnote(null)}
          style={{
            position: 'fixed',
            top: popoverPosition.y + 'px',
            left: popoverPosition.x + 'px',
            background: 'white',
            color: '#333',
            padding: popoverPosition.isMobile ? '16px 20px' : '12px 16px',
            zIndex: 99999,
            borderRadius: '8px',
            maxWidth: popoverPosition.isMobile ? '90vw' : '280px',
            width: popoverPosition.isMobile ? '90vw' : 'auto',
            transform: 'translateX(-50%)',
            pointerEvents: popoverPosition.isMobile ? 'auto' : 'none',
            fontSize: popoverPosition.isMobile ? '1rem' : '0.875rem',
            lineHeight: '1.5',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            fontFamily: 'inherit',
            textAlign: popoverPosition.isMobile ? 'center' : 'left',
            cursor: popoverPosition.isMobile ? 'pointer' : 'default'
          }}
        >
          {parse(activeFootnote.text)}
        </div>
      )}
    </>
  );
}
