import ScrollIcon from "../Common/ScrollIcon/ScrollIcon";
import { withDelayedVisibility } from "../../hoc/withDelayedVisibility/withDelayedVisibility";

const DelayedScrollIcon = withDelayedVisibility(ScrollIcon, 1000);

export default function StartText() {
  return (
    <>
      <DelayedScrollIcon />
    </>
  );
}
