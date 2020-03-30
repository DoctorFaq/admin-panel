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
          @click:row="openItem"
          sort-by="registerDate"
          class="elevation-1"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Requests",
  data() {
    return {
      request: {
        headers: [
          { sortable: false, text: "#", value: "id" },
          { text: "Nome", value: "name" },
          { sortable: false, text: "Telefone", value: "phone" },
          { sortable: false, text: "CRM", value: "crm" },
          { text: "Data de Cadastro", value: "registerDate" }
        ],
        items: [
          {
            id: 0,
            name: "Maria do Carmo",
            phone: "+5554991608363",
            crm: "102910783",
            registerDate: "01/01/2020"
          },
          {
            id: 1,
            name: "João Juca da Jabera",
            phone: "+5554991608363",
            crm: "102915183",
            registerDate: "01/03/2020"
          },
          {
            id: 3,
            name: "Jamerson Homulo Espadaxin",
            phone: "+5554991608363",
            crm: "102919581",
            registerDate: "02/03/2020"
          },
          {
            id: 10,
            name: "Alberto Cabrito Cabreiro",
            phone: "+5554991608363",
            crm: "102912131",
            registerDate: "02/02/2019"
          }
        ]
      }
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: "ViewRequest", params: { id: item.id } });
    }
  }
};
</script>

<style type="stylus"></style>
