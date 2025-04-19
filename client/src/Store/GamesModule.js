import axios from "axios";
const gamesModule = {
  namespaced: true,

  state: () => ({
    games: [],
    selectedGame: null,
    pagination: null,
    allGenres: [
      { name: "All", imgSrc: null },
      { name: "Casual", imgSrc: null },
      { name: "Indie", imgSrc: null },
      { name: "Adventure", imgSrc: null },
      { name: "Action", imgSrc: null },
      { name: "Arcade", imgSrc: null },
      { name: "Strategy", imgSrc: null },
      { name: "RPG", imgSrc: null },
      { name: "Puzzle", imgSrc: null },
      { name: "Shooter", imgSrc: null },
      { name: "Racing", imgSrc: null },
      { name: "Sports", imgSrc: null },
      { name: "Platformer", imgSrc: null },
      { name: "Fighting", imgSrc: null },
      { name: "Simulation", imgSrc: null },
      { name: "Massively Multiplayer", imgSrc: null },
      { name: "Family", imgSrc: null },
      { name: "Board Games", imgSrc: null },
      { name: "Card", imgSrc: null },
      { name: "Educational", imgSrc: null },
    ],
  }),

  mutations: {
    SET_GAMES(state, games) {
      state.games = games;
    },
    SET_SELECTED_GAME(state, game) {
      state.selectedGame = game;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    SET_GENRE_IMAGE(state, { genreName, imgSrc }) {
      const genre = state.allGenres.find((g) => g.name === genreName);
      if (genre) {
        genre.imgSrc = imgSrc;
      }
    },
  },

  actions: {
    // Fetch all games
    async fetchGames(context, payload = {}) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/games`,
          payload
        );

        console.log(response.data);

        context.commit("SET_GAMES", response.data.games);
        context.commit("SET_PAGINATION", response.data.pagination); // Store pagination data

        return response.data;
      } catch (error) {
        context.commit("SET_ERROR", error.message || "Failed to fetch games");
        console.log("Error fetching games:", error);
        throw error;
      }
    },

    // Fetch games by partial title match
    async fetchGamesByTitle(context, title) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/games/title/${title}`
        );
        console.log(response.data);
        context.commit("SET_GAMES", [response.data]);
      } catch (error) {
        console.log("Error fetching games by title:", error);
        throw error;
      }
    },
    // Fetch a single game by ID
    async fetchGameById(context, gameId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}`
        );
        console.log(response.data);

        context.commit("SET_SELECTED_GAME", response.data);
      } catch (error) {
        console.log("Error fetching game:", error);
      }
    },
    async fetchGenreImages(context) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/games/genres/images`
        );

        // Update each genre with its image
        response.data.forEach((genre) => {
          context.commit("SET_GENRE_IMAGE", {
            genreName: genre.name,
            imgSrc: genre.imgSrc,
          });
        });
      } catch (error) {
        console.error("Error fetching genre images:", error);
      }
    },
  },

  getters: {
    allGames: (state) => state.games,
    chosenGame: (state) => state.selectedGame,
    gameById: (state) => (id) => state.games.find((game) => game.id === id),
    selectedGame: (state) => state.selectedGame,
    gamesCount: (state) => state.games.length,
    allGenres: (state) => state.allGenres,
    paginationData: (state) => state.pagination,
  },
};

export default gamesModule;
