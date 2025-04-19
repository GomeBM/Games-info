const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gamesController.js");

router.post("/", gameController.getAllGames);
router.get("/genres/images", gameController.getGenreImages);
router.get("/:id", gameController.getGameById);
router.get("/title/:title", gameController.getGameByTitle);

module.exports = router;
