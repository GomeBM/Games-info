import HomePage from "./Pages/HomePage/HomePage.vue";
import GameInfo from "./Pages/GameInfo/GameInfo.vue";

const NotFound = {
  template:
    "<div><h1>404 Not Found</h1><p>The page you are looking for does not exist.</p></div>",
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/game_info/:id",
    name: "GameInfo",
    component: GameInfo,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

export default routes;
