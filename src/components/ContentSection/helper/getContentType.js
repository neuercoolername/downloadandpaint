import ContentStyles from "./getContentType.module.css";

export const getContentType = (contentObj) => {
  if (contentObj.type === "text") {
    return (
      <div key={contentObj.id} className="section">
        <div className="left-content">{contentObj.content[0].text}</div>
      </div>
    );
  } else if (contentObj.content[0].type === "image") {
    return (
      <div key={contentObj.id} className="section">
        <div className={ContentStyles.image}>
          second section
          <img
            className={ContentStyles.image}
            src={contentObj.content[0].mediaUrl}
            alt=""
          />
        </div>
      </div>
    );
  }
};
