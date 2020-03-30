<template>
  <v-container fill-height>
    <!-- Seções -->
    <v-row align="center" class="fill-height">
      <!-- Páginas -->
      <v-col xs="12" sm="4" lg="3" class="fill-height">
        <!-- Paginas Header -->
        <v-row>
          <v-col sm="12">
            <div class="headline">Páginas</div>
          </v-col>
        </v-row>
        <!-- End Paginas Header -->

        <v-divider></v-divider>

        <!-- Pagina Cards -->
        <v-row wrap align="start" justify="start">
          <!-- Card -->
          <v-col v-for="(card, i) in cards" cols="12" :key="card.title">
            <v-divider v-if="card.divider" :key="`pgdiv${i}`"></v-divider>

            <!-- Card -->
            <v-card v-else to="requests" outlined>
              <v-card-title class="primary--text">{{
                card.title
              }}</v-card-title>
              <v-card-subtitle v-if="card.subtitle">
                {{ card.subtitle }}
              </v-card-subtitle>
            </v-card>
            <!-- End Card -->
          </v-col>
        </v-row>
        <!-- End Pagina Cards -->
      </v-col>
      <!-- End Páginas -->
    </v-row>
    <!-- End Seções -->
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          title: "Validações",
          subtitle: "Validar cadastro de especialistas.",
          to: { name: "Requests" }
        }
      ]
    };
  }
};
</script>

<style></style>
