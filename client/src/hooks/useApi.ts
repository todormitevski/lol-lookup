import api from "@/services/api";
import type {
  ChampionMasteryDto,
  MatchIds,
  RankDto,
  SummonerDto,
} from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type PackedData = {
  summonerData: SummonerDto;
  championMasteryData: ChampionMasteryDto;
  rankLoading: boolean;
  rankData: RankDto;
  matchIdsData: MatchIds;
};

type ApiHookResult = [
  baseLoading: boolean,
  packedData: PackedData | null,
  error: Error | null
];

export default function useApi(
  region: string,
  gameName: string,
  tagLine: string
): ApiHookResult {
  const [baseLoading, setBaseLoading] = useState<boolean>(true);
  const [rankLoading, setRankLoading] = useState<boolean>(false);

  const [summonerData, setSummonerData] = useState<SummonerDto | null>(null);
  const [championMasteryData, setChampionMasteryData] =
    useState<ChampionMasteryDto | null>(null);
  const [rankData, setRankData] = useState<RankDto | null>(null);
  const [matchIdsData, setMatchIdsData] = useState<MatchIds | null>(null);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setBaseLoading(true);
        setError(null);

        const summonerRes = await api.get<SummonerDto>(
          `/summoner/${region}/${gameName}/${tagLine}`
        );
        setSummonerData(summonerRes.data);

        const { puuid } = summonerRes.data;

        const championMasteryRes = await api.get<ChampionMasteryDto>(
          `/summoner/main-champion/${region}/${puuid}`
        );
        setChampionMasteryData(championMasteryRes.data);

        setBaseLoading(false);

        setRankLoading(true);

        const rankRes = await api.get<RankDto>(
          `/summoner/rank/${region}/${puuid}`
        );
        setRankData(rankRes.data);

        setRankLoading(false);

        const matchIdsRes = await api.get<MatchIds>(
          `/summoner/matches/${region}/${puuid}`
        );
        setMatchIdsData(matchIdsRes.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data.message ||
            error.response?.data.error ||
            error.message ||
            "Something unexpected occurred";

          setError(new Error(errorMessage));
        } else {
          setError(new Error("An unexpected error occurred"));
        }

        setSummonerData(null);
        setChampionMasteryData(null);
        setRankData(null);
        setMatchIdsData(null);
      } finally {
        setBaseLoading(false);
        setRankLoading(false);
      }
    }

    fetchData();
  }, [region, gameName, tagLine]);

  if (error) {
    return [false, null, error];
  }

  if (baseLoading || !summonerData || !championMasteryData) {
    return [true, null, null];
  }

  const packedData: PackedData = {
    summonerData: summonerData,
    championMasteryData: championMasteryData,
    rankLoading: rankLoading,
    rankData: rankData!,
    matchIdsData: matchIdsData!,
  };

  return [baseLoading, packedData, error];
}
