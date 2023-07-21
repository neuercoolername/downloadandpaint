export default function ContentSectionMobile(props) {
  const { contentObj } = props;

  if (contentObj.content.length === 1) {
    return (
      <div key={contentObj.id} className="section">
        <div className="left-content">{contentObj.content[0].text}</div>;
      </div>
    );
  } else if (contentObj.content.length === 2) {
    return (
      <>
        <div key={contentObj.id} className="section">
          <div className="side-by-side-content">
            {contentObj.content[0].text}
          </div>
        </div>
        <div key={contentObj.id + "_2"} className="section">
          <div className="side-by-side-content">
            {contentObj.content[1].text}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
