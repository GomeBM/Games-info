import "./assets/main.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import store from "./Store/store";
import axios from "axios"; // Import Axios

// Configure Axios globally
axios.defaults.withCredentials = true; // Include cookies in all requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // Set base URL

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

createApp(App).use(vuetify).use(router).use(store).mount("#app");
