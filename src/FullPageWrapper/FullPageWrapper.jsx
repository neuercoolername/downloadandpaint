import ReactFullpage from "@fullpage/react-fullpage";
import LandingPage from "../pages/LandingPage";
import Navbar from "../components/NavBar/Navbar";

const isMobileView = window.innerWidth <= 767;

const fullpages = [<LandingPage />, "hi"];

const contentArray = [
  {
    id: 1,
    type: "fullpage",
    content: "This is a full-page content.",
    layout: "full",
  },
  {
    id: 2,
    type: "left",
    content: "This is content on the left.",
    layout: "left",
  },
  {
    id: 3,
    type: "right",
    content: "This is content on the right.",
    layout: "right",
  },
  {
    id: 4,
    type: "side-by-side",
    content1: "Left side content",
    content2: "Right side content",
    layout: "side-by-side",
  },
  // Add more content objects as needed
];

export default function FullPageWrapper() {
  return (
    <>
      <Navbar />
      <ReactFullpage
        licenseKey="6K967-M43B6-H90K9-J23GH-LUQNQ"
        render={(comp) => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <LandingPage />
            </div>

            {contentArray.map((contentObj) => {
              if (isMobileView) {
                // Mobile view: Each content item occupies a full page
                return <>{getContentForMobileView(contentObj)}</>;
              } else {
                // Desktop view: Render content based on the layout type
                switch (contentObj.layout) {
                  case "full":
                    return (
                      <div key={contentObj.id} className="section">
                        {contentObj.content}
                      </div>
                    );
                  case "left":
                    return (
                      <div key={contentObj.id} className="section">
                        <div className="left-content">{contentObj.content}</div>
                      </div>
                    );
                  case "right":
                    return (
                      <div key={contentObj.id} className="section">
                        <div className="right-content">
                          {contentObj.content}
                        </div>
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
            })}
          </ReactFullpage.Wrapper>
        )}
      />
    </>
  );
}

const getContentForMobileView = (contentObj) => {
  // In mobile view, each content item occupies a full page
  switch (contentObj.layout) {
    case "full":
      return (
        <div key={contentObj.id} className="section">
          <div className="left-content">{contentObj.content}</div>;
        </div>
      );

    case "left":
      return (
        <div key={contentObj.id} className="section">
          <div className="left-content">{contentObj.content}</div>;
        </div>
      );
    case "right":
      return (
        <div key={contentObj.id} className="section">
          <div className="left-content">{contentObj.content}</div>;
        </div>
      );
    case "side-by-side":
      return (
        <>
          <div key={contentObj.id} className="section">
            <div className="side-by-side-content">{contentObj.content1}</div>
          </div>
          <div key={contentObj.id + "_2"} className="section">
            <div className="side-by-side-content">{contentObj.content2}</div>
          </div>
        </>
      );
    default:
      return null;
  }
};
