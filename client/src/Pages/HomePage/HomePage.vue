<template>
  <div class="homepage-container">
    <GameCardList :games="this.games"></GameCardList>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import { mapGetters } from "vuex";
import GameCardList from "./Components/GameCardList.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  async mounted() {
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page);
    }
    await this.fetchGames();
  },
  components: {
    GameCard,
    GameCardList,
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      pageSize: 20,
    };
  },
  computed: {
    ...mapGetters("games", ["allGames", "paginationData"]),
    games() {
      return this.allGames;
    },
  },
  watch: {
    // Watch for changes in the route's query parameters
    "$route.query": {
      handler: async function (newQuery) {
        if (newQuery.page && parseInt(newQuery.page) !== this.currentPage) {
          this.currentPage = parseInt(newQuery.page);
        }
        await this.fetchGames();
      },
      deep: true,
    },
    // Watch for changes in pagination data from the store
    paginationData: {
      handler: function (newData) {
        if (newData) {
          this.totalPages = newData.totalPages || 1;
          if (newData.currentPage && newData.currentPage !== this.currentPage) {
            this.currentPage = newData.currentPage;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    handlePageChange(page) {
      this.$router.push({
        query: { ...this.$route.query, page: page },
      });
    },
    async fetchGames() {
      const payload = {
        top: this.pageSize,
        skip: (this.currentPage - 1) * this.pageSize,
        sortBy: "rating",
        sortDir: "desc",
      };

      if (this.$route.query.genre) {
        payload.genre = this.$route.query.genre;
      }

      const result = await this.$store.dispatch("games/fetchGames", payload);

      if (result && result.pagination) {
        this.totalPages = result.pagination.totalPages;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
