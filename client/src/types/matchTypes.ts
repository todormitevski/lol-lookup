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
};

export interface MatchDto {
  gameMode: string;
  startTimestamp: number;
  duration: number;
  participants: Participant[];
}
