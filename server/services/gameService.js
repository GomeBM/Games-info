const axios = require("axios");
const { Game } = require("../models");
const { Op } = require("sequelize");

const RAWG_API = `${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}&page_size=40&dates=2000-01-01,2025-12-31`; // use env var ideally

function _GAME(game) {
  return {
    id: game.id,
    title: game.name,
    release_date: game.released,
    image: game.background_image,
    rating: game.rating,
    metacritic: game.metacritic,
    platforms: game.platforms?.map((p) => p.platform.name) || [],
    genres: game.genres?.map((g) => g.name) || [],
  };
}

exports.getAllGamesFromDB = async (params = {}) => {
  const where = {};
  const pagination = {
    limit: params.top ? parseInt(params.top) : 20,
    offset: params.skip ? parseInt(params.skip) : 0,
  };

  let order = [];
  if (params.sortBy) {
    const direction = params.sortDir === "desc" ? "DESC" : "ASC";
    const validFields = ["release_date", "rating", "metacritic"];
    if (validFields.includes(params.sortBy)) {
      order.push([params.sortBy, direction]);
    }
  } else {
    order.push(["rating", "DESC"]);
  }

  if (params.genre) {
    where.genres = {
      [Op.substring]: `"${params.genre}"`,
    };
  }

  if (params.platform) {
    where.platforms = {
      [Op.substring]: `"${params.platform}"`,
    };
  }

  const { count, rows } = await Game.findAndCountAll({
    where,
    limit: pagination.limit,
    offset: pagination.offset,
    order: order,
  });

  return {
    total: count,
    games: rows,
  };
};

exports.getAllGamesFromApi = async () => {
  let allGames = [];
  let url = RAWG_API;
  let requestCount = 0;

  console.log(`Started fetching from API at: ${new Date().toLocaleString()}`);

  while (url) {
    requestCount++;
    console.log(`Fetching page ${requestCount}: ${url}`);

    try {
      const res = await axios.get(url);
      const data = res.data;

      if (
        !data.results ||
        !Array.isArray(data.results) ||
        data.results.length === 0
      ) {
        console.warn("No more results or malformed data. Stopping.");
        break;
      }

      allGames = allGames.concat(data.results);

      if (data.next && typeof data.next === "string") {
        url = data.next;
      } else {
        break;
      }
    } catch (error) {
      console.error(
        `Failed to fetch page ${requestCount}:`,
        error.response?.data || error.message
      );
      break;
    }
  }

  console.log(`Fetched ${allGames.length} games`);
  console.log(`Finished fetching at: ${new Date().toLocaleString()}`);
  return allGames.map((game) => _GAME(game));
};

exports.getGameById = async (id) => {
  return await Game.findByPk(id);
};

exports.saveGamesToDB = async (games) => {
  for (const game of games) {
    await Game.upsert(game);
  }
};

exports.getGameByTitle = async (title) => {
  return await Game.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
    order: [["metacritic", "DESC"]],
    limit: 20,
  });
};

exports.getGameDetailsFromApi = async (gameId) => {
  try {
    const url = `${process.env.API_BASE_URL}/games/${gameId}?key=${process.env.API_KEY}`;
    console.log(`Fetching details for game ID ${gameId}`);
    const response = await axios.get(url);

    const gameDetails = {
      id: gameId,
      description: response.data.description_raw,
      esrb_rating: response.data.esrb_rating?.name || null,
    };

    return gameDetails;
  } catch (error) {
    console.error(
      `Failed to fetch details for game ID ${gameId}:`,
      error.response?.data?.error || error.message
    );
    return null;
  }
};

exports.updateGameWithDetails = async (gameDetails) => {
  if (!gameDetails) return false;

  try {
    const game = await Game.findByPk(gameDetails.id);
    if (!game) {
      console.warn(`Game ID ${gameDetails.id} not found in database`);
      return false;
    }

    await game.update({
      description: gameDetails.description,
      esrb_rating: gameDetails.esrb_rating,
    });

    return true;
  } catch (error) {
    console.error(`Failed to update game ID ${gameDetails.id}:`, error);
    return false;
  }
};

exports.getGenreImages = async () => {
  const genreList = [
    "Casual",
    "Indie",
    "Adventure",
    "Action",
    "Arcade",
    "Strategy",
    "RPG",
    "Puzzle",
    "Shooter",
    "Racing",
    "Sports",
    "Platformer",
    "Fighting",
    "Simulation",
    "Massively Multiplayer",
    "Family",
    "Board Games",
    "Card",
    "Educational",
  ];

  const results = [];
  const foundImages = [];

  for (const genreName of genreList) {
    const games = await Game.findAll({
      where: {
        genres: {
          [Op.substring]: `"${genreName}"`,
        },
      },
      order: [["rating", "DESC"]],
      limit: 1,
    });

    if (games.length > 0 && games[0].image) {
      const imgSrc = games[0].image;
      results.push({
        name: genreName,
        imgSrc: imgSrc,
      });

      if (imgSrc) {
        foundImages.push(imgSrc);
      }
    } else {
      results.push({
        name: genreName,
        imgSrc: null,
      });
    }
  }

  if (foundImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * foundImages.length);
    results.push({
      name: "All",
      imgSrc: foundImages[randomIndex],
    });
  } else {
    results.push({
      name: "All",
      imgSrc: null,
    });
  }

  return results;
};
