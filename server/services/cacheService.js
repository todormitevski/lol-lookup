const NodeCache = require("node-cache");

const summonerCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});

const rankCache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  useClones: false,
});

const matchIdsCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});

const matchCache = new NodeCache({
  stdTTL: 86400,
  checkperiod: 86400,
  useClones: false,
});

const mainChampionCache = new NodeCache({
  stdTTL: 86400,
  checkperiod: 86400,
  useClones: false,
});

function generateCacheKey(...parts) {
  return parts
    .map((p) => String(p).toLowerCase().replaceAll(/\s+/g, ""))
    .join(":");
}

function flushCache() {
  summonerCache.flushAll();
  rankCache.flushAll();
  matchIdsCache.flushAll();
  matchCache.flushAll();
  mainChampionCache.flushAll();
}

module.exports = {
  summonerCache,
  rankCache,
  matchIdsCache,
  matchCache,
  mainChampionCache,
  generateCacheKey,
  flushCache,
};
