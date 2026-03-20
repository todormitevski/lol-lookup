class MatchDto {
  constructor(matchData) {
    const metadata = matchData.metadata;
    const info = matchData.info;

    this.matchId = metadata.matchId;
    this.queueId = info.queueId;
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
      isEarlySurrender: p.gameEndedInEarlySurrender,
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
        totalKda: p.challenges?.kda ?? 0.0,
      },
      kp: p.challenges?.killParticipation ?? 0.0,
      largestMultiKill: p.largestMultiKill,
      cs: p.totalMinionsKilled + p.neutralMinionsKilled,
      totalDamageToChampions: p.totalDamageDealtToChampions,
      totalDamageToObjectives: p.damageDealtToObjectives,
      totalDamageShieldedOnTeammates: p.totalDamageShieldedOnTeammates,
      totalHealsOnTeammates: p.totalHealsOnTeammates,
      timeCCingOthers: p.timeCCingOthers,
      objectivesStolen: p.objectivesStolen,
      gold: p.goldEarned,
      visionScore: p.visionScore,
      items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6],
      roleQuestItem: p.roleBoundItem,
    }));
  }
}

module.exports = MatchDto;
