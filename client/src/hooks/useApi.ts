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
  summonerData: SummonerDto | null;
  championMasteryData: ChampionMasteryDto | null;
  rankLoading: boolean;
  rankData: RankDto | null;
  matchIdsData: MatchIds | null;
};

type ApiHookResult = {
  baseLoading: boolean;
  packedData: PackedData;
  error: Error | null;
};

export default function useApi(
  region: string | undefined,
  gameName: string | undefined,
  tagLine: string | undefined
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

        const [rankRes, matchIdsRes] = await Promise.all([
          api.get<RankDto>(`/summoner/rank/${region}/${puuid}`),
          api.get<MatchIds>(`/summoner/matches/${region}/${puuid}`),
        ]);
        setRankData(rankRes.data);
        setMatchIdsData(matchIdsRes.data);

        setRankLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          const message =
            error.response?.data.message ||
            error.response?.data.error ||
            error.message ||
            "Something unexpected occurred";

          setError(new Error(message));
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

  const packedData: PackedData = {
    summonerData,
    championMasteryData,
    rankLoading,
    rankData,
    matchIdsData,
  };

  return { baseLoading, packedData, error };
}
