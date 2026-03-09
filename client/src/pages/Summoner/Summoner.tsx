import type { JSX } from "react";
import { useParams } from "react-router";
import { getRegionApiValue } from "@/utils";
import BaseSummonerHero from "@/components/ui/BaseSummonerHero";
import RankStats from "@/components/ui/RankStats";
import MatchList from "@/components/ui/MatchList";
import ColdStartNotice from "@/components/ui/ColdStartNotice";
import SummonerError from "@/components/ui/SummonerError";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useApi from "@/hooks/useApi";

import classes from "./Summoner.module.css";

type UrlParams = {
  region: string;
  gameName: string;
  tagLine: string;
};

export default function Summoner() {
  const { region, gameName, tagLine } = useParams<UrlParams>();
  const { baseLoading, packedData, error } = useApi(region, gameName, tagLine);
  const {
    summonerData,
    championMasteryData,
    rankLoading,
    rankData,
    matchIdsData,
  } = packedData;

  if (error) {
    if (error.isColdStart) {
      return <ColdStartNotice title={error.title} message={error.message} />;
    }

    return <SummonerError title={error.title} message={error.message} />;
  }

  if (baseLoading || !summonerData || !championMasteryData) {
    return <LoadingSpinner />;
  }

  let rankContent: JSX.Element | null = null;

  if (rankLoading || !rankData) {
    rankContent = <LoadingSpinner variant="centered" />;
  } else {
    rankContent = <RankStats data={rankData} />;
  }

  let matchContent: JSX.Element | null = null;
  const summonerPuuid = summonerData.puuid;

  if (!matchIdsData) {
    matchContent = <LoadingSpinner variant="centered" />;
  } else {
    const regionApiValue = getRegionApiValue(summonerData.region);

    matchContent = (
      <MatchList
        data={matchIdsData}
        region={regionApiValue}
        puuid={summonerPuuid}
      />
    );
  }

  return (
    <section className={classes.summonerPage}>
      <BaseSummonerHero
        data={summonerData}
        mainChampId={championMasteryData.mainChampionId}
      />
      <div className={classes.contentContainer}>
        <div className={classes.statsRow}>
          {rankContent}
          {matchContent}
        </div>
      </div>
    </section>
  );
}
