import parse from 'html-react-parser';

export default function ContentSectionMobile(props) {
  const { contentObj, globalFootnotes = {} } = props;
  
  // Static test popover for mobile
  const renderFootnotePopover = () => {
    return (
      <div 
        style={{
          position: 'fixed',
          top: '50px',
          left: '50px',
          background: 'blue',
          color: 'white',
          padding: '10px',
          zIndex: 9999,
          borderRadius: '4px'
        }}
      >
        MOBILE TEST POPOVER
      </div>
    );
  };

  if (contentObj.content.length === 1) {
    return (
      <div key={contentObj.id} className="section">
        <div className="left-content">{parse(contentObj.content[0].text || '')}</div>
        {renderFootnotePopover()}
      </div>
    );
  } else if (contentObj.content.length === 2) {
    return (
      <>
        <div key={contentObj.id} className="section">
          <div className="side-by-side-content">
            {parse(contentObj.content[0].text || '')}
          </div>
          {renderFootnotePopover()}
        </div>
        <div key={contentObj.id + "_2"} className="section">
          <div className="side-by-side-content">
            {parse(contentObj.content[1].text || '')}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
