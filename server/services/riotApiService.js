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

exports.getAccountByRiotId = async (region, gameName, tagLine) => {
  const encodedGameName = encodeURIComponent(gameName);
  const encodedTagLine = encodeURIComponent(tagLine);

  const clusterValue = getAccountV1ClusterValue(region);

  const response = await needle(
    "get",
    ACCOUNT_V1(clusterValue, encodedGameName, encodedTagLine),
    { headers: { "X-Riot-Token": API_KEY } }
  );

  return {
    statusCode: response.statusCode,
    data: response.body,
  };
};

exports.getSummonerByPuuid = async (region, puuid) => {
  const regionValue = getRegionValue(region);

  const response = await needle("get", SUMMONER_V4(regionValue, puuid), {
    headers: { "X-Riot-Token": API_KEY },
  });

  return {
    statusCode: response.statusCode,
    data: response.body,
  };
};

exports.getRankByPuuid = async (region, puuid) => {
  const regionValue = getRegionValue(region);

  const response = await needle("get", LEAGUE_V4(regionValue, puuid), {
    headers: { "X-Riot-Token": API_KEY },
  });

  return response.body || [];
};

exports.getMatchIdsByPuuid = async (region, puuid) => {
  const clusterValue = getMatchV5ClusterValue(region);

  const response = await needle("get", MATCH_V5_MATCHES(clusterValue, puuid), {
    headers: { "X-Riot-Token": API_KEY },
  });

  return response.body || [];
};

exports.getMatchById = async (region, matchId) => {
  const clusterValue = getMatchV5ClusterValue(region);

  const response = await needle("get", MATCH_V5_MATCH(clusterValue, matchId), {
    headers: { "X-Riot-Token": API_KEY },
  });

  return response.body;
};

exports.getChampionMasteryByPuuid = async (region, puuid) => {
  const regionValue = getRegionValue(region);

  const response = await needle(
    "get",
    CHAMPION_MASTERY_V4(regionValue, puuid),
    { headers: { "X-Riot-Token": API_KEY } }
  );

  return response.body;
};
