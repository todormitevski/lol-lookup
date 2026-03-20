import type { SummonerDto } from "@/types";
import { getRegionDisplayValue } from "@/utils";
import { useEffect, useState } from "react";
import { getChampionNameById } from "@/services/dataDragon";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import classes from "./BaseSummonerHero.module.css";

type Props = {
  data: SummonerDto;
  mainChampId: number;
};

const PATCH_VER = import.meta.env.VITE_PATCH_VER;

export default function BaseSummonerHero({ data, mainChampId }: Props) {
  const [mainChampName, setMainChampName] = useState<string | null>(null);
  const mainChampSkinId = 0;

  useEffect(() => {
    async function loadChampionName() {
      const championName = await getChampionNameById(mainChampId);
      setMainChampName(championName);
    }

    loadChampionName();
  }, [mainChampId]);

  if (!mainChampName) {
    return <LoadingSpinner />;
  }

  const mainChampSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mainChampName}_${mainChampSkinId}.jpg`;
  const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VER}/img/profileicon/${data?.profileIconId}.png`;

  const regionDisplayValue = getRegionDisplayValue(data.region);

  return (
    <div className={classes.heroContainer}>
      <div className={classes.splashBackground}>
        <img
          src={mainChampSplashUrl}
          alt="Main champion splash art"
          className={classes.splashImage}
        />
        <div className={classes.splashOverlay} />
      </div>

      <div className={classes.baseInfoSection}>
        <div className={classes.summonerIconWrapper}>
          <img
            src={summonerIconUrl}
            alt="Summoner icon"
            className={classes.summonerIcon}
          />
          <div className={classes.summonerLevelBadge}>{data.summonerLevel}</div>
        </div>

        <div className={classes.summonerAlias}>
          <h1 className={classes.riotId}>
            <span className={classes.gameName}>{data.gameName}</span>
            <span className={classes.tagLine}>#{data.tagLine}</span>
          </h1>
          <p className={classes.region}>{regionDisplayValue}</p>
        </div>
      </div>
    </div>
  );
}
