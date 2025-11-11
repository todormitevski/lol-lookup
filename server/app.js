const express = require("express");
const cors = require("cors");
const {
  perSecondLimiter,
  perMinuteLimiter,
} = require("./middleware/rateLimiter");
const summonerRoutes = require("./routes/summonerRoutes");

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? ["http://localhost:3000"]
      : ["https://lol-lookup.vercel.app"],
  methods: ["GET"],
};

app.use(cors(corsOptions));
app.use("/api", perSecondLimiter);
app.use("/api", perMinuteLimiter);
app.use("/api/summoner", summonerRoutes);

module.exports = app;
