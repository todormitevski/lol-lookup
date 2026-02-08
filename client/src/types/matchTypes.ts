export type MatchIds = {
  matchIds: string[];
  count: number;
};

export type Participant = {
  puuid: string;
  gameName: string;
  tagLine: string;
  level: number;
  position: string;
  win: boolean;
  champion: {
    id: number;
    name: string;
    level: number;
  };
  summoners: number[];
  runes: number[];
  kda: {
    kills: number;
    deaths: number;
    assists: number;
    totalKda: number;
  };
  kp: number;
  largestMultiKill: number;
  cs: number;
  totalDamageToChampions: number;
  gold: number;
  visionScore: number;
  items: number[];
  roleQuestItem: number;
};

export interface MatchDto {
  matchId: string;
  gameMode: string;
  startTimestamp: number;
  duration: number;
  participants: Participant[];
}

export interface SummaryDTO {
  wins: number;
  losses: number;
  totalGames: number;
  winRate: number;
  avgKda: string;
  avgKills: string;
  avgDeaths: string;
  avgAssists: string;
}

export function getSummaryData(
  matches: MatchDto[],
  riotId: string,
): SummaryDTO {
  const summonerRecentMatchParticipations = matches.flatMap((m) =>
    m.participants.filter((p) => {
      const participantRiotId = p.gameName + "#" + p.tagLine;

      return participantRiotId === riotId;
    }),
  );

  const reducedSummary = summonerRecentMatchParticipations.reduce(
    (acc, participation) => {
      return {
        wins: acc.wins + (participation.win ? 1 : 0),
        losses: acc.losses + (participation.win ? 0 : 1),
        kills: acc.kills + participation.kda.kills,
        deaths: acc.deaths + participation.kda.deaths,
        assists: acc.assists + participation.kda.assists,
        kdaSum: participation.kda.totalKda
          ? acc.kdaSum + participation.kda.totalKda
          : acc.kdaSum +
            (participation.kda.kills + participation.kda.assists) /
              participation.kda.deaths,
      };
    },
    { wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0, kdaSum: 0.0 },
  );

  const totalGames = reducedSummary.wins + reducedSummary.losses;
  const winRate = Math.round((reducedSummary.wins / totalGames) * 100);
  const avgKda = (reducedSummary.kdaSum / totalGames).toFixed(2);
  const avgKills = (reducedSummary.kills / totalGames).toFixed(1);
  const avgDeaths = (reducedSummary.deaths / totalGames).toFixed(1);
  const avgAssists = (reducedSummary.assists / totalGames).toFixed(1);

  return {
    wins: reducedSummary.wins,
    losses: reducedSummary.losses,
    totalGames,
    winRate,
    avgKda,
    avgKills,
    avgDeaths,
    avgAssists,
  };
}
