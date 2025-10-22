const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_KEY = process.env.API_KEY;
const BASE_URL_ACCOUNT_V1 = process.env.BASE_URL_ACCOUNT_V1;
const BASE_URL_SUMMONER_V4 = process.env.BASE_URL_SUMMONER_V4;

// data I need:
// 1. summoner name, tagline, level
// 2. past ranks, current rank in solo and flex queues
// 3. match history list
// 4. live game data

router.get("/:region/:gameName/:tagLine", async (req, res) => {
  try {
    const { region, gameName, tagLine } = req.params;

    const responseAccountV1 = await needle(
      "get",
      `${BASE_URL_ACCOUNT_V1}/${gameName}/${tagLine}`,
      {
        headers: { "X-Riot-Token": API_KEY },
      }
    );

    const { puuid, ...restOfDataAccountV1 } = responseAccountV1.body;

    const responseSummonerV4 = await needle(
      "get",
      `https://${region}${BASE_URL_SUMMONER_V4}/${puuid}`,
      { headers: { "X-Riot-Token": API_KEY } }
    );

    const dataSummonerV4 = responseSummonerV4.body;

    const baseSummonerData = {
      ...restOfDataAccountV1,
      profileIconId: dataSummonerV4.profileIconId,
      summonerLevel: dataSummonerV4.summonerLevel,
    };

    res.status(200).send(baseSummonerData);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
