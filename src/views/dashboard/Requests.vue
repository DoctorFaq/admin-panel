<template>
  <v-container>
    <v-row wrap align="center" justify="start">
      <v-col cols="12" sm="9">
        <div class="title primary--text">Validação de Cadastros</div>
      </v-col>
    </v-row>

    <v-row align="start" justify="center" class="fill-height">
      <v-col xs="12" class="fill-height">
        <v-data-table
          :headers="headers"
          :items="showItems"
          :items-per-page="5"
          :loading="loading"
          @click:row="openItem"
          sort-by="registerDate"
          class="elevation-1 clickable-table"
        >
          <!-- Table Top -->
          <template v-slot:top>
            <v-expansion-panels flat>
              <!-- Table Filters -->
              <v-expansion-panel>
                <v-expansion-panel-header color="grey lighten-3" class="py-0">
                  <v-row
                    :no-gutters="$vuetify.breakpoint.mdAndUp"
                    align="center"
                    justify="space-around"
                  >
                    <!-- Filters Title -->
                    <v-col cols="12" sm="3">
                      <v-icon color="accent" left>mdi-filter-outline</v-icon>
                      Filtros
                    </v-col>
                    <!-- End Filters Title -->

                    <v-col cols="12" sm="8">
                      <transition name="scroll-x-transition" mode="out-in">
                        <v-row
                          key="0"
                          :justify="
                            $vuetify.breakpoint.xsOnly ? 'start' : 'end'
                          "
                          align="center"
                          class="grey--text text--darken-2"
                          v-if="
                            !filters.pending &&
                              !filters.accepted &&
                              !filters.rejected
                          "
                        >
                          <v-col cols="10" sm="auto">
                            Nenhuma situação selecionada para exibição
                          </v-col>
                        </v-row>

                        <v-row
                          v-else
                          key="1"
                          :justify="
                            $vuetify.breakpoint.xsOnly ? 'start' : 'end'
                          "
                          align="center"
                          class="grey--text text--darken-2 px-3"
                        >
                          <v-col cols="12" sm="auto">Exibindo situações:</v-col>
                          <v-chip
                            small
                            class="ml-2 my-1"
                            v-show="filters.pending"
                            >Pendentes</v-chip
                          >
                          <v-chip
                            small
                            class="ml-2 my-1"
                            v-show="filters.accepted"
                            >Aprovados</v-chip
                          >
                          <v-chip
                            small
                            class="ml-2 my-1"
                            v-show="filters.rejected"
                            >Reprovados</v-chip
                          >
                        </v-row>
                      </transition>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="grey lighten-5">
                  <v-row justify="space-between" align="center" no-gutters>
                    <v-checkbox
                      label="Pendente"
                      v-model="filters.pending"
                    ></v-checkbox>
                    <v-checkbox
                      label="Aprovado"
                      v-model="filters.accepted"
                    ></v-checkbox>
                    <v-checkbox
                      label="Reprovado"
                      v-model="filters.rejected"
                    ></v-checkbox>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- End Table Filters -->
            </v-expansion-panels>
          </template>
          <!-- End Table Top -->

          <!-- Phone Number -->
          <template v-slot:item.phone="{ item }">
            {{ item.phone | phoneNumber }}
          </template>
          <!-- End Phone Number -->

          <!-- Validated -->
          <template v-slot:item.createdAt="{ item }">
            {{ item.createdAt | date }}
          </template>
          <!-- End Validated -->

          <!-- Validated -->
          <template v-slot:item.status="{ item }">
            <prof-status :value="item.doctor.validated" small></prof-status>
          </template>
          <!-- End Validated -->
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { User } from "../../services";
import ProfStatus from "../../components/ProfStatus";

export default {
  name: "Requests",
  components: {
    ProfStatus
  },
  data() {
    return {
      headers: [
        { text: "Nome", value: "name" },
        { sortable: false, text: "Telefone", value: "phone" },
        { sortable: false, text: "CRM", value: "doctor.crm" },
        { text: "Especialidade", value: "doctor.speciality" },
        { text: "Data de Cadastro", value: "createdAt" },
        { sortable: false, text: "Status", value: "status" }
      ],
      loading: true,
      showItems: [],
      items: [],
      filters: {
        pending: true,
        accepted: false,
        rejected: false
      }
    };
  },
  created() {
    this.findProfessionals().then(data => {
      this.items = data;
      this.applyFilters(this.filters);
    });
  },
  watch: {
    filters: {
      deep: true,
      immediate: true,
      handler(filters) {
        this.applyFilters(filters);
      }
    }
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: "ViewRequest", params: { id: item.id } });
    },
    findProfessionals() {
      this.loading = true;
      return User.findProfessionals().finally(() => (this.loading = false));
    },
    applyFilters(filters) {
      this.showItems = this.items.filter(usr => {
        const { validated } = usr.doctor;
        const { pending, accepted, rejected } = filters;
        return (
          (pending && validated === null) ||
          (accepted && validated) ||
          (rejected && validated === false)
        );
      });
    }
  }
};
</script>

<style lang="stylus"></style>
