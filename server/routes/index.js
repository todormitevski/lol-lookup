const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_KEY = process.env.API_KEY;

const {
  ACCOUNT_V1,
  SUMMONER_V4,
  LEAGUE_V4,
  MATCH_V5_MATCHES,
  MATCH_V5_MATCH,
  CHAMPION_MASTERY_V4,
} = require("../config/constants");
const {
  getAccountV1ClusterValue,
  getMatchV5ClusterValue,
  getRegionValue,
} = require("../config/regions");

router.get("/rank/:region/:puuid", async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const regionValue = getRegionValue(region);

    const responseLeagueV4 = await needle(
      "get",
      `${LEAGUE_V4(regionValue)}/${puuid}`,
      { headers: { "X-Riot-Token": API_KEY } }
    );

    const dataLeagueV4 = responseLeagueV4.body;

    if (!dataLeagueV4 || dataLeagueV4.length === 0) {
      return res.status(200).json({
        soloDuo: null,
        flex: null,
      });
    }

    const soloDuoData = dataLeagueV4.find(
      (queue) => queue.queueType === "RANKED_SOLO_5x5"
    );
    const flexData = dataLeagueV4.find(
      (queue) => queue.queueType === "RANKED_FLEX_SR"
    );

    const summonerRankData = {
      soloDuo: soloDuoData
        ? {
            rank: soloDuoData.tier,
            division: soloDuoData.rank,
            wins: soloDuoData.wins,
            losses: soloDuoData.losses,
            lp: soloDuoData.leaguePoints,
          }
        : null,
      flex: flexData
        ? {
            rank: flexData.tier,
            division: flexData.rank,
            wins: flexData.wins,
            losses: flexData.losses,
            lp: flexData.leaguePoints,
          }
        : null,
    };

    res.status(200).json(summonerRankData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/matches/:region/:puuid", async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const clusterValue = getMatchV5ClusterValue(region);

    const responseMatchV5Matches = await needle(
      "get",
      MATCH_V5_MATCHES(clusterValue, puuid),
      {
        headers: { "X-Riot-Token": API_KEY },
      }
    );

    const dataMatchV5Matches = responseMatchV5Matches.body;

    res.status(200).json(dataMatchV5Matches);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/match/:region/:matchId", async (req, res) => {
  try {
    const { region, matchId } = req.params;

    const clusterValue = getMatchV5ClusterValue(region);

    const responseMatchV5Match = await needle(
      "get",
      `${MATCH_V5_MATCH(clusterValue)}/${matchId}`,
      { headers: { "X-Riot-Token": API_KEY } }
    );

    const dataMatchV5Match = responseMatchV5Match.body;
    const info = dataMatchV5Match.info;

    const matchData = {
      gameMode: info.gameMode,
      startTimestamp: info.gameCreation,
      duration: info.gameDuration,
      win: info.teams[0].win,
      participants: info.participants.map((p) => ({
        puuid: p.puuid,
        gameName: p.riotIdGameName,
        tagLine: p.riotIdTagLine,
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
        cs: p.totalMinionsKilled + p.neutralMinionsKilled,
        totalDamageToChampions: p.totalDamageDealtToChampions,
        gold: p.goldEarned,
        visionScore: p.visionScore,
        items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6],
      })),
    };

    res.status(200).json(matchData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/main-champion/:region/:puuid", async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const regionValue = getRegionValue(region);

    const responseChampionMasteryV4 = await needle(
      "get",
      CHAMPION_MASTERY_V4(regionValue, puuid),
      {
        headers: { "X-Riot-Token": API_KEY },
      }
    );

    const bodyChampionMasteryV4 = responseChampionMasteryV4.body;

    const mainChampionId = bodyChampionMasteryV4[0].championId;

    res.status(200).json({ mainChampionId });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:region/:gameName/:tagLine", async (req, res) => {
  try {
    const { region, gameName, tagLine } = req.params;
    const encodedGameName = encodeURIComponent(gameName);
    const encodedTagLine = encodeURIComponent(tagLine);

    const clusterValue = getAccountV1ClusterValue(region);
    const regionValue = getRegionValue(region);

    const responseAccountV1 = await needle(
      "get",
      `${ACCOUNT_V1(clusterValue)}/${encodedGameName}/${encodedTagLine}`,
      {
        headers: { "X-Riot-Token": API_KEY },
      }
    );

    if (responseAccountV1.statusCode === 404) {
      return res.status(404).json({
        error: "Summoner does not exist",
        message: `No results found for summoner with id ${gameName}#${tagLine}`,
      });
    }

    const dataAccountV1 = responseAccountV1.body;

    const responseSummonerV4 = await needle(
      "get",
      `${SUMMONER_V4(regionValue)}/${dataAccountV1.puuid}`,
      { headers: { "X-Riot-Token": API_KEY } }
    );

    if (responseSummonerV4.statusCode === 404) {
      return res.status(404).json({
        error: "Summoner not found",
        message: `No results found for summoner with id ${gameName}#${tagLine} in region ${region.toUpperCase()}`,
      });
    }

    const dataSummonerV4 = responseSummonerV4.body;

    const summonerBaseData = {
      ...dataAccountV1,
      region: region,
      profileIconId: dataSummonerV4.profileIconId,
      summonerLevel: dataSummonerV4.summonerLevel,
    };

    res.status(200).json(summonerBaseData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
