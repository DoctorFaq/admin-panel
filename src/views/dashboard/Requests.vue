<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12">
        <div class="title primary--text">Avaliação de Cadastros</div>
      </v-col>
    </v-row>

    <v-row align="start" justify="center" class="fill-height">
      <v-col xs="12" class="fill-height">
        <v-data-table
          :headers="request.headers"
          :items="request.items"
          :items-per-page="5"
          :loading="request.loading"
          @click:row="openItem"
          sort-by="registerDate"
          class="elevation-1 clickable-table"
        >
          <template v-slot:item.phone="{ item }">
            {{ item.phone | phoneNumber }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { User } from "../../services";

console.log(User);

export default {
  name: "Requests",
  data() {
    return {
      request: {
        headers: [
          { sortable: false, text: "#", value: "id" },
          { text: "Nome", value: "name" },
          { sortable: false, text: "Telefone", value: "phone" },
          { sortable: false, text: "CRM", value: "doctor.crm" },
          { text: "Data de Cadastro", value: "createdAt" }
        ],
        loading: true,
        items: []
      }
    };
  },
  created() {
    this.findAll();
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: "ViewRequest", params: { id: item.id } });
    },
    findAll() {
      this.request.loading = true;
      User.findProfessionals()
        .then(res => {
          this.items = res.data || [];
        })
        .finally(() => {
          this.request.loading = false;
        });
    }
  }
};
</script>

<style lang="stylus"></style>
