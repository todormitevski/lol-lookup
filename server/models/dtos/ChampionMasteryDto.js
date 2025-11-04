class ChampionMasteryDto {
  constructor(championMasteryData) {
    if (!championMasteryData || championMasteryData.length === 0) {
      this.mainChampionId = null;
      return;
    }

    const championData = championMasteryData[0];

    this.mainChampionId = championData.championId;
  }
}

module.exports = ChampionMasteryDto;
