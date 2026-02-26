import type { Participant } from "@/types";
import { checkIsCurrentSummoner, createChampIconUrl } from "@/utils";

import classes from "./TeamDisplay.module.css";
import { Link } from "react-router";

type Props = {
  team: Participant[];
  region: string;
  riotId: string;
};

export default function TeamDisplay({ team, region, riotId }: Props) {
  return (
    <div className={classes.teamColumn}>
      {team.map((p) => {
        const isCurrent = checkIsCurrentSummoner(p.gameName, p.tagLine, riotId);

        return (
          <Link
            key={p.puuid}
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
