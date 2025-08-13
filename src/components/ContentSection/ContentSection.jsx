import styles from "./ContentSection.module.css";
import parse from 'html-react-parser';

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
      return parse(text);
    }

    // Replace footnote references like [1] with hoverable spans (as HTML string)
    const footnoteRegex = /\[(\d+)\]/g;
    let processedText = text.replace(footnoteRegex, (match, num) => {
      const footnoteNum = parseInt(num);
      return `<span class="${styles.footnoteRef}" data-footnote="${footnoteNum}">${match}</span>`;
    });
    
    // Parse the HTML with React
    return parse(processedText, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'span' && domNode.attribs['data-footnote']) {
          const footnoteNum = parseInt(domNode.attribs['data-footnote']);
          return (
            <span
              className={styles.footnoteRef}
              onMouseEnter={(e) => handleFootnoteHover(e, footnoteNum)}
              onMouseLeave={handleFootnoteLeave}
            >
              {domNode.children[0]?.data || `[${footnoteNum}]`}
            </span>
          );
        }
      }
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
    } else if (item.type === "video") {
      return (
        <div className={styles.videoContainer}>
          <video
            src={item.mediaUrl}
            autoPlay={item.autoplay}
            loop={item.loop}
            muted={item.muted}
            playsInline
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
              <img src={contentObj.content[0].mediaUrl} alt="" />
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
