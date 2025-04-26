import axios from "axios";

const userModule = {
  namespaced: true,

  state: () => ({
    user: null, // Stores the logged-in user's data
    error: null, // Stores any error messages
  }),

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },

  actions: {
    // Register a new user
    async register({ commit }, payload) {
      try {
        commit("CLEAR_ERROR"); // Clear any previous errors
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
          payload
        );
        console.log("Registration successful:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error during registration:",
          error.response?.data || error.message
        );
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Registration failed"
        );
        throw error;
      }
    },

    // Login a user
    async login({ commit }, payload) {
      try {
        commit("CLEAR_ERROR"); // Clear any previous errors
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
          payload,
          { withCredentials: true } // Include cookies in the request
        );
        console.log("Login successful:", response.data);

        // Fetch the user's profile after login
        await this.dispatch("user/fetchProfile");
        return response.data;
      } catch (error) {
        console.error(
          "Error during login:",
          error.response?.data || error.message
        );
        commit("SET_ERROR", error.response?.data?.message || "Login failed");
        throw error;
      }
    },

    // Fetch the logged-in user's profile
    async fetchProfile({ commit }) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          { withCredentials: true } // Include cookies in the request
        );
        console.log("Fetched user profile:", response.data);
        commit("SET_USER", response.data);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
        commit("SET_USER", null); // Clear user data if fetching fails
        throw error;
      }
    },

    // Logout the user
    async logout({ commit }) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
          {},
          { withCredentials: true } // Include cookies in the request
        );
        commit("SET_USER", null); // Clear user data
        console.log("Logout successful");
      } catch (error) {
        console.error(
          "Error during logout:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
  },

  getters: {
    currentUser: (state) => state.user,
    errorMessage: (state) => state.error,
  },
};

export default userModule;
