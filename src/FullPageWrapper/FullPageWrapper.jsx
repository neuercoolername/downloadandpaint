import ReactFullpage from "@fullpage/react-fullpage";
import LandingPage from "../pages/LandingPage";

const fullpages = [<LandingPage />, "hi"];

export default function FullPageWrapper() {
  return (
    <ReactFullpage
      licenseKey="6K967-M43B6-H90K9-J23GH-LUQNQ"
      render={(comp) => (
        <ReactFullpage.Wrapper>
          {fullpages.map((page) => (
            <div className="section">{page}</div>
          ))}
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
