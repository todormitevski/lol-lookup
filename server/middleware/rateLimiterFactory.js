const { rateLimit } = require("express-rate-limit");

const createPerSecondLimiter = (skipFn) =>
  rateLimit({
    windowMs: 1000,
    limit: 18,
    keyGenerator: (req) => req.params.region,
    skip: skipFn,
    statusCode: 429,
    message: {
      error: "Too many requests",
      message: "Rate limit reached",
    },
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });

const createPerMinuteLimiter = (skipFn) =>
  rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 90,
    keyGenerator: (req) => req.params.region,
    skip: skipFn,
    statusCode: 429,
    message: {
      error: "Too many requests",
      message: "Rate limit reached, try again later",
    },
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });

module.exports = { createPerSecondLimiter, createPerMinuteLimiter };
