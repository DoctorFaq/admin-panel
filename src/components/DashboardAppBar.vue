<template>
  <v-app-bar flat app color="grey lighten-5">
    <!-- Back Button -->
    <transition name="slide-x-transition" mode="out-in">
      <v-app-bar-nav-icon v-if="!$root.onDesktop" @click="toggleSidebar" />
      <v-app-bar-nav-icon
        v-else
        class="ml-4"
        v-show="backBtnActive"
        :style="backButtonStyle"
        @click="goBack"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
    </transition>
    <!-- End Back Button -->

    <!-- Toolbar Title -->
    <v-spacer></v-spacer>
    <v-toolbar-title class="accent--text font-weight-bold headline">
      Hack for Good
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- End Toolbar Title -->
  </v-app-bar>
</template>

<script>
export default {
  name: "DashboardAppBar",
  props: {
    backBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    backButtonStyle() {
      let style = {
        position: "absolute"
      };
      return style;
    },
    backBtnActive() {
      return this.backBtn && this.$root.onDesktop;
    }
  },
  methods: {
    toggleSidebar(event) {
      this.$emit("click:nav-icon", event);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
