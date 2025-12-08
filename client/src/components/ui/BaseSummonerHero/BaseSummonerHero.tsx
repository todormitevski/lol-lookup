import type { SummonerDto } from "@/types";

type Props = {
  data: SummonerDto;
  mainChampId: number;
};

export default function BaseSummonerHero({ data, mainChampId }: Props) {
  return (
    <div>
      <h2>Summoner Data</h2>
      <>
        <p>Main champion id: {mainChampId}</p>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/profileicon/${data?.profileIconId}.png`}
          alt="Summoner Icon"
        />
        <p>Region: {data.region}</p>
        <p>Game name: {data.gameName}</p>
        <p>Tagline: {data.tagLine}</p>
        <p>Summoner level: {data.summonerLevel}</p>
        <p></p>
      </>
    </div>
  );
}
