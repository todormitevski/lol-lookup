import type { JSX } from "react";
import type { QueueRankData } from "@/types";
import { formatRankValue, getRankIconUrl } from "@/utils";

import classes from "./RankedQueueCard.module.css";

type Props = {
  queueType: string;
  data: QueueRankData | undefined;
};

export default function RankedQueueCard({ queueType, data }: Props) {
  const isUnranked = !data;
  let content: JSX.Element | null = null;

  function calculateWinRate(wins: number, losses: number): number {
    const total = wins + losses;
    return Math.round((wins / total) * 100);
  }

  if (isUnranked) {
    const unrankedIconUrl = getRankIconUrl();

    content = (
      <>
        <div className={classes.rankContent}>
          <div className={classes.rankIconWrapper}>
            <div className={classes.rankIconBackground} />
            <img
              src={unrankedIconUrl}
              alt={`${queueType} rank icon`}
              className={classes.rankIcon}
            />
          </div>

          <div className={classes.rankInfo}>
            <div className={classes.rankTier}>
              <span className={classes.unranked}>Unranked</span>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    const { rank, division, lp, wins, losses } = data;
    const winRate = calculateWinRate(wins, losses);
    const rankIconUrl = getRankIconUrl(rank);
    const formattedRankValue = formatRankValue(rank);

    content = (
      <>
        <div className={classes.rankContent}>
          <div className={classes.rankIconWrapper}>
            <div className={classes.rankIconBackground} />
            <img
              src={rankIconUrl}
              alt={`${queueType} rank icon`}
              className={classes.rankIcon}
            />
          </div>

          <div className={classes.rankInfo}>
            <div className={classes.rankTier}>
              <span className={classes.rank}>{formattedRankValue}</span>
              <span className={classes.division}>{division}</span>
            </div>
            <div className={classes.lp}>{lp} LP</div>
          </div>

          <div className={classes.winLossInfo}>
            <div className={classes.winLoss}>
              <span className={classes.wins}>{wins}W</span>
              <span className={classes.losses}>{losses}L</span>
            </div>
            <div className={classes.winRate}>{`${winRate}% Win Rate`}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={classes.rankCard}>
      <h4 className={classes.queueName}>{`Ranked ${queueType}`}</h4>

      {content}
    </div>
  );
}
