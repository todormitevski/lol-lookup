const { generateCacheKey } = require("../../services/cacheService");

describe("Testing caching service", () => {
  describe("Testing cache key generation function", () => {
    it("should generate an all-lowercase, no whitespace, colon-joined string", () => {
      const cacheKey = generateCacheKey("kr", "Hide on bush", "KR1");

      expect(typeof cacheKey).toBe("string");
      expect(cacheKey).toBe("kr:hideonbush:kr1");
    });
  });
});
