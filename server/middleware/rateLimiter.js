const { rateLimit } = require("express-rate-limit");

const perSecondLimiter = rateLimit({
  windowMs: 1000,
  limit: 20,
  statusCode: 429,
  message: {
    error: "Too many requests",
    message: "Rate limit reached",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const perMinuteLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 90,
  statusCode: 429,
  message: {
    error: "Too many requests",
    message: "Rate limit reached, try again later",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

module.exports = { perSecondLimiter, perMinuteLimiter };
