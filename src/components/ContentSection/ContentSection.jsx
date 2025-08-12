import styles from "./ContentSection.module.css";

export default function ContentSection(props) {
  const { contentObj, globalFootnotes = {} } = props;
  

  const renderTitle = () => {
    if (contentObj.title) {
      return <h3 className={styles.sectionTitle}>{contentObj.title}</h3>;
    }
    return null;
  };

  const handleFootnoteHover = (event, footnoteIndex) => {
    const rect = event.target.getBoundingClientRect();
    
    // Dispatch event to global handler
    window.dispatchEvent(new CustomEvent('footnoteHover', {
      detail: {
        footnoteIndex,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.top - 40
        }
      }
    }));
  };

  const handleFootnoteLeave = () => {
    // Dispatch event to global handler  
    window.dispatchEvent(new CustomEvent('footnoteLeave'));
  };

  const renderTextWithFootnotes = (text, footnotes = []) => {
    if (!footnotes || footnotes.length === 0) {
      return text;
    }

    // Replace footnote references like [1] with hoverable spans
    const footnoteRegex = /\[(\d+)\]/g;
    const parts = text.split(footnoteRegex);
    
    return parts.map((part, index) => {
      // If part is a number (footnote reference)
      if (index % 2 === 1) {
        const footnoteNum = parseInt(part);
        return (
          <span
            key={index}
            className={styles.footnoteRef}
            onMouseEnter={(e) => handleFootnoteHover(e, footnoteNum)}
            onMouseLeave={handleFootnoteLeave}
          >
            [{part}]
          </span>
        );
      }
      return part;
    });
  };

  const renderContent = (item) => {
    if (!item) return "";
    
    if (item.type === "text") {
      return (
        <div className={styles.textContent}>
          {renderTextWithFootnotes(item.text || "", item.footnotes)}
        </div>
      );
    } else if (item.type === "image") {
      return (
        <div className={styles.imageContainer}>
          <img src={item.mediaUrl} alt={item.caption || ""} />
          {item.caption && <p className={styles.caption}>{item.caption}</p>}
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
              <img src={contentObj.content[0].mediaUrl} alt="" />
            </div>
          </div>
        );
      }
      return null;
    case "left":
      return (
        <div className={styles.sectionContent}>
          {renderTitle()}
          <div className={styles.leftContent}>{renderContent(contentObj.content[0])}</div>
        </div>
      );
    case "right":
      return (
        <div className={styles.sectionContent}>
          {renderTitle()}
          <div className={styles.rightContent}>{renderContent(contentObj.content[0])}</div>
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
