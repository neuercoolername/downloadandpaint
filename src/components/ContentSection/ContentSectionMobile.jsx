import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';

export default function ContentSectionMobile(props) {
  const { contentObj, globalFootnotes = {} } = props;
  const videoRefs = useRef([]);
  
  useEffect(() => {
    const handleSectionChange = (event) => {
      // Pause all videos when section changes
      videoRefs.current.forEach(video => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };

    const handleSectionVisible = () => {
      // Resume autoplay videos when section becomes visible again
      videoRefs.current.forEach(video => {
        if (video && video.hasAttribute('autoplay')) {
          video.play().catch(() => {}); // Ignore play errors
        }
      });
    };

    window.addEventListener('sectionChange', handleSectionChange);
    window.addEventListener('sectionVisible', handleSectionVisible);
    
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
      window.removeEventListener('sectionVisible', handleSectionVisible);
    };
  }, []);
  
  const handleFootnoteHover = (event, footnoteIndex) => {
    // Use center positioning for mobile instead of cursor position
    const isMobile = window.innerWidth <= 768;
    
    let position;
    if (isMobile) {
      // Center the footnote on mobile screens
      position = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.4, // 40% from top
        isMobile: true
      };
    } else {
      // Keep original desktop behavior
      const rect = event.target.getBoundingClientRect();
      position = {
        x: rect.left + rect.width / 2,
        y: rect.top - 40,
        isMobile: false
      };
    }
    
    // Dispatch event to global handler
    window.dispatchEvent(new CustomEvent('footnoteHover', {
      detail: {
        footnoteIndex,
        position
      }
    }));
  };

  const handleFootnoteLeave = () => {
    // Dispatch event to global handler  
    window.dispatchEvent(new CustomEvent('footnoteLeave'));
  };

  const renderTextWithFootnotes = (text, footnotes = []) => {
    if (!footnotes || footnotes.length === 0) {
      return parse(text);
    }

    // Replace footnote references like [1] with hoverable spans (as HTML string)
    const footnoteRegex = /\[(\d+)\]/g;
    let processedText = text.replace(footnoteRegex, (match, num) => {
      const footnoteNum = parseInt(num);
      return `<span class="footnote-ref" data-footnote="${footnoteNum}">${match}</span>`;
    });
    
    // Parse the HTML with React
    return parse(processedText, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'span' && domNode.attribs['data-footnote']) {
          const footnoteNum = parseInt(domNode.attribs['data-footnote']);
          return (
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
              onClick={(e) => {
                e.preventDefault();
                handleFootnoteHover(e, footnoteNum);
              }}
            >
              {domNode.children[0]?.data || `[${footnoteNum}]`}
            </span>
          );
        }
      }
    });
  };

  const renderTitle = () => {
    if (contentObj.title) {
      return <h4 style={{ 
        fontSize: '0.9rem', 
        fontWeight: 'bold',
        margin: '0 0 0.25rem 0', 
        lineHeight: '1.2',
        color: '#333'
      }}>{contentObj.title}</h4>;
    }
    return null;
  };

  const renderContent = (item) => {
    if (!item) return "";
    
    if (item.type === "text") {
      return (
        <div style={{ 
          marginBottom: '0.25rem', 
          fontSize: '0.8rem', 
          lineHeight: '1.3',
          padding: '0'
        }}>
          {renderTextWithFootnotes(item.text || "", item.footnotes)}
        </div>
      );
    } else if (item.type === "image") {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: '0.25rem',
          width: '100%'
        }}>
          <img 
            src={item.mediaUrl} 
            alt={item.caption || ""} 
            style={{ 
              maxWidth: '95%', 
              height: 'auto', 
              maxHeight: '70vh',
              objectFit: 'contain'
            }} 
          />
          {item.caption && (
            <p style={{ 
              fontSize: '0.7rem', 
              color: '#666', 
              marginTop: '0.2rem', 
              lineHeight: '1.1',
              textAlign: 'center',
              maxWidth: '90%'
            }}>
              {parse(item.caption)}
            </p>
          )}
        </div>
      );
    } else if (item.type === "video") {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: '0.25rem',
          width: '100%'
        }}>
          <video
            ref={(el) => {
              if (el && !videoRefs.current.includes(el)) {
                videoRefs.current.push(el);
              }
            }}
            src={item.mediaUrl}
            autoPlay={item.autoplay}
            loop={item.loop}
            muted={item.muted}
            playsInline
            style={{ 
              maxWidth: '95%', 
              height: 'auto', 
              maxHeight: '70vh',
              objectFit: 'contain'
            }}
          />
        </div>
      );
    }
    return "";
  };

  // Mobile: Create sections based on content structure
  if (contentObj.content.length === 1) {
    // Single content item = 1 section
    return (
      <div key={contentObj.id} className="section" style={{ 
        padding: '5px 10px', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        <div className="mobile-content" style={{ flex: 1, overflow: 'auto' }}>
          {renderTitle()}
          {renderContent(contentObj.content[0])}
        </div>
      </div>
    );
  } else if (contentObj.content.length === 2) {
    // Two content items (side-by-side) = 2 separate sections
    return (
      <>
        <div key={`${contentObj.id}-1`} className="section" style={{ 
          padding: '5px 10px', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          <div className="mobile-content" style={{ flex: 1, overflow: 'auto' }}>
            {renderTitle()}
            {renderContent(contentObj.content[0])}
          </div>
        </div>
        <div key={`${contentObj.id}-2`} className="section" style={{ 
          padding: '5px 10px', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          <div className="mobile-content" style={{ flex: 1, overflow: 'auto' }}>
            {renderContent(contentObj.content[1])}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
