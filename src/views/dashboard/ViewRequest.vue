<template>
  <v-container>
    <v-toolbar flat> </v-toolbar>
  </v-container>
</template>

<script>
import { User } from "../../services";

export default {
  name: "Requests",
  data() {
    return {
      loading: true,
      user: {}
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      const userId = this.$route.params["id"];
      if (!userId) {
        this.$router.go(-1);
        this.$toasted.show("Usuário inválido");
        return;
      }

      this.loading = true;

      // Requisita o serviço
      User.findByID(userId)
        .then(res => {
          this.user = res.data || {};
        })
        .catch(err => {
          this.$router.go(-1);
          this.$toasted.show("Erro ao carregar dados do usuário", {
            type: "error"
          });
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style type="stylus"></style>
