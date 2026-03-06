import type { SummaryDTO } from "@/types";
import { getKdaQuality } from "@/utils";
import DonutChart from "@/components/ui/DonutChart";
import { useEffect, useState } from "react";

import classes from "./MatchesSummaryRow.module.css";

type Props = {
  data: SummaryDTO;
};

export default function MatchesSummaryRow({ data }: Props) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 1200);
    }

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    wins,
    losses,
    totalGames,
    winRate,
    avgKda,
    avgKills,
    avgDeaths,
    avgAssists,
  } = data;

  const kdaQuality = getKdaQuality(avgKda);

  return (
    <div className={classes.summaryContainer}>
      <div className={classes.gamesSection}>
        <p className={classes.gamesTotal}>
          {totalGames} {isMobile ? "" : "Recent "}Games
        </p>
        <span className={classes.gamesWins}>
          {wins} Win{wins !== 1 ? "s" : ""}
        </span>
        <span className={classes.gamesLosses}>
          {losses} Loss{losses !== 1 ? "es" : ""}
        </span>
      </div>

      <div className={classes.chartSection}>
        <DonutChart
          wins={wins}
          losses={losses}
          winRate={winRate}
          isMobile={isMobile}
        />
      </div>

      <div className={classes.kdaSection}>
        <p className={classes.kdaLabel}>Average KDA</p>
        <p className={`${classes.kdaValue} ${classes[kdaQuality]}`}>{avgKda}</p>
        <p className={classes.kdaBreakdown}>
          {avgKills} / {avgDeaths} / {avgAssists}
        </p>
      </div>
    </div>
  );
}
