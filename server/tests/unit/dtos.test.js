const ChampionMasteryDto = require("../../models/dtos/ChampionMasteryDto");
const MatchDto = require("../../models/dtos/MatchDto");
const RankDto = require("../../models/dtos/RankDto");
const SummonerDto = require("../../models/dtos/SummonerDto");

const mockDataBarrel = require("../mockData/index");

describe("Testing Dtos", () => {
  describe("Testing SummonerDto", () => {
    it("should have all properties", () => {
      const summonerDto = new SummonerDto(
        mockDataBarrel.validAccountMockData.data,
        mockDataBarrel.validSummonerMockData.data,
        "kr"
      );

      expect(summonerDto).toHaveProperty("puuid", "fakeraccountpuuid");
      expect(summonerDto).toHaveProperty("gameName", "Hide on bush");
      expect(summonerDto).toHaveProperty("tagLine", "KR1");
      expect(summonerDto).toHaveProperty("region", "kr");
      expect(summonerDto).toHaveProperty("profileIconId", 1);
      expect(summonerDto).toHaveProperty("summonerLevel", 1000);
    });
  });

  describe("Testing RankDto", () => {
    it("should have all properties for solo and flex queues", () => {
      const rankDto = new RankDto(mockDataBarrel.rankMockData);

      expect(rankDto.soloDuo).toEqual(mockDataBarrel.mappedSoloDuoRankMockData);
      expect(rankDto.flex).toEqual(mockDataBarrel.mappedFlexRankMockData);
    });

    it("should have null properties for both queues when no rank data is present", () => {
      const rankDto = new RankDto([]);

      expect(rankDto.soloDuo).toBeNull();
      expect(rankDto.flex).toBeNull;
    });

    it("should have null properties for unknown queue types", () => {
      const rankDto = new RankDto(mockDataBarrel.unknownQueueRankMockData);

      expect(rankDto.soloDuo).toBeNull();
      expect(rankDto.flex).toBeNull();
    });
  });

  describe("Testing MatchDto", () => {
    it("should have all properties", () => {
      const matchDto = new MatchDto(mockDataBarrel.matchMockData);

      expect(matchDto).toHaveProperty("gameMode", "ARAM");
      expect(matchDto).toHaveProperty("startTimestamp");
      expect(typeof matchDto.startTimestamp).toBe("number");
      expect(matchDto).toHaveProperty("duration");
      expect(typeof matchDto.duration).toBe("number");
      expect(matchDto).toHaveProperty("participants");
      expect(matchDto.participants).toHaveLength(1);
    });

    it("should map participant properties correctly", () => {
      const matchDto = new MatchDto(mockDataBarrel.matchMockData);
      const participant = matchDto.participants[0];

      expect(participant).toHaveProperty("puuid");
      expect(participant).toHaveProperty("gameName");
      expect(participant).toHaveProperty("tagLine");
      expect(participant).toHaveProperty("position");
      expect(participant).toHaveProperty("items");
      expect(participant.items).toHaveLength(7);
    });
  });

  describe("Testing ChampionMasteryDto", () => {
    it("should have the mainChampionId property", () => {
      const championMasteryDto = new ChampionMasteryDto(
        mockDataBarrel.mainChampionMockData
      );

      expect(championMasteryDto).toHaveProperty("mainChampionId");
      expect(typeof championMasteryDto.mainChampionId).toBe("number");
    });
  });
});
