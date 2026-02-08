import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MatchCard from "@/components/ui/MatchCard";
import MatchesSummaryRow from "@/components/ui/MatchesSummaryRow";
import api from "@/services/api";
import { getSummaryData, type MatchDto, type MatchIds } from "@/types";
import { useEffect, useState } from "react";

import classes from "./MatchList.module.css";

type Props = {
  data: MatchIds;
  region: string;
  riotId: string;
};

const MATCHES_PER_LOAD = 5;

export default function MatchList({ data, region, riotId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<MatchDto[]>([]);

  const currentIndex = matches.length;

  useEffect(
    () => {
      batchFetchMatches(0);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  async function batchFetchMatches(startIndex: number) {
    if (isLoading) {
      return;
    }

    const matchIds = data.matchIds;
    const matchesLeft = data.count - startIndex;

    if (matchesLeft <= 0) {
      return;
    }

    const amountToFetch = Math.min(MATCHES_PER_LOAD, matchesLeft);

    setIsLoading(true);

    try {
      const matchPromises = matchIds
        .slice(startIndex, startIndex + amountToFetch)
        .map((id) => api.get<MatchDto>(`/summoner/match/${region}/${id}`));

      const matchesData = await Promise.all(matchPromises).then((matchesRes) =>
        matchesRes.map((res) => res.data),
      );

      setMatches((prev) => [...prev, ...matchesData]);
    } catch (error) {
      console.error("Error fetching matches: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoadMore() {
    batchFetchMatches(currentIndex);
  }

  if (data.count === 0) {
    // TODO: style this
    return (
      <div>
        <h3>No recent matches</h3>
      </div>
    );
  }

  if (matches.length === 0) {
    return <LoadingSpinner variant="centered" />;
  }

  const summaryData = getSummaryData(matches, riotId);

  return (
    // TODO: style majority of this
    <div className={classes.matchListContainer}>
      <MatchesSummaryRow data={summaryData} />
      <div>
        <p>
          Showing {matches.length} of {data.count} matches
        </p>

        {matches.map((match) => (
          <MatchCard key={match.matchId} match={match} />
        ))}

        <button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
