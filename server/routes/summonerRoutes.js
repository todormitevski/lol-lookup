const express = require("express");
const router = express.Router();

const summonerController = require("../controllers/summonerController");

router.get("/rank/:region/:puuid", summonerController.getRank);
router.get("/matches/:region/:puuid", summonerController.getMatchIds);
router.get("/match/:region/:matchId", summonerController.getMatch);
router.get("/main-champion/:region/:puuid", summonerController.getMainChampion);
router.get("/:region/:gameName/:tagLine", summonerController.getSummoner);

module.exports = router;
