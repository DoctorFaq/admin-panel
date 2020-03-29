<template>
  <v-app dark id="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="$root.onDesktop"
      :mini-variant="$root.onDesktop"
      :permanent="$root.onDesktop"
      :temporary="!$root.onDesktop"
      class="primary"
      absolute
      dark
      app
    >
      <v-list class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-2'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Sample User</v-list-item-title>
            <v-list-item-subtitle>@username</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <template v-for="item in menuItems">
          <v-divider v-if="item.divider" :key="item.title"></v-divider>
          <v-list-item v-else :key="item.title" :to="item.path" exact>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <template v-slot:append>
        <v-list dense>
          <v-divider></v-divider>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" class="hidden-md-and-up" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Hack for Good</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
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
  computed: {
    miniVariant() {
      return !this.$vuetify.breakpoint.xsOnly;
    },
    expandOnHover() {
      return !this.$vuetify.breakpoint.xsOnly;
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    logout() {
      this.$router.push("/logout");
    }
  }
};
</script>

<style lang="stylus"></style>
