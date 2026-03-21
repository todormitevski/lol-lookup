const express = require("express");
const router = express.Router();

const {
  createPerSecondLimiter,
  createPerMinuteLimiter,
} = require("../middleware/rateLimiterFactory");

const {
  generateCacheKey,
  summonerCache,
  rankCache,
  matchIdsCache,
  matchCache,
  mainChampionCache,
} = require("../services/cacheService");

const summonerController = require("../controllers/summonerController");

function skipFn(req) {
  const { region, gameName, tagLine, puuid, matchId } = req.params;
  const path = req.path;

  if (path.startsWith("/rank/")) {
    return rankCache.has(generateCacheKey(region, puuid));
  }

  if (path.startsWith("/matches/")) {
    return matchIdsCache.has(generateCacheKey(region, puuid));
  }

  if (path.startsWith("/match/")) {
    return matchCache.has(generateCacheKey(region, matchId));
  }

  if (path.startsWith("/main-champion/")) {
    return mainChampionCache.has(generateCacheKey(region, puuid));
  }

  return summonerCache.has(generateCacheKey(region, gameName, tagLine));
}

const perSecondRateLimiter = createPerSecondLimiter(skipFn);
const perMinuteRateLimiter = createPerMinuteLimiter(skipFn);

const useRateLimit = [perSecondRateLimiter, perMinuteRateLimiter];

router.get(
  "/rank/:region/:puuid",
  useRateLimit,
  summonerController.getRank
);
router.get(
  "/matches/:region/:puuid",
  useRateLimit,
  summonerController.getMatchIds,
);
router.get(
  "/match/:region/:matchId",
  useRateLimit,
  summonerController.getMatch,
);
router.get(
  "/main-champion/:region/:puuid",
  useRateLimit,
  summonerController.getMainChampion,
);
router.get(
  "/:region/:gameName/:tagLine",
  useRateLimit,
  summonerController.getSummoner,
);

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
