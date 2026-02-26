import type { Participant } from "@/types";
import {
  checkIsCurrentSummoner,
  formatLargeNumber,
  formatKp,
  formatTotalKda,
  getKdaQuality,
} from "@/utils";
import classes from "./MatchExpansion.module.css";
import ChampionSumsRunes from "@/components/ChampionSumsRunes";
import ItemSlot from "@/components/ItemSlot";
import { Link } from "react-router";

type Props = {
  blueTeam: Participant[];
  redTeam: Participant[];
  isRemake: boolean;
  region: string;
  riotId: string;
};

export default function MatchExpansion({
  blueTeam,
  redTeam,
  isRemake,
  region,
  riotId,
}: Props) {
  return (
    <div className={classes.expandedSection}>
      {[blueTeam, redTeam].map((team, teamIndex) => {
        const isWin = team[0].win;
        const outcome = isRemake ? "Remake " : isWin ? "Victory " : "Defeat ";
        const tbodyClass = isRemake
          ? classes.tbodyRemake
          : isWin
            ? classes.tbodyVictory
            : classes.tbodyDefeat;
        const thTextClass = isRemake
          ? classes.thTextRemake
          : isWin
            ? classes.thTextVictory
            : classes.thTextDefeat;

        return (
          <table key={teamIndex} className={classes.detailTable}>
            <thead>
              <tr>
                <th className={classes.thParticipant}>
                  <span className={thTextClass}>{outcome}</span>
                  {teamIndex === 0 ? "(Blue Team)" : "(Red Team)"}
                </th>
                <th className={classes.thKda}>KDA</th>
                <th className={classes.thDamage}>Damage</th>
                <th className={classes.thGold}>Gold</th>
                <th className={classes.thCs}>CS</th>
                <th className={classes.thVision}>Vision</th>
                <th className={classes.thItems}>Items</th>
              </tr>
            </thead>
            <tbody className={tbodyClass}>
              {team.map((p) => {
                const isCurrent = checkIsCurrentSummoner(
                  p.gameName,
                  p.tagLine,
                  riotId,
                );

                const isLast = p.puuid === redTeam[4].puuid;

                const formattedKda = formatTotalKda(
                  p.kda.totalKda,
                  p.kda.kills,
                  p.kda.deaths,
                  p.kda.assists,
                );
                const kdaQualityClass = getKdaQuality(formattedKda);
                const formattedKp = formatKp(p.kp);

                const formattedDamage = formatLargeNumber(
                  p.totalDamageToChampions,
                  false,
                );

                const formattedGold = formatLargeNumber(p.gold, true);

                return (
                  <tr
                    key={p.puuid}
                    className={`${classes.detailRow} ${isCurrent ? classes.detailRowCurrent : ""} ${isLast ? classes.detailRowLast : ""}`}
                  >
                    <td className={classes.tdParticipant}>
                      <div className={classes.participantCell}>
                        <ChampionSumsRunes participant={p} size="small" />
                        <Link
                          className={`${classes.participantName} ${isCurrent ? classes.participantNameCurrent : ""}`}
                          to={`/summoner/${region}/${p.gameName}/${p.tagLine}`}
                        >
                          {p.gameName}
                        </Link>
                      </div>
                    </td>

                    <td className={classes.tdKda}>
                      <div className={classes.tdKdaInner}>
                        <span>
                          {p.kda.kills}/{p.kda.deaths}/{p.kda.assists}{" "}
                          <span className={classes.kpText}>
                            ({formattedKp}%)
                          </span>
                        </span>
                        <span
                          className={`${classes.tdKdaTotal} ${classes[kdaQualityClass]}`}
                        >
                          {formattedKda} KDA
                        </span>
                      </div>
                    </td>

                    <td className={classes.tdDamage}>{formattedDamage}</td>

                    <td className={classes.tdGold}>{formattedGold}</td>

                    <td className={classes.tdCs}>{p.cs}</td>

                    <td className={classes.tdVision}>{p.visionScore}</td>

                    <td className={classes.tdItems}>
                      <div className={classes.itemsRowInline}>
                        <ItemSlot itemId={p.items[0]} />
                        <ItemSlot itemId={p.items[1]} />
                        <ItemSlot itemId={p.items[2]} />
                        <ItemSlot itemId={p.items[3]} />
                        <ItemSlot itemId={p.items[4]} />
                        <ItemSlot itemId={p.items[5]} />
                        <ItemSlot itemId={p.items[6]} isCircular />
                        <ItemSlot itemId={p.roleQuestItem} isCircular />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
