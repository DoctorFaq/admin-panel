import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "./plugins/toasted";

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
