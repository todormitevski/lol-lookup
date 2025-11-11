const validAccountMockData = {
  statusCode: 200,
  data: {
    puuid: "fakeraccountpuuid",
    gameName: "Hide on bush",
    tagLine: "KR1",
  },
};

const validSummonerMockData = {
  statusCode: 200,
  data: {
    profileIconId: 1,
    summonerLevel: 1000,
  },
};

const invalidRegionAccountMockData = {
  statusCode: 200,
  data: {
    puuid: "existentaccountpuuid",
    gameName: "ExistentSummoner",
    tagLine: "EUNE",
  },
};

module.exports = {
  validAccountMockData,
  validSummonerMockData,
  invalidRegionAccountMockData,
};
