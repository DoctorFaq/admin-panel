<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title class="headline">
        <v-btn icon @click="$router.go(-1)"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        Adrian Cerbaro
      </v-toolbar-title>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "Requests",
  data() {
    return {};
  }
};
</script>

<style type="stylus"></style>
