import { createStore } from "vuex";
import gamesModule from "./GamesModule";
import userModule from "./UsersModule";

const store = createStore({
  modules: {
    games: gamesModule,
    users: userModule,
  },
});

export default store;
