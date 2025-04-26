import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import HomePage from "./Pages/HomePage/HomePage.vue";
import GameInfo from "./Pages/GameInfo/GameInfo.vue";
import Register from "./Pages/Authentication/Register.vue";
import Login from "./Pages/Authentication/Login.vue";

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
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideLayout: true }, // Hide SideNav and Navbar for this route
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideLayout: true }, // Hide SideNav and Navbar for this route
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global beforeEach guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get("/api/user/profile", {
        withCredentials: true, // Include cookies in the request
      });
      if (response.status === 200) {
        next(); // Allow access
      }
    } catch (error) {
      console.log("Not connected");
      next(false); // Block access
    }
  } else {
    next(); // Allow access to non-protected routes
  }
});

export default router;
