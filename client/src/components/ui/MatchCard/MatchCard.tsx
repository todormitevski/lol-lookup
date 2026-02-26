import type { MatchDto } from "@/types";
import {
  checkIsCurrentSummoner,
  checkIsRemake,
  formatDuration,
  formatTimestamp,
  formatTotalKda,
  getKdaQuality,
  getQueueIdValue,
} from "@/utils";
import ChampionSumsRunes from "@/components/ChampionSumsRunes";
import ItemSlot from "@/components/ItemSlot";
import TeamDisplay from "@/components/TeamDisplay";
import MatchExpansion from "@/components/MatchExpansion";
import ExpandCardButton from "@/components/ExpandCardButton";
import { useState } from "react";

import classes from "./MatchCard.module.css";

type Props = {
  data: MatchDto;
  region: string;
  riotId: string;
};

export default function MatchCard({ data, region, riotId }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const summonerInMatch = data.participants.find((p) =>
    checkIsCurrentSummoner(p.gameName, p.tagLine, riotId),
  );

  if (!summonerInMatch) {
    console.error("Could not find summoner in match");
    return null;
  }

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  const isRemake = checkIsRemake(
    summonerInMatch.isEarlySurrender,
    data.duration,
  );
  const isVictory = summonerInMatch.win;
  const outcome = isRemake ? "Remake" : isVictory ? "Victory" : "Defeat";
  const outcomeClass = isRemake
    ? classes.remake
    : isVictory
      ? classes.victory
      : classes.defeat;
  const queueValue = getQueueIdValue(data.queueId);
  const formattedDuration = formatDuration(data.duration);
  const formattedTimestamp = formatTimestamp(data.startTimestamp);

  const kda = summonerInMatch.kda;
  const formattedTotalKda = formatTotalKda(
    kda.totalKda,
    kda.kills,
    kda.deaths,
    kda.assists,
  );
  const kdaQualityClass = getKdaQuality(formattedTotalKda);

  const items = summonerInMatch.items;
  const roleQuestItem = summonerInMatch.roleQuestItem;
  const blueTeam = data.participants.slice(0, 5);
  const redTeam = data.participants.slice(5, 10);

  return (
    <>
      <div className={`${classes.matchCard} ${outcomeClass}`}>
        <div className={classes.mobileGameInfo}>
          <div className={classes.baselinePart}>
            <span className={`${classes.outcome} ${outcomeClass}`}>
              {outcome}
            </span>
            <span className={classes.gameMode}>
              {queueValue || data.gameMode}
            </span>
          </div>

          <div className={classes.mobilePart}>
            <div className={classes.baselinePart}>
              <span className={classes.duration}>{formattedDuration}</span>
              <span className={classes.timestamp}>{formattedTimestamp}</span>
            </div>
            <ExpandCardButton
              onClick={toggleExpanded}
              isExpanded={isExpanded}
              variant="small"
            />
          </div>
        </div>

        <div className={classes.cardRow}>
          <div className={`${classes.col} ${classes.colGameInfo}`}>
            <span className={classes.gameMode}>
              {queueValue || data.gameMode}
            </span>
            <span className={`${classes.outcome} ${outcomeClass}`}>
              {outcome}
            </span>
            <span className={classes.duration}>{formattedDuration}</span>
            <span className={classes.timestamp}>{formattedTimestamp}</span>
          </div>

          <div className={`${classes.col} ${classes.colChampion}`}>
            <ChampionSumsRunes participant={summonerInMatch} />
          </div>

          <div className={`${classes.col} ${classes.colKda}`}>
            <div className={classes.kdaSeparate}>
              <span className={classes.killsAssists}>{kda.kills}</span>
              <span className={classes.kdaSlash}>/</span>
              <span className={classes.deaths}>{kda.deaths}</span>
              <span className={classes.kdaSlash}>/</span>
              <span className={classes.killsAssists}>{kda.assists}</span>
            </div>

            <span className={`${classes.kdaTotal} ${classes[kdaQualityClass]}`}>
              {formattedTotalKda} KDA
            </span>
            <div className={classes.csVision}>
              <span>{summonerInMatch.cs} CS</span>
              <span>{summonerInMatch.visionScore} Vision</span>
            </div>
          </div>

          <div className={`${classes.col} ${classes.colItems}`}>
            <div className={classes.itemsGrid}>
              <div className={classes.itemsRow}>
                <ItemSlot itemId={items[0]} />
                <ItemSlot itemId={items[1]} />
                <ItemSlot itemId={items[2]} />
                <ItemSlot itemId={items[6]} isCircular />
              </div>
              <div className={classes.itemsRow}>
                <ItemSlot itemId={items[3]} />
                <ItemSlot itemId={items[4]} />
                <ItemSlot itemId={items[5]} />
                <ItemSlot itemId={roleQuestItem} isCircular />
              </div>
            </div>
          </div>

          <div className={`${classes.col} ${classes.colTeams}`}>
            <TeamDisplay team={blueTeam} region={region} riotId={riotId} />
            <TeamDisplay team={redTeam} region={region} riotId={riotId} />
          </div>

          <div className={classes.desktopExpandBtn}>
            <ExpandCardButton
              onClick={toggleExpanded}
              isExpanded={isExpanded}
            />
          </div>
        </div>
      </div>

      {isExpanded && (
        <MatchExpansion
          blueTeam={blueTeam}
          redTeam={redTeam}
          isRemake={isRemake}
          region={region}
          riotId={riotId}
        />
      )}
    </>
  );
}
