import api from "@/services/api";
import type {
  ChampionMasteryDto,
  MatchIds,
  RankDto,
  SummonerDto,
} from "@/types";
import { ApiError } from "@/utils";
import { AxiosError, type AxiosResponse } from "axios";
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
  error: ApiError | null;
};

export default function useApi(
  region: string | undefined,
  gameName: string | undefined,
  tagLine: string | undefined,
): ApiHookResult {
  const [baseLoading, setBaseLoading] = useState<boolean>(true);
  const [rankLoading, setRankLoading] = useState<boolean>(false);

  const [summonerData, setSummonerData] = useState<SummonerDto | null>(null);
  const [championMasteryData, setChampionMasteryData] =
    useState<ChampionMasteryDto | null>(null);
  const [rankData, setRankData] = useState<RankDto | null>(null);
  const [matchIdsData, setMatchIdsData] = useState<MatchIds | null>(null);

  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setBaseLoading(true);

        setError(null);

        setSummonerData(null);
        setChampionMasteryData(null);
        setRankData(null);
        setMatchIdsData(null);

        const summonerRes = await api.get<SummonerDto>(
          `/summoner/${region}/${gameName}/${tagLine}`,
        );

        if (checkIsColdStartSuccess(summonerRes)) {
          return setError(
            new ApiError("Server starting", "Estimated time: 60s", true),
          );
        }

        const { puuid } = summonerRes.data;

        const championMasteryRes = await api.get<ChampionMasteryDto>(
          `/summoner/main-champion/${region}/${puuid}`,
        );

        setSummonerData(summonerRes.data);
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
          if (checkIsColdStartError(error)) {
            return setError(
              new ApiError("Server starting", "Estimated time: 60s", true),
            );
          }

          const title = error.response?.data.error || "Not Found";
          const message =
            error.response?.data.message ||
            error.message ||
            "Something unexpected occurred";

          setError(new ApiError(title, message));
        } else {
          setError(new ApiError("Not Found", "An unexpected error occurred"));
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

function checkIsColdStartSuccess(res: AxiosResponse) {
  return typeof res.data === "string" && res.data.includes("Render");
}

function checkIsColdStartError(error: AxiosError): boolean {
  return (
    error.code === "ECONNABORTED" ||
    error.code === "ERR_NETWORK" ||
    error.status === 503
  );
}
