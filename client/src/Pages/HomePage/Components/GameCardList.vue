<template>
  <div class="card-list-container">
    <GameCard
      v-for="game in games"
      :key="game.id"
      :game="game"
      class="game-card"
    />
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  components: { GameCard },
  props: {
    games: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card-list-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.game-card {
  margin-bottom: 20px;
}
</style>
