<template>
  <div class="game-info-container" v-if="chosenGame">
    <h1>{{ chosenGame.title }}</h1>
    <img :src="chosenGame.image" alt="Game cover" class="game-image" />
    <p><strong>Rating:</strong> {{ chosenGame.rating }}</p>
    <p><strong>Metacritic:</strong> {{ chosenGame.metacritic }}</p>
    <p><strong>Platforms:</strong> {{ chosenGame.platforms.join(", ") }}</p>
    <p><strong>Description:</strong> {{ chosenGame.description }}</p>
  </div>

  <div v-else-if="loading" class="game-info-container">
    <p>Loading game data...</p>
  </div>

  <div v-else class="game-info-container">
    <p>Game not found.</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("games/fetchGameById", this.id);
    } catch (error) {
      console.error("Error fetching game:", error);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters("games", ["chosenGame"]),
  },
};
</script>

<style scoped>
.game-info-container {
  padding: 30px;
  color: white;
}
.game-image {
  max-width: 300px;
  border-radius: 10px;
  margin: 10px 0;
}
</style>
