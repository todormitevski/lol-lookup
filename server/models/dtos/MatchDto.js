class MatchDto {
  constructor(matchData) {
    const info = matchData.info;

    this.gameMode = info.gameMode;
    this.startTimestamp = info.gameCreation;
    this.duration = info.gameDuration;
    this.participants = info.participants.map((p) => ({
      puuid: p.puuid,
      gameName: p.riotIdGameName,
      tagLine: p.riotIdTagline,
      level: p.summonerLevel,
      position: p.teamPosition,
      win: p.win,
      champion: {
        id: p.championId,
        name: p.championName,
        level: p.champLevel,
      },
      summoners: [p.summoner1Id, p.summoner2Id],
      runes: [p.perks.styles[0].selections[0].perk, p.perks.styles[1].style],
      kda: {
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        totalKda: p.challenges.kda,
      },
      kp: p.challenges.killParticipation,
      largestMultiKill: p.largestMultiKill,
      cs: p.totalMinionsKilled + p.neutralMinionsKilled,
      totalDamageToChampions: p.totalDamageDealtToChampions,
      gold: p.goldEarned,
      visionScore: p.visionScore,
      items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6],
    }));
  }
}

module.exports = MatchDto;
