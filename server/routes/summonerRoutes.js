const express = require("express");
const router = express.Router();

const cacheService = require("../services/cacheService");

const summonerController = require("../controllers/summonerController");

router.get("/rank/:region/:puuid", summonerController.getRank);
router.get("/matches/:region/:puuid", summonerController.getMatchIds);
router.get("/match/:region/:matchId", summonerController.getMatch);
router.get("/main-champion/:region/:puuid", summonerController.getMainChampion);
router.get("/:region/:gameName/:tagLine", summonerController.getSummoner);

router.get("/cache", (_, res) => {
  res.json({
    summoner: cacheService.summonerCache.getStats(),
    rank: cacheService.rankCache.getStats(),
    matchIds: cacheService.matchIdsCache.getStats(),
    match: cacheService.matchCache.getStats(),
    mainChampion: cacheService.mainChampionCache.getStats(),
  });
});

module.exports = router;
