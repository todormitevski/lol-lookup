import unranked from "@/assets/images/ranks/Unranked.png";
import iron from "@/assets/images/ranks/Iron.png";
import bronze from "@/assets/images/ranks/Bronze.png";
import silver from "@/assets/images/ranks/Silver.png";
import gold from "@/assets/images/ranks/Gold.png";
import platinum from "@/assets/images/ranks/Platinum.png";
import emerald from "@/assets/images/ranks/Emerald.png";
import diamond from "@/assets/images/ranks/Diamond.png";
import master from "@/assets/images/ranks/Master.png";
import grandmaster from "@/assets/images/ranks/Grandmaster.png";
import challenger from "@/assets/images/ranks/Challenger.png";

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

export const RANK_ICONS: Record<Rank, string> = {
  UNRANKED: unranked,
  IRON: iron,
  BRONZE: bronze,
  SILVER: silver,
  GOLD: gold,
  PLATINUM: platinum,
  EMERALD: emerald,
  DIAMOND: diamond,
  MASTER: master,
  GRANDMASTER: grandmaster,
  CHALLENGER: challenger,
};

export function getRankIconUrl(rank?: Rank): string {
  return rank ? RANK_ICONS[rank] : unranked;
}

export function formatRankValue(rank: Rank): string {
  return rank.charAt(0) + rank.substring(1).toLowerCase();
}

export type Division = "IV" | "III" | "II" | "I";

export type QueueRankData = {
  rank: Rank;
  division: Division;
  wins: number;
  losses: number;
  lp: number;
};

export interface RankDto {
  soloDuo?: QueueRankData;
  flex?: QueueRankData;
}
