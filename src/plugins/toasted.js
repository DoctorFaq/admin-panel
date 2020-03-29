import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  duration: 4000,
  keepOnHover: true,
  containerClass: "v-application",
  iconPack: "mdi",
  position: "top-center",
  action: {
    text: "Fechar",
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});
