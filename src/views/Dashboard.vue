<template>
  <v-app dark id="dashboard">
    <!-- Main Dashboard Sidebar -->
    <main-sidebar v-model="drawer" :items="menuItems"></main-sidebar>

    <!-- Dashboard App Bar -->
    <dashboard-app-bar
      v-bind:back-btn="canGoBack"
      @click:nav-icon="drawer = !drawer"
    ></dashboard-app-bar>

    <v-content>
      <!-- Back Button -->
      <v-toolbar flat dense class="mb-0" v-if="!$root.onDesktop">
        <v-slide-x-transition>
          <v-toolbar-title v-if="canGoBack && !$root.onDesktop">
            <v-btn small depressed color="primary--text" @click="goBack">
              <v-icon left>mdi-arrow-left</v-icon>
              Voltar
            </v-btn>
          </v-toolbar-title>
        </v-slide-x-transition>
      </v-toolbar>

      <!-- Router View -->
      <transition :name="$route.meta.transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import MainSidebar from "../components/MainSidebar";
import DashboardAppBar from "../components/DashboardAppBar";

export default {
  name: "Dashboard",
  components: { MainSidebar, DashboardAppBar },
  data: () => ({
    drawer: false,
    canGoBack: false,
    menuItems: [
      {
        title: "Início",
        icon: "mdi-home",
        path: { name: "DashboardHome" }
      },
      {
        title: "Validações",
        icon: "mdi-clipboard-check-multiple-outline",
        path: { name: "Requests" }
      }
    ]
  }),
  mounted() {
    this.checkBackBtn(this.$route);
  },
  watch: {
    ["$route"](to) {
      this.checkBackBtn(to);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkBackBtn(to) {
      this.canGoBack =
        to &&
        to.path &&
        to.path.split("/").filter(p => String(p).trim()).length > 2;
    }
  }
};
</script>

<style lang="stylus"></style>
