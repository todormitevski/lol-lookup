import ExpandCardButton from "@/components/ui/ExpandCardButton";
import InfoWindow from "@/components/InfoWindow";
import { useState } from "react";

import classes from "./InfoButton.module.css";

export default function InfoButton() {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState<boolean>(false);

  function toggleInfo() {
    setIsInfoWindowOpen((prev) => !prev);
  }

  return (
    <div className={classes.infoContainer}>
      <div className={classes.infoBtn}>
        <p>How is MVP status determined?</p>
        <div className={classes.expandBtnWrapper}>
          <ExpandCardButton
            onClick={toggleInfo}
            isExpanded={isInfoWindowOpen}
            variant="small"
          />
        </div>
      </div>

      {isInfoWindowOpen && <InfoWindow />}
    </div>
  );
}
