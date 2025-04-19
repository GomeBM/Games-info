const gameService = require("../services/gameService");

exports.getAllGames = async (req, res) => {
  try {
    const filters = req.body || {};
    const { total, games } = await gameService.getAllGamesFromDB(filters);

    const currentPage = filters.skip
      ? Math.floor(filters.skip / filters.top) + 1
      : 1;
    const pageSize = filters.top || 20;
    const totalPages = Math.ceil(total / pageSize);

    res.status(200).json({
      total,
      count: games.length,
      games,
      pagination: {
        currentPage,
        pageSize,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await gameService.getGameById(parseInt(req.params.id));
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getGameByTitle = async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title);
    console.log("Searching for game with title:", title);
    const game = await gameService.getGameByTitle(title);

    if (!game || game.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game by title:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getGenreImages = async (req, res) => {
  try {
    const genreImages = await gameService.getGenreImages();
    res.status(200).json(genreImages);
  } catch (error) {
    console.error("Error fetching genre images:", error);
    res.status(500).json({ message: "Server error" });
  }
};
