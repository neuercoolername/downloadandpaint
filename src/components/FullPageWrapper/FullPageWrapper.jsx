import ReactFullpage from "@fullpage/react-fullpage";
import { useState, useEffect } from "react";
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
  
  // Listen for footnote events from ContentSection components
  useEffect(() => {
    const handleFootnoteHover = (event) => {
      const { footnoteIndex, position } = event.detail;
      setActiveFootnote({
        index: footnoteIndex,
        text: globalFootnotes[footnoteIndex]
      });
      setPopoverPosition(position);
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
  
  const handleSectionChange = (_, destination) => {
    window.dispatchEvent(new CustomEvent('sectionChange', { 
      detail: { sectionIndex: destination.index } 
    }));
  };

  return (
    <>
      <ReactFullpage
        licenseKey="6K967-M43B6-H90K9-J23GH-LUQNQ"
        onLeave={handleSectionChange}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <LandingPage />
            </div>

            {contentArray.map((contentObj) => (
              <div key={contentObj.id} className="section">
                {isMobileView ? (
                  <ContentSectionMobile contentObj={contentObj} globalFootnotes={globalFootnotes} />
                ) : (
                  <ContentSection contentObj={contentObj} globalFootnotes={globalFootnotes} />
                )}
              </div>
            ))}
          </ReactFullpage.Wrapper>
        )}
      />
      
      {/* Global footnote popover */}
      {activeFootnote && (
        <div 
          style={{
            position: 'fixed',
            top: popoverPosition.y + 'px',
            left: popoverPosition.x + 'px',
            background: 'white',
            color: '#333',
            padding: '12px 16px',
            zIndex: 99999,
            borderRadius: '6px',
            maxWidth: '280px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            fontFamily: 'inherit'
          }}
        >
          {activeFootnote.text}
        </div>
      )}
    </>
  );
}
