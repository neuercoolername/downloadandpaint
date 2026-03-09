import { useEffect, useRef } from 'react';
import styles from "./ContentSection.module.css";
import { renderTextWithFootnotes } from "../../utils/renderTextWithFootnotes";

export default function ContentSection(props) {
  const { contentObj } = props;
  const videoRefs = useRef(new Set());

  useEffect(() => {
    const videoSet = videoRefs.current;

    const handleSectionChange = () => {
      videoSet.forEach(video => { if (video && !video.paused) video.pause(); });
    };
    const handleSectionVisible = () => {
      videoSet.forEach(video => { if (video && video.hasAttribute('autoplay')) video.play().catch(() => {}); });
    };

    window.addEventListener('sectionChange', handleSectionChange);
    window.addEventListener('sectionVisible', handleSectionVisible);
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
      window.removeEventListener('sectionVisible', handleSectionVisible);
      videoSet.clear();
    };
  }, []);

  const renderTitle = () => {
    if (contentObj.title) {
      return <h3 className={styles.sectionTitle}>{contentObj.title}</h3>;
    }
    return null;
  };

  const handleFootnoteHover = (event, footnoteIndex) => {
    const rect = event.target.getBoundingClientRect();

    // Dispatch event to global handler
    window.dispatchEvent(
      new CustomEvent("footnoteHover", {
        detail: {
          footnoteIndex,
          position: {
            x: rect.left + rect.width / 2,
            y: rect.top - 40,
          },
        },
      })
    );
  };

  const handleFootnoteLeave = () => {
    // Dispatch event to global handler
    window.dispatchEvent(new CustomEvent("footnoteLeave"));
  };

  const renderContent = (item) => {
    if (!item) return "";

    if (item.type === "text") {
      return (
        <div className={styles.textContent}>
          {renderTextWithFootnotes(item.text || "", item.footnotes, (num) => ({
            className: styles.footnoteRef,
            onMouseEnter: (e) => handleFootnoteHover(e, num),
            onMouseLeave: handleFootnoteLeave,
          }))}
        </div>
      );
    } else if (item.type === "image") {
      return (
        <div className={styles.imageContainer}>
          <img src={item.mediaUrl} alt={item.caption || ""} loading="lazy" />
          {item.caption && <p className={styles.caption}>{item.caption}</p>}
        </div>
      );
    } else if (item.type === "video") {
      return (
        <div className={styles.videoContainer}>
          <video
            ref={(el) => { if (el) videoRefs.current.add(el); }}
            src={item.mediaUrl}
            autoPlay={item.autoplay}
            loop={item.loop}
            muted={item.muted}
            playsInline
            preload="none"
          />
        </div>
      );
    }
    return "";
  };

  // Popover is now handled globally, no local rendering needed

  switch (contentObj.layout) {
    case "full":
      if (contentObj.content[0].type === "text") {
        return (
          <div className={styles.sectionContent}>
            {renderTitle()}
            <div className={styles.leftContent}>
              {renderContent(contentObj.content[0])}
            </div>
          </div>
        );
      } else if (contentObj.content[0].type === "image") {
        return (
          <div className={styles.sectionContent}>
            {renderTitle()}
            <div className={styles.imageContainer}>
              <img src={contentObj.content[0].mediaUrl} alt="" loading="lazy" />
            </div>
          </div>
        );
      } else if (contentObj.content[0].type === "video") {
        return (
          <div className={styles.sectionContent}>
            {renderTitle()}
            {renderContent(contentObj.content[0])}
          </div>
        );
      }
      return null;
    case "left":
      return (
        <div className={styles.sectionContent}>
          {renderTitle()}
          <div className={styles.leftContent}>
            {renderContent(contentObj.content[0])}
          </div>
        </div>
      );
    case "right":
      return (
        <div className={styles.sectionContent}>
          {renderTitle()}
          <div className={styles.rightContent}>
            {renderContent(contentObj.content[0])}
          </div>
        </div>
      );
    case "side-by-side":
      return (
        <div className={styles.sectionContent}>
          {renderTitle()}
          <div className={styles.sideBySideContent}>
            <div>{renderContent(contentObj.content[0])}</div>
            <div>{renderContent(contentObj.content[1])}</div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
