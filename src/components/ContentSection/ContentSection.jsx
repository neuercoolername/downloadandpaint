import { getContentType } from "./helper/getContentType";

export default function ContentSection(props) {
  const { contentObj } = props;

  switch (contentObj.layout) {
    case "full":
      return getContentType(contentObj);
    case "left":
      return (
        <div key={contentObj.id} className="section">
          <div className="left-content">{contentObj.content[0].text}</div>
        </div>
      );
    case "right":
      return (
        <div key={contentObj.id} className="section">
          <div className="right-content">{contentObj.content[0].text}</div>
        </div>
      );
    case "side-by-side":
      return (
        <div key={contentObj.id} className="section">
          <div className="side-by-side-content">
            <div>{contentObj.content[0].text}</div>
            <div>{contentObj.content[1].text}</div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
