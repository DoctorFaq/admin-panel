<template>
  <v-navigation-drawer
    v-model="showDrawer"
    :expand-on-hover="!onMobile"
    :mini-variant="!onMobile"
    :permanent="!onMobile"
    :temporary="onMobile"
    class="primary"
    dark
    app
  >
    <v-list class="py-0">
      <v-list-item two-line :class="!onMobile && 'px-2'">
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
</template>

<script>
export default {
  name: "MainSidebar",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    items: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menuItems: this.items
    };
  },
  computed: {
    onMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    showDrawer: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: "Logout" });
    }
  }
};
</script>

<style></style>
