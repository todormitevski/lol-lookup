class SummonerDto {
  constructor(accountData, summonerData, region) {
    this.puuid = accountData.puuid;
    this.gameName = accountData.gameName;
    this.tagLine = accountData.tagLine;
    this.region = region;
    this.profileIconId = summonerData.profileIconId;
    this.summonerLevel = summonerData.summonerLevel;
  }
}

module.exports = SummonerDto;
