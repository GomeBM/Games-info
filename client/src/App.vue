<template>
  <div class="app-layout">
    <!-- Conditionally render SideNav -->
    <SideNav v-if="!hideLayout" />

    <div class="main-section">
      <!-- Conditionally render Navbar -->
      <div
        class="navbar"
        :style="{ width: navbarWidth, left: navbarLeft }"
      ></div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import SideNav from "./components/SideNav.vue";

export default {
  name: "App",
  components: {
    SideNav,
  },
  data() {
    return {
      route: useRoute(),
    };
  },
  computed: {
    hideLayout() {
      return this.route.meta.hideLayout;
    },
    navbarWidth() {
      // Check if the current route's name is "register" or "login"
      return this.route.name === "Register" || this.route.name === "Login"
        ? "100vw"
        : "calc(100vw - 180px)";
    },
    navbarLeft() {
      // Check if the current route's name is "register" or "login"
      return this.route.name === "Register" || this.route.name === "Login"
        ? "0"
        : "180px";
    },
  },
};
</script>

<style scoped lang="scss">
.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main-section {
  margin-left: 180px;
  width: calc(100vw - 180px);
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  height: 50px;
  background-color: #333;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.content {
  margin-top: 50px;
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
