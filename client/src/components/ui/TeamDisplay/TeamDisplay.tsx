import type { Participant } from "@/types";
import { checkIsCurrentSummoner, createChampIconUrl } from "@/utils";
import { Link } from "react-router";

import classes from "./TeamDisplay.module.css";

type Props = {
  team: Participant[];
  region: string;
  puuid: string;
};

export default function TeamDisplay({ team, region, puuid }: Props) {
  return (
    <div className={classes.teamColumn}>
      {team.map((p) => {
        const isCurrent = checkIsCurrentSummoner(p.puuid, puuid);
        const isBot = p.puuid === "BOT";

        return (
          <Link
            key={!isBot ? p.puuid : `${p.puuid}-${p.position}`}
            className={classes.teamParticipant}
            to={`/summoner/${region}/${p.gameName}/${p.tagLine}`}
          >
            <img
              className={`${classes.teamParticipantChampIcon} ${isCurrent ? classes.teamParticipantChampIconCurrent : ""}`}
              src={createChampIconUrl(p.champion.name)}
              alt={p.champion.name}
            />
            <span
              className={`${classes.teamParticipantName} ${isCurrent ? classes.teamParticipantNameCurrent : ""}`}
            >
              {p.gameName}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
