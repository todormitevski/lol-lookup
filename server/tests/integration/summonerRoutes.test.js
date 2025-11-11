const request = require("supertest");
const app = require("../../app");

jest.mock("../../services/riotApiService");
const riotApiService = require("../../services/riotApiService");

const { flushCache } = require("../../services/cacheService");

const mockDataBarrel = require("../mockData/index");

describe("Testing Summoner API Endpoints", () => {
  beforeEach(() => {
    flushCache();
  });

  describe("GET /api/summoner/:region/:gameName/:tagLine", () => {
    it("should return base summoner data for valid riot id", async () => {
      riotApiService.getAccountByRiotId.mockResolvedValue(
        mockDataBarrel.validAccountMockData
      );

      riotApiService.getSummonerByPuuid.mockResolvedValue(
        mockDataBarrel.validSummonerMockData
      );

      const response = await request(app)
        .get("/api/summoner/kr/Hide on bush/KR1")
        .expect(200);

      expect(response.body).toHaveProperty("puuid", "fakeraccountpuuid");
      expect(response.body).toHaveProperty("gameName", "Hide on bush");
      expect(response.body).toHaveProperty("tagLine", "KR1");
      expect(response.body).toHaveProperty("region", "kr");
      expect(response.body).toHaveProperty("profileIconId", 1);
      expect(response.body).toHaveProperty("summonerLevel", 1000);
    });

    it("should return 404 for invalid riot id", async () => {
      riotApiService.getAccountByRiotId.mockResolvedValue({
        statusCode: 404,
        data: null,
      });

      const response = await request(app)
        .get("/api/summoner/eun/NonexistentSummoner/EUNE")
        .expect(404);

      expect(response.body).toHaveProperty("error", "Summoner does not exist");
      expect(response.body.message).toContain("No results found");
    });

    it("should return 404 for invalid summoner for region", async () => {
      riotApiService.getAccountByRiotId.mockResolvedValue(
        mockDataBarrel.invalidRegionAccountMockData
      );

      riotApiService.getSummonerByPuuid.mockResolvedValue({
        statusCode: 404,
        data: null,
      });

      const response = await request(app)
        .get("/api/summoner/euw/ExistentSummoner/EUNE")
        .expect(404);

      expect(response.body).toHaveProperty(
        "error",
        "Summoner not found in region"
      );
      expect(response.body.message).toContain("in region EUW1");
    });

    it("should return 500 when api service fails", async () => {
      riotApiService.getAccountByRiotId.mockRejectedValue(
        new Error("Network error")
      );

      const response = await request(app)
        .get("/api/summoner/kr/Hide on bush/KR1")
        .expect(500);

      expect(response.body).toHaveProperty("error", "Server error");
      expect(response.body).toHaveProperty("message", "Network error");
    });
  });

  describe("GET /api/summoner/rank/:region/:puuid", () => {
    it("should return rank data for valid puuid", async () => {
      riotApiService.getRankByPuuid.mockResolvedValue(
        mockDataBarrel.rankMockData
      );

      const response = await request(app)
        .get("/api/summoner/rank/kr/fakeraccountpuuid")
        .expect(200);

      expect(response.body).toHaveProperty("soloDuo");
      expect(response.body).toHaveProperty("flex");

      expect(response.body.soloDuo && response.body.flex).toHaveProperty(
        "rank"
      );
      expect(response.body.soloDuo && response.body.flex).toHaveProperty(
        "division"
      );
      expect(response.body.soloDuo && response.body.flex).toHaveProperty(
        "wins"
      );
      expect(response.body.soloDuo && response.body.flex).toHaveProperty(
        "losses"
      );
      expect(response.body.soloDuo && response.body.flex).toHaveProperty("lp");

      expect(typeof response.body.soloDuo.rank).toBe("string");
      expect(typeof response.body.soloDuo.division).toBe("string");
      expect(typeof response.body.soloDuo.wins).toBe("number");
      expect(typeof response.body.soloDuo.losses).toBe("number");
      expect(typeof response.body.soloDuo.lp).toBe("number");
    });

    it("should return null for each queue when no rank data is present", async () => {
      riotApiService.getRankByPuuid.mockResolvedValue([]);

      const response = await request(app)
        .get("/api/summoner/rank/kr/fakeraccountpuuid")
        .expect(200);

      expect(response.body).toHaveProperty("soloDuo");
      expect(response.body).toHaveProperty("flex");

      expect(response.body.soloDuo).toBeNull();
      expect(response.body.flex).toBeNull();
    });
  });

  describe("GET /api/summoner/matches/:region/:puuid", () => {
    it("should return match ids for valid puuid", async () => {
      riotApiService.getMatchIdsByPuuid.mockResolvedValue(
        mockDataBarrel.matchIdsMockData
      );

      const response = await request(app)
        .get("/api/summoner/matches/eun/activesummonerpuuid")
        .expect(200);

      expect(response.body).toHaveProperty("matchIds");
      expect(response.body).toHaveProperty("count");

      expect(response.body.matchIds).toHaveLength(5);
      expect(typeof response.body.matchIds[0]).toBe("string");
      expect(response.body.count).toBe(5);
    });

    it("should return empty array when no matches are found", async () => {
      riotApiService.getMatchIdsByPuuid.mockResolvedValue([]);

      const response = await request(app)
        .get("/api/summoner/matches/eun/inactivesummonerpuuid")
        .expect(200);

      expect(response.body).toHaveProperty("matchIds");
      expect(response.body).toHaveProperty("count");

      expect(response.body.matchIds).toHaveLength(0);
      expect(response.body.count).toBe(0);
    });
  });

  describe("GET /api/summoner/match/:region/:matchId", () => {
    it("should return match data for valid match id", async () => {
      riotApiService.getMatchById.mockResolvedValue(
        mockDataBarrel.matchMockData
      );

      const response = await request(app)
        .get("/api/summoner/match/eun/EUN1_1")
        .expect(200);

      expect(response.body).toHaveProperty("gameMode", "ARAM");
      expect(response.body).toHaveProperty("duration");
      expect(typeof response.body.duration).toBe("number");
      expect(response.body).toHaveProperty("participants");
      expect(response.body.participants).toHaveLength(1);

      const participant = response.body.participants[0];
      expect(participant).toHaveProperty("puuid", "participant1puuid");
      expect(participant).toHaveProperty("champion");
      expect(participant.champion).toHaveProperty("name", "Pyke");
      expect(participant).toHaveProperty("kda");
      expect(participant.kda).toHaveProperty("kills", 20);
      expect(participant).toHaveProperty("items");
      expect(participant.items).toHaveLength(7);
    });
  });

  describe("GET /main-champion/:region/:puuid", () => {
    it("should return main champion id for valid puuid", async () => {
      riotApiService.getChampionMasteryByPuuid.mockResolvedValue(
        mockDataBarrel.mainChampionMockData
      );

      const response = await request(app)
        .get("/api/summoner/main-champion/eun/summonerpuuid")
        .expect(200);

      expect(response.body).toHaveProperty("mainChampionId", 555);
    });

    it("should be null when no champion mastery data is found", async () => {
      riotApiService.getChampionMasteryByPuuid.mockResolvedValue([]);

      const response = await request(app)
        .get("/api/summoner/main-champion/eun/summonerpuuid")
        .expect(200);

      expect(response.body).toHaveProperty("mainChampionId", null);
    });
  });

  describe("GET /api/summoner/cache", () => {
    it("should return cache stats", async () => {
      const response = await request(app)
        .get("/api/summoner/cache")
        .expect(200);

      expect(response.body).toHaveProperty("summoner");
      expect(response.body).toHaveProperty("rank");
      expect(response.body).toHaveProperty("matchIds");
      expect(response.body).toHaveProperty("match");
      expect(response.body).toHaveProperty("mainChampion");
    });

    it("should return valid cache stats structure", async () => {
      const response = await request(app)
        .get("/api/summoner/cache")
        .expect(200);

      expect(response.body.summoner).toHaveProperty("hits");
      expect(response.body.summoner).toHaveProperty("misses");
      expect(response.body.summoner).toHaveProperty("keys");
      expect(response.body.summoner).toHaveProperty("ksize");
      expect(response.body.summoner).toHaveProperty("vsize");

      expect(typeof response.body.summoner.hits).toBe("number");
      expect(typeof response.body.summoner.misses).toBe("number");
      expect(typeof response.body.summoner.keys).toBe("number");
      expect(typeof response.body.summoner.ksize).toBe("number");
      expect(typeof response.body.summoner.vsize).toBe("number");
    });
  });
});
