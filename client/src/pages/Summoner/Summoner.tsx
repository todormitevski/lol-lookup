import { useParams } from "react-router";
import BaseSummonerHero from "@/components/ui/BaseSummonerHero";
import RankStats from "@/components/ui/RankStats";
import MatchList from "@/components/ui/MatchList";
import useApi from "@/hooks/useApi";

import classes from "./Summoner.module.css";

export default function Summoner() {
  const { region, gameName, tagLine } = useParams();
  const [baseLoading, packedData, error] = useApi(region!, gameName!, tagLine!);

  if (error) {
    return (
      <div>
        <h3>{error.name}</h3>
        <h4>{error.message}</h4>
      </div>
    );
  }

  if (baseLoading || !packedData) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  const {
    summonerData,
    championMasteryData,
    rankLoading,
    rankData,
    matchIdsData,
  } = packedData;

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
