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
  isEarlySurrender: boolean;
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

export type MatchDto = {
  matchId: string;
  queueId: number;
  gameMode: string;
  startTimestamp: number;
  duration: number;
  participants: Participant[];
};

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
