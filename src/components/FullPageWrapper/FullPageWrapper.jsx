import ReactFullpage from "@fullpage/react-fullpage";
import LandingPage from "../../pages/LandingPage";
import ContentSection from "../ContentSection/ContentSection";
import ContentSectionMobile from "../ContentSection/ContentSectionMobile";

const isMobileView = window.innerWidth <= 767;

const contentArray = [
  {
    id: 1,
    content: [
      {
        type: "text",
        text: "This is a left side content of two a side-by-side view",
      },
      {
        type: "text",
        text: "This is a right side content of two a side-by-side view",
      },
    ],
    layout: "side-by-side",
  },
  {
    id: 2,
    content: [
      {
        type: "image",
        mediaUrl: "./images/M0590_20190424-lowres.jpg",
      },
    ],
    layout: "full",
  },
];

export default function FullPageWrapper() {
  const handleSectionChange = (_, destination) => {
    window.dispatchEvent(new CustomEvent('sectionChange', { 
      detail: { sectionIndex: destination.index } 
    }));
  };

  return (
    <>
      <ReactFullpage
        licenseKey="6K967-M43B6-H90K9-J23GH-LUQNQ"
        onLeave={handleSectionChange}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <LandingPage />
            </div>

            {contentArray.map((contentObj) => {
              if (isMobileView) {
                return <ContentSectionMobile contentObj={contentObj} />;
              } else return <ContentSection contentObj={contentObj} />;
            })}
          </ReactFullpage.Wrapper>
        )}
      />
    </>
  );
}
