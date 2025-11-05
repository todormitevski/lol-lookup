const express = require("express");
const router = express.Router();

const {
  summonerCache,
  rankCache,
  matchIdsCache,
  matchCache,
  mainChampionCache,
} = require("../services/cacheService");

const summonerController = require("../controllers/summonerController");

router.get("/rank/:region/:puuid", summonerController.getRank);
router.get("/matches/:region/:puuid", summonerController.getMatchIds);
router.get("/match/:region/:matchId", summonerController.getMatch);
router.get("/main-champion/:region/:puuid", summonerController.getMainChampion);
router.get("/:region/:gameName/:tagLine", summonerController.getSummoner);

router.get("/cache", (_, res) => {
  res.json({
    summoner: summonerCache.getStats(),
    rank: rankCache.getStats(),
    matchIds: matchIdsCache.getStats(),
    match: matchCache.getStats(),
    mainChampion: mainChampionCache.getStats(),
  });
});

module.exports = router;
