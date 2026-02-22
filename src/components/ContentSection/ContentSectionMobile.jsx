import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
import { MOBILE_BREAKPOINT } from '../../constants/constants';
import { renderTextWithFootnotes } from '../../utils/renderTextWithFootnotes';
import styles from './ContentSectionMobile.module.css';

export default function ContentSectionMobile({contentObj}) {
  const videoRefs = useRef(new Set());

  useEffect(() => {
    const videoSet = videoRefs.current;

    const handleSectionChange = (event) => {
      // Pause all videos when section changes
      videoSet.forEach(video => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };

    const handleSectionVisible = () => {
      // Resume autoplay videos when section becomes visible again
      videoSet.forEach(video => {
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
      videoSet.clear();
    };
  }, []);

  const handleFootnoteHover = (event, footnoteIndex) => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    let position;
    if (isMobile) {
      position = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.4,
        isMobile: true
      };
    } else {
      const rect = event.target.getBoundingClientRect();
      position = {
        x: rect.left + rect.width / 2,
        y: rect.top - 40,
        isMobile: false
      };
    }

    window.dispatchEvent(new CustomEvent('footnoteHover', {
      detail: { footnoteIndex, position }
    }));
  };

  const renderTitle = () => {
    if (contentObj.title) {
      return <h4 className={styles.title}>{contentObj.title}</h4>;
    }
    return null;
  };

  const renderContent = (item) => {
    if (!item) return "";

    if (item.type === "text") {
      return (
        <div className={styles.textContent}>
          {renderTextWithFootnotes(item.text || "", item.footnotes, (num) => ({
            className: styles.footnoteRef,
            onClick: (e) => { e.preventDefault(); handleFootnoteHover(e, num); },
          }))}
        </div>
      );
    } else if (item.type === "image") {
      return (
        <div className={styles.mediaContainer}>
          <img
            src={item.mediaUrl}
            alt={item.caption || ""}
            loading="lazy"
            className={styles.media}
          />
          {item.caption && (
            <p className={styles.caption}>{parse(item.caption)}</p>
          )}
        </div>
      );
    } else if (item.type === "video") {
      return (
        <div className={styles.mediaContainer}>
          <video
            ref={(el) => { if (el) videoRefs.current.add(el); }}
            src={item.mediaUrl}
            autoPlay={item.autoplay}
            loop={item.loop}
            muted={item.muted}
            playsInline
            preload="none"
            className={styles.media}
          />
        </div>
      );
    }
    return "";
  };

  if (contentObj.content.length === 1) {
    return (
      <div key={contentObj.id} className={`section ${styles.section}`}>
        <div className={styles.mobileContent}>
          {renderTitle()}
          {renderContent(contentObj.content[0])}
        </div>
      </div>
    );
  } else if (contentObj.content.length === 2) {
    return (
      <>
        <div key={`${contentObj.id}-1`} className={`section ${styles.section}`}>
          <div className={styles.mobileContent}>
            {renderTitle()}
            {renderContent(contentObj.content[0])}
          </div>
        </div>
        <div key={`${contentObj.id}-2`} className={`section ${styles.section}`}>
          <div className={styles.mobileContent}>
            {renderContent(contentObj.content[1])}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
