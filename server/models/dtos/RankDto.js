class RankDto {
  constructor(rankData) {
    const soloDuoData = rankData.find(
      (queue) => queue.queueType === "RANKED_SOLO_5x5"
    );
    const flexData = rankData.find(
      (queue) => queue.queueType === "RANKED_FLEX_SR"
    );

    this.soloDuo = soloDuoData
      ? {
          rank: soloDuoData.tier,
          division: soloDuoData.rank,
          wins: soloDuoData.wins,
          losses: soloDuoData.losses,
          lp: soloDuoData.leaguePoints,
        }
      : null;
    this.flex = flexData
      ? {
          rank: flexData.tier,
          division: flexData.rank,
          wins: flexData.wins,
          losses: flexData.losses,
          lp: flexData.leaguePoints,
        }
      : null;
  }
}

module.exports = RankDto;
