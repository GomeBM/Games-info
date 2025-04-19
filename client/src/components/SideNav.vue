<template>
  <div class="sidebar">
    <h1>Genres</h1>
    <div class="genre-links">
      <div
        v-for="genre in allGenres"
        :key="genre.name"
        @click="clickGenre(genre.name)"
        class="genre-item"
      >
        <div class="genre-image" v-if="genre.imgSrc">
          <img :src="genre.imgSrc" :alt="genre.name" />
        </div>
        <div class="genre-image placeholder" v-else></div>
        <p>{{ genre.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("games", ["allGenres"]),
    isGameInfoPage() {
      return (
        this.$route.name === "GameInfo" ||
        this.$route.path.includes("/game_info/")
      );
    },
  },
  methods: {
    ...mapActions("games", ["fetchGenreImages"]),
    clickGenre(genreName) {
      const query = {};

      if (genreName.toLowerCase() !== "all") {
        query.genre = genreName;
      }
      query.page = 1;
      if (this.isGameInfoPage) {
        this.$router.push({
          path: "/",
          query: query,
        });
      } else {
        const currentQuery = { ...this.$route.query };

        if (genreName.toLowerCase() === "all") {
          delete currentQuery.genre;
        } else {
          currentQuery.genre = genreName;
        }

        currentQuery.page = 1;

        this.$router.push({
          query: currentQuery,
        });
      }
    },
  },
  mounted() {
    this.fetchGenreImages();
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 180px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #333;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: start;
    margin-bottom: 1rem;
  }

  .genre-links {
    flex-grow: 1;
    padding-right: 10px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .genre-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 3px 0;

    &:hover {
      transform: translateX(3px);
    }

    .genre-image {
      width: 30px;
      height: 30px;
      min-width: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.placeholder {
        background-color: #555;
      }
    }

    p {
      font-size: 14px;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
