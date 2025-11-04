const RIOT_API_URLS = {
  ACCOUNT_V1: (nearestCluster, gameName, tagLine) =>
    `https://${nearestCluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
  SUMMONER_V4: (region, puuid) =>
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  LEAGUE_V4: (region, puuid) =>
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
  MATCH_V5_MATCHES: (nearestCluster, puuid) =>
    `https://${nearestCluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=100`,
  MATCH_V5_MATCH: (nearestCluster, matchId) =>
    `https://${nearestCluster}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
  CHAMPION_MASTERY_V4: (region, puuid) =>
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=1`,
};

module.exports = RIOT_API_URLS;
