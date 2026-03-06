import type { MatchDto, Participant, SummaryDTO } from "@/types";

const PATCH_VER = import.meta.env.VITE_PATCH_VER;

export function getSummaryData(matches: MatchDto[], puuid: string): SummaryDTO {
  const summonerRecentMatchParticipations = matches
    // TODO: fix arena games
    .filter((m) => !checkIsArenaMatch(m.queueId))
    .flatMap((m) =>
      m.participants.filter((p) => checkIsCurrentSummoner(p.puuid, puuid)),
    );

  const reducedSummary = summonerRecentMatchParticipations.reduce(
    (acc, participation) => {
      const participationCalculatedKdaSum = participation.kda.deaths
        ? (participation.kda.kills + participation.kda.assists) /
          participation.kda.deaths
        : participation.kda.kills + participation.kda.assists;

      return {
        wins: acc.wins + (participation.win ? 1 : 0),
        losses: acc.losses + (participation.win ? 0 : 1),
        kills: acc.kills + participation.kda.kills,
        deaths: acc.deaths + participation.kda.deaths,
        assists: acc.assists + participation.kda.assists,
        kdaSum: participation.kda.totalKda
          ? acc.kdaSum + participation.kda.totalKda
          : acc.kdaSum + participationCalculatedKdaSum,
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

export const QUEUE_ID_VALUES: Record<number, string> = {
  2000: "Tutorial 1",
  2010: "Tutorial 2",
  2020: "Tutorial 3",

  870: "COOP vs AI", //intro bots
  880: "COOP vs AI", //beginner bots
  890: "COOP vs AI", //intermediate bots
  83: "COOP vs AI", //URF bots

  950: "Doom Bots",
  960: "Doom Bots",

  76: "URF",
  900: "URF", //ARURF
  1010: "URF", //snow? ARURF
  1900: "URF", //pick URF (normal URF)

  1300: "Nexus Blitz",
  2300: "Brawl",

  1700: "Arena",
  1710: "Arena",

  100: "ARAM",
  450: "ARAM",
  2400: "ARAM Mayhem",

  700: "Clash", //normal
  720: "Clash", //aram

  480: "Swiftplay",
  490: "Swiftplay", //old quickplay
  400: "Normal Draft",
  430: "Normal Blind",

  420: "Ranked Solo",
  440: "Ranked Flex",
};

export const CHAMPION_NAME_OUTLIERS: Record<string, string> = {
  FiddleSticks: "Fiddlesticks",
};

export const SUMMONER_SPELL_ICON_VALUES: Record<number, string> = {
  21: "Barrier",
  1: "Boost", //cleanse
  14: "Dot", //ignite
  3: "Exhaust",
  4: "Flash",
  6: "Haste", //ghost
  7: "Heal",
  13: "Mana", //clarity
  11: "Smite",
  12: "Teleport",
  32: "Snowball", //mark

  56: "_UltBookPlaceholder", //empty sum slot

  2202: "CherryFlash", //tf is cherry flash
  2201: "CherryHold", //flee
  30: "PoroRecall",
  31: "PoroThrow",
  39: "SnowURFSnowball_Mark",
  55: "_UltBookSmitePlaceholder",
};

export const RUNE_ICON_VALUES: Record<number, string> = {
  8112: "Domination/Electrocute/Electrocute",
  8128: "Domination/DarkHarvest/DarkHarvest",
  9923: "Domination/HailOfBlades/HailOfBlades",

  8351: "Inspiration/GlacialAugment/GlacialAugment",
  8360: "Inspiration/UnsealedSpellbook/UnsealedSpellbook",
  8369: "Inspiration/FirstStrike/FirstStrike",

  8005: "Precision/PressTheAttack/PressTheAttack",
  8008: "Precision/LethalTempo/LethalTempoTemp",
  8021: "Precision/FleetFootwork/FleetFootwork",
  8010: "Precision/Conqueror/Conqueror",

  8437: "Resolve/GraspOfTheUndying/GraspOfTheUndying",
  8439: "Resolve/VeteranAftershock/VeteranAftershock",
  8465: "Resolve/Guardian/Guardian",

  8214: "Sorcery/SummonAery/SummonAery",
  8229: "Sorcery/ArcaneComet/ArcaneComet",
  8230: "Sorcery/PhaseRush/PhaseRush",

  8100: "7200_Domination",
  8300: "7203_Whimsy", //inspiration
  8000: "7201_Precision",
  8400: "7204_Resolve",
  8200: "7202_Sorcery",
};

export function checkIsArenaMatch(queueId: number) {
  return queueId === 1700 || queueId === 1710;
}

export function getQueueIdValue(id: number): string {
  return QUEUE_ID_VALUES[id] || "";
}

export function checkChampNameOutlierCase(champName: string) {
  return CHAMPION_NAME_OUTLIERS[champName] || champName;
}

export function createChampIconUrl(champName: string): string {
  const formattedChampName = checkChampNameOutlierCase(champName);

  return `https://ddragon.leagueoflegends.com/cdn/${PATCH_VER}/img/champion/${formattedChampName}.png`;
}

export function getSumSpellIconValue(sumSpellId: number): string {
  return SUMMONER_SPELL_ICON_VALUES[sumSpellId] || "_UltBookPlaceholder";
}

export function createSumSpellIconUrl(sumSpellName: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/${PATCH_VER}/img/spell/Summoner${sumSpellName}.png`;
}

export function getRuneIconValue(runeId: number): string {
  return RUNE_ICON_VALUES[runeId];
}

export function createRuneIconUrl(runePathSegment: string): string {
  return `https://ddragon.canisback.com/img/perk-images/Styles/${runePathSegment}.png`;
}

export function createItemIconUrl(itemId: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/${PATCH_VER}/img/item/${itemId}.png`;
}

export function getKdaQuality(avgKda: string): string {
  if (avgKda === "Perfect") {
    return "amazingKda";
  }

  const parsedAvgKda = parseFloat(avgKda);
  let kdaQuality = "defaultKda";

  if (parsedAvgKda >= 2.0 && parsedAvgKda < 3.0) {
    kdaQuality = "goodKda";
  } else if (parsedAvgKda >= 3.0 && parsedAvgKda < 4.0) {
    kdaQuality = "greatKda";
  } else if (parsedAvgKda >= 4.0) {
    kdaQuality = "amazingKda";
  }

  return kdaQuality;
}

export function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

export function formatTimestamp(unixTimestampInMs: number): string {
  const now = Date.now();
  const diff = now - unixTimestampInMs;

  const secsSince = Math.floor(diff / 1000);
  const minsSince = Math.floor(secsSince / 60);
  const hrsSince = Math.floor(minsSince / 60);
  const daysSince = Math.floor(hrsSince / 24);

  if (daysSince > 0) {
    return `${daysSince}d ago`;
  }

  if (hrsSince > 0) {
    return `${hrsSince}h ago`;
  }

  if (minsSince > 0) {
    return `${minsSince}m ago`;
  }

  if (secsSince > 0) {
    return `${secsSince}s ago`;
  }

  return "Just now";
}

export function formatLargeNumber(number: number, shorten: boolean): string {
  if (number < 1000) {
    return String(number);
  }

  if (shorten) {
    const fixedDecimalNumberStr = (number / 1000).toFixed(1);

    if (fixedDecimalNumberStr.endsWith(".0")) {
      return `${fixedDecimalNumberStr.replace(".0", "k")}`;
    }

    return `${fixedDecimalNumberStr}k`;
  }

  const strNumber = String(number);
  const commaPos = strNumber.length - 3;

  return `${strNumber.substring(0, commaPos)},${strNumber.substring(commaPos)}`;
}

export function formatKp(kp: number): string {
  return String(Math.round(kp * 100));
}

export function formatTotalKda(
  totalKda: number,
  kills: number,
  deaths: number,
  assists: number,
): string {
  if (!totalKda) {
    if (kills === 0 && deaths === 0 && assists === 0) {
      return "0.00";
    }

    if (deaths === 0) {
      return "Perfect";
    }

    return ((kills + assists) / deaths).toFixed(2);
  }

  if (kills === 0 && deaths === 0 && assists === 0) {
    return "0.00";
  }

  if (deaths === 0) {
    return "Perfect";
  }

  return totalKda.toFixed(2);
}

export function checkIsCurrentSummoner(
  participantPuuid: string,
  currentSummonerPuuid: string,
): boolean {
  return participantPuuid === currentSummonerPuuid;
}

export function checkIsRemake(
  isEarlySurrender: boolean,
  duration: number,
): boolean {
  return isEarlySurrender && duration <= 174;
}

export function calculateWeightedScore(p: Participant): number {
  const isSupport = p.position === "UTILITY";

  const normalizedDamageToChampions = p.totalDamageToChampions / 100;
  const normalizedDamageToObjectives = p.totalDamageToObjectives / 100;
  const normalizedShieldingTeammates = p.totalDamageShieldedOnTeammates / 100;
  const normalizedHealingTeammates = p.totalHealsOnTeammates / 100;
  const normalizedGold = p.gold / 100;

  const shieldingWeight = !isSupport ? 2 : 4;
  const healingWeight = !isSupport ? 2 : 4;
  const csWeight = !isSupport ? 0.5 : 0.1;
  const visionWeight = !isSupport ? 4 : 6;
  const timeCcingWeight = !isSupport ? 4 : 6;

  const score =
    p.kda.kills * 5 +
    p.kda.deaths * -4 +
    p.kda.assists * 3 +
    p.kp * 200 +
    p.largestMultiKill * 15 +
    normalizedDamageToChampions * 2 +
    normalizedDamageToObjectives * 0.8 +
    normalizedShieldingTeammates * shieldingWeight +
    normalizedHealingTeammates * healingWeight +
    normalizedGold +
    p.timeCCingOthers * timeCcingWeight +
    p.objectivesStolen * 80 +
    p.visionScore * visionWeight +
    p.cs * csWeight;

  return Math.round(score);
}

export function getTeamMvp(team: Participant[]): string {
  const teamScores = team
    .map((p) => ({ puuid: p.puuid, score: calculateWeightedScore(p) }))
    .sort((a, b) => b.score - a.score);

  return teamScores[0].puuid;
}
