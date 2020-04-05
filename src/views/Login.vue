<template>
  <v-app id="login" dark>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col sm="12" md="7" lg="8" class="fill-height text-center">
            <v-row align="center" justify="center" class="login-home">
              <v-col cols="12" class="page-header">
                <div class="display-1 font-weight-bold">Hack for Good</div>
                <p class="subtitle">Painel administrativo</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="8" md="5" lg="4" class="login-form">
            <v-card flat color="white">
              <v-toolbar color="grey lighten-3" flat>
                <v-toolbar-title class="primary--text font-weight-bold"
                  ><v-icon left color="primary">mdi-login-variant</v-icon>
                  Entrar</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginForm" v-model="valid">
                  <v-text-field
                    v-model="username"
                    :rules="[v => !!v]"
                    :validate-on-blur="false"
                    label="Usuário"
                    name="login"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    outlined
                  />
                  <v-text-field
                    v-model="password"
                    :rules="[v => !!v]"
                    :validate-on-blur="false"
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    outlined
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="px-6 pb-6">
                <v-spacer />
                <v-btn color="accent" @click="authenticate">
                  Entrar
                  <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: false,
    username: null,
    password: null
  }),
  methods: {
    authenticate() {
      if (this.$refs.loginForm.validate()) {
        /**
         * Verificar credenciais no banco de dados e autenticar
         */
        localStorage.setItem("user", this.username);
        this.$router.go({ path: "/dashboard" });
        this.$toast.show("Autenticado com sucesso", { type: "success" });
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if (localStorage.getItem("user") != null) {
      return next({ path: "/dashboard" });
    }
    return next();
  }
};
</script>

<style lang="stylus"></style>
