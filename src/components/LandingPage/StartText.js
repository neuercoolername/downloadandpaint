import ScrollIcon from "../Common/ScrollIcon/ScrollIcon";
import { withDelayedVisibility } from "../../hoc/withDelayedVisibility/withDelayedVisibility";

const DelayedScrollIcon = withDelayedVisibility(ScrollIcon, 6000);

export default function StartText() {
  return (
    <>
      <DelayedScrollIcon />
    </>
  );
}
