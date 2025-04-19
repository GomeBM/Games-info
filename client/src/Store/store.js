import { createStore } from "vuex";
import gamesModule from "./GamesModule";

const store = createStore({
  modules: {
    games: gamesModule,
  },
});

export default store;
