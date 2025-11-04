const express = require("express");
const cors = require("cors");
const summonerRoutes = require("./routes/summonerRoutes");

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:3000"]
        : ["https://lol-lookup.vercel.app"],
    methods: ["GET"],
  })
);
app.use("/api/summoner", summonerRoutes);

module.exports = app;
