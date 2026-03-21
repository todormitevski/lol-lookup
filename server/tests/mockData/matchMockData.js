const matchMockData = {
  metadata: {
    matchId: "EUN1_1",
  },
  info: {
    gameMode: "ARAM",
    gameCreation: 1762047678525,
    gameDuration: 1200,
    participants: [
      {
        puuid: "participant1puuid",
        riotIdGameName: "participant1",
        riotIdTagline: "EUNE",
        summonerLevel: 100,
        teamPosition: "",
        win: true,
        championId: 555,
        championName: "Pyke",
        champLevel: 18,
        summoner1Id: 1,
        summoner2Id: 2,
        perks: {
          styles: [
            {
              selections: [
                {
                  perk: 1,
                },
              ],
            },
            {
              style: 2,
            },
          ],
        },
        kills: 20,
        deaths: 0,
        assists: 0,
        challenges: {
          kda: 10,
          killParticipation: 1,
        },
        largestMultiKill: 5,
        totalMinionsKilled: 50,
        neutralMinionsKilled: 0,
        totalDamageDealtToChampions: 100000,
        goldEarned: 20000,
        visionScore: 0,
        item0: 1,
        item1: 2,
      },
    ],
  },
};

module.exports = matchMockData;
