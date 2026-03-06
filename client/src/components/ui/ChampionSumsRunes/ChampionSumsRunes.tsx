import type { Participant } from "@/types";
import {
  createChampIconUrl,
  createSumSpellIconUrl,
  getSumSpellIconValue,
  createRuneIconUrl,
  getRuneIconValue,
} from "@/utils";

import classes from "./ChampionSumsRunes.module.css";

type Props = {
  participant: Participant;
  size?: "default" | "small";
};

export default function ChampionSumsRunes({
  participant,
  size = "default",
}: Props) {
  const sizeClass = size === "small" ? classes.buildSmall : "";

  return (
    <div className={`${classes.championBuild} ${sizeClass}`}>
      <span className={classes.champIconWrapper}>
        <img
          className={classes.champIcon}
          src={createChampIconUrl(participant.champion.name)}
          alt={participant.champion.name}
        />
        <span className={classes.champLevel}>{participant.champion.level}</span>
      </span>

      <div className={classes.summonerSpells}>
        <img
          className={classes.sumSpellIcon}
          src={createSumSpellIconUrl(
            getSumSpellIconValue(participant.summoners[0]),
          )}
          alt="Summoner spell 1"
        />

        <img
          className={classes.sumSpellIcon}
          src={createSumSpellIconUrl(
            getSumSpellIconValue(participant.summoners[1]),
          )}
          alt="Summoner spell 2"
        />
      </div>

      <div className={classes.runes}>
        <span className={classes.runeIconWrapper}>
          {participant.runes[0] !== undefined && participant.runes[0] !== 0 && (
            <img
              className={classes.runeIcon}
              src={createRuneIconUrl(getRuneIconValue(participant.runes[0]))}
              alt="Keystone rune"
            />
          )}
        </span>

        <span className={classes.runeIconWrapper}>
          {participant.runes[0] !== undefined && participant.runes[0] !== 0 && (
            <img
              className={classes.runeIcon}
              src={createRuneIconUrl(getRuneIconValue(participant.runes[1]))}
              alt="Secondary rune"
            />
          )}
        </span>
      </div>
    </div>
  );
}
