<!-- <template>
  <div class="app-layout">
    <SideNav></SideNav>
    <div class="main-section">
      <div class="navbar"></div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "./components/SideNav.vue";

export default {
  name: "App",
  components: {
    SideNav,
  },
};
</script>

<style scoped>
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
  left: 180px;
  width: calc(100vw - 180px);
  z-index: 1000;
}

.content {
  margin-top: 50px;
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
}
</style> -->

<template>
  <div class="app-layout">
    <!-- Conditionally render SideNav -->
    <SideNav v-if="!hideLayout" />

    <div class="main-section">
      <!-- Conditionally render Navbar -->
      <div class="navbar" v-if="!hideLayout"></div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SideNav from "./components/SideNav.vue";

export default {
  name: "App",
  components: {
    SideNav,
  },
  setup() {
    const route = useRoute();

    // Check if the current route has the meta.hideLayout property set to true
    const hideLayout = computed(() => route.meta.hideLayout);

    return {
      hideLayout,
    };
  },
};
</script>

<style scoped>
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
  left: 180px;
  width: calc(100vw - 180px);
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
