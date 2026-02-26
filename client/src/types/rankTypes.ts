export type QueueType = "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";

export type Rank =
  | "UNRANKED"
  | "IRON"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "EMERALD"
  | "DIAMOND"
  | "MASTER"
  | "GRANDMASTER"
  | "CHALLENGER";

export type Division = "IV" | "III" | "II" | "I";

export type QueueRankData = {
  rank: Rank;
  division: Division;
  wins: number;
  losses: number;
  lp: number;
};

export type RankDto = {
  soloDuo?: QueueRankData;
  flex?: QueueRankData;
};
