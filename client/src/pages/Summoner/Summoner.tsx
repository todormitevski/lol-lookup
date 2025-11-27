import type { SummonerDto } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Summoner() {
  const [summonerData, setSummonerData] = useState<SummonerDto | null>();
  const { region, gameName, tagLine } = useParams();

  useEffect(() => {
    async function fetchSummonerData() {
      const response: Response = await fetch(
        `http://localhost:8080/api/summoner/${region}/${gameName}/${tagLine}`
      );

      const data = await response.json();
      setSummonerData(data);
    }

    fetchSummonerData();
  }, [region, gameName, tagLine]);

  console.log(summonerData);

  return (
    <section>
      <h1>
        {region} {gameName} {tagLine}
      </h1>
      <br />

      <div>
        <p>{summonerData?.puuid}</p>
        <p>{summonerData?.region}</p>
        <p>{summonerData?.gameName}</p>
        <p>{summonerData?.tagLine}</p>
        <p>{summonerData?.summonerLevel}</p>
        <p>{summonerData?.profileIconId}</p>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/profileicon/${summonerData?.profileIconId}.png`}
        />
      </div>
    </section>
  );
}
