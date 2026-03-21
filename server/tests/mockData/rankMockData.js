const mappedSoloDuoRankMockData = {
  rank: "CHALLENGER",
  division: "I",
  wins: 100,
  losses: 50,
  lp: 2000,
};

const mappedFlexRankMockData = {
  rank: "Iron",
  division: "IV",
  wins: 50,
  losses: 100,
  lp: 10,
};

const rankMockData = [
  {
    queueType: "RANKED_SOLO_5x5",
    tier: "CHALLENGER",
    rank: "I",
    wins: 100,
    losses: 50,
    leaguePoints: 2000,
  },
  {
    queueType: "RANKED_FLEX_SR",
    tier: "Iron",
    rank: "IV",
    wins: 50,
    losses: 100,
    leaguePoints: 10,
  },
];

const unknownQueueRankMockData = [
  {
    queueType: "RANKED_ARAM",
    tier: "MASTER",
    rank: "I",
    wins: 200,
    losses: 0,
    leaguePoints: 1200,
  },
];

module.exports = {
  mappedSoloDuoRankMockData,
  mappedFlexRankMockData,
  rankMockData,
  unknownQueueRankMockData,
};
