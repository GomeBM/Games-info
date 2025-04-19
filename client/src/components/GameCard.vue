<template>
  <div class="card-container">
    <img :src="game.image" alt="Game image" class="card-image" />
    <div class="card-title">{{ game.title }}</div>
    <div class="overlay-content">
      <h1>Ratings</h1>
      <div class="ratings">
        <p>{{ `Users: ${game.rating}` }}</p>
        <p>{{ `Critics: ${game.metacritic}` }}</p>
      </div>
      <button @click="goToGamePage">Show More</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    goToGamePage() {
      this.$router.push(`/game_info/${this.game.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  position: relative;
  width: 250px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;

  box-shadow: 12px 4px 14px 3px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;

  &:hover .overlay-content {
    transform: translateY(0%);
  }

  &:hover .card-image {
    filter: brightness(50%);
  }
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  display: block;
}

.card-title {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  z-index: 2;
  text-align: center;
  padding: 0 10px;
}

.overlay-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 3;

  h1 {
    font-size: 14px;
    text-align: center;
  }

  .platforms,
  .ratings {
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
  }

  button {
    padding: 8px;
    font-weight: bold;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #45a049;
    }
  }
}
</style>
