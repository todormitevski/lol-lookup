import { useParams } from "react-router";
import BaseSummonerHero from "@/components/ui/BaseSummonerHero";
import RankStats from "@/components/ui/RankStats";
import MatchList from "@/components/ui/MatchList";
import SummonerError from "@/components/ui/SummonerError";
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
    return <SummonerError title={error.title} message={error.message} />;
  }

  if (baseLoading || !summonerData || !championMasteryData) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <section>
      <div className={classes.placeholderColumn}>
        <BaseSummonerHero
          data={summonerData}
          mainChampId={championMasteryData.mainChampionId}
        />
        <div className={classes.placeholderRow}>
          <RankStats loading={rankLoading} data={rankData} />
          <MatchList data={matchIdsData} />
        </div>
      </div>
    </section>
  );
}
