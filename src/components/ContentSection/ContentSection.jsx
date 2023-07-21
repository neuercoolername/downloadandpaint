export default function ContentSection(props) {
  const { contentObj } = props;

  switch (contentObj.layout) {
    case "full":
      return (
        <div key={contentObj.id} className="section">
          {contentObj.content.text}
        </div>
      );
    case "left":
      return (
        <div key={contentObj.id} className="section">
          <div className="left-content">{contentObj.content.text}</div>
        </div>
      );
    case "right":
      return (
        <div key={contentObj.id} className="section">
          <div className="right-content">{contentObj.content.text}</div>
        </div>
      );
    case "side-by-side":
      return (
        <div key={contentObj.id} className="section">
          <div className="side-by-side-content">
            <div>{contentObj.content1}</div>
            <div>{contentObj.content2}</div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

const getContentForMobileView = (contentObj) => {};
