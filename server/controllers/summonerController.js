const riotApiService = require("../services/riotApiService");

const SummonerDto = require("../models/dtos/SummonerDto");
const RankDto = require("../models/dtos/RankDto");
const MatchDto = require("../models/dtos/MatchDto");
const ChampionMasteryDto = require("../models/dtos/ChampionMasteryDto");

const {
  generateCacheKey,
  summonerCache,
  rankCache,
  matchIdsCache,
  matchCache,
  mainChampionCache,
} = require("../services/cacheService");

const { getRegionValue } = require("../config/regions");

exports.getSummoner = async (req, res) => {
  try {
    const { region, gameName, tagLine } = req.params;

    const cacheKey = generateCacheKey(region, gameName, tagLine);

    if (summonerCache.has(cacheKey)) {
      const cachedValue = summonerCache.get(cacheKey);
      return res.status(200).json(cachedValue);
    }

    const accountResponse = await riotApiService.getAccountByRiotId(
      region,
      gameName,
      tagLine
    );

    if (accountResponse.statusCode === 404) {
      return res.status(404).json({
        error: "Summoner does not exist",
        message: `No results found for summoner with id ${gameName}#${tagLine}`,
      });
    }

    const summonerResponse = await riotApiService.getSummonerByPuuid(
      region,
      accountResponse.data.puuid
    );

    const regionValue = getRegionValue(region);

    if (summonerResponse.statusCode === 404) {
      return res.status(404).json({
        error: "Summoner not found in region",
        message: `No results found for summoner with id ${gameName}#${tagLine} in region ${regionValue.toUpperCase()}`,
      });
    }

    const summonerDto = new SummonerDto(
      accountResponse.data,
      summonerResponse.data,
      regionValue
    );

    summonerCache.set(cacheKey, summonerDto);

    res.status(200).json(summonerDto);
  } catch (error) {
    console.log("Error in getSummoner: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getRank = async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const cacheKey = generateCacheKey(region, puuid);

    if (rankCache.has(cacheKey)) {
      const cachedValue = rankCache.get(cacheKey);
      return res.status(200).json(cachedValue);
    }

    const rankResponse = await riotApiService.getRankByPuuid(region, puuid);

    const rankDto = new RankDto(rankResponse);

    rankCache.set(cacheKey, rankDto);

    res.status(200).json(rankDto);
  } catch (error) {
    console.log("Error in getRank: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getMatchIds = async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const cacheKey = generateCacheKey(region, puuid);

    if (matchIdsCache.has(cacheKey)) {
      const cachedValue = matchIdsCache.get(cacheKey);
      return res.status(200).json(cachedValue);
    }

    const matchIdsResponse = await riotApiService.getMatchIdsByPuuid(
      region,
      puuid
    );

    matchIdsCache.set(cacheKey, {
      matchIds: matchIdsResponse,
      count: matchIdsResponse.length,
    });

    res
      .status(200)
      .json({ matchIds: matchIdsResponse, count: matchIdsResponse.length });
  } catch (error) {
    console.log("Error in getMatchIds: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getMatch = async (req, res) => {
  try {
    const { region, matchId } = req.params;

    const cacheKey = generateCacheKey(region, matchId);

    if (matchCache.has(cacheKey)) {
      const cachedValue = matchCache.get(cacheKey);
      return res.status(200).json(cachedValue);
    }

    const matchResponse = await riotApiService.getMatchById(region, matchId);

    const matchDto = new MatchDto(matchResponse);

    matchCache.set(cacheKey, matchDto);

    res.status(200).json(matchDto);
  } catch (error) {
    console.log("Error in getMatch: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getMainChampion = async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const cacheKey = generateCacheKey(region, puuid);

    if (mainChampionCache.has(cacheKey)) {
      const cachedValue = mainChampionCache.get(cacheKey);
      return res.status(200).json(cachedValue);
    }

    const championMasteryResponse =
      await riotApiService.getChampionMasteryByPuuid(region, puuid);

    const championMasteryDto = new ChampionMasteryDto(championMasteryResponse);

    mainChampionCache.set(cacheKey, championMasteryDto);

    res.status(200).json(championMasteryDto);
  } catch (error) {
    console.log("Error in getMainChampion: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
