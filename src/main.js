import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@babel/polyfill";

// Import plugins
import vuetify from "./plugins/vuetify";
import "./plugins/toasted";

// Import filters
import "./filters";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  computed: {
    onDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },
  render: h => h(App)
}).$mount("#app");
