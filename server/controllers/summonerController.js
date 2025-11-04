const riotApiService = require("../services/riotApiService");

const SummonerDto = require("../models/dtos/SummonerDto");
const RankDto = require("../models/dtos/RankDto");
const MatchDto = require("../models/dtos/MatchDto");
const ChampionMasteryDto = require("../models/dtos/ChampionMasteryDto");

exports.getSummoner = async (req, res) => {
  try {
    const { region, gameName, tagLine } = req.params;

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

    if (summonerResponse.statusCode === 404) {
      return res.status(404).json({
        error: "Summoner not found in region",
        message: `No results found for summoner with id ${gameName}#${tagLine} in region ${region.toUpperCase()}`,
      });
    }

    const summonerDto = new SummonerDto(
      accountResponse.data,
      summonerResponse.data,
      region
    );

    res.status(200).json(summonerDto);
  } catch (error) {
    console.log("Error in getSummoner: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getRank = async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const rankResponse = await riotApiService.getRankByPuuid(region, puuid);

    const rankDto = new RankDto(rankResponse);

    res.status(200).json(rankDto);
  } catch (error) {
    console.log("Error in getRank: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getMatchIds = async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const matchIdsResponse = await riotApiService.getMatchIdsByPuuid(
      region,
      puuid
    );

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

    const matchResponse = await riotApiService.getMatchById(region, matchId);

    const matchDto = new MatchDto(matchResponse);

    res.status(200).json(matchDto);
  } catch (error) {
    console.log("Error in getMatch: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getMainChampion = async (req, res) => {
  try {
    const { region, puuid } = req.params;

    const championMasteryResponse =
      await riotApiService.getChampionMasteryByPuuid(region, puuid);

    const championMasteryDto = new ChampionMasteryDto(championMasteryResponse);

    res.status(200).json(championMasteryDto);
  } catch (error) {
    console.log("Error in getMainChampion: ", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
