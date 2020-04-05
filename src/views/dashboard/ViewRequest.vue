<template>
  <v-container>
    <v-row fill-height align="center" justify="center">
      <v-col cols="12" sm="11" md="9" lg="8">
        <v-row align="center" justify="start">
          <v-col cols="12" md="7">
            <v-btn
              depressed
              small
              color="transparent"
              class="subtitle-2 text--disabled"
              @click="copyToClipboard(user.id)"
              ><v-icon left small>mdi-content-copy</v-icon> {{ user.id }}</v-btn
            >
          </v-col>
          <v-col cols="12" md="5" class="py-1 text-right">
            <v-row align="center" justify="end">
              <prof-status
                label
                class="mr-3"
                :value="user.doctor.validated"
              ></prof-status>

              <v-chip v-if="user.isAdmin" label color="primary" class="mr-3">
                <v-icon left>mdi-check</v-icon>
                Administrador
              </v-chip>
            </v-row>
          </v-col>
          <v-col cols="12" sm="5" md="6">
            <v-text-field
              label="Nome"
              :value="user.name"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <v-text-field
              label="CRM"
              :value="user.doctor.crm | formatCRM"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              label="CPF"
              :value="user.doctor.cpf | formatCPF"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="E-Mail"
              :value="user.email"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              label="Telefone"
              :value="user.phone | phoneNumber"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              label="Especialidade"
              :value="user.doctor.speciality"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Data de Cadastro"
              :value="user.createdAt | date"
              dense
              readonly
              outlined
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="8">
            <v-row align="center" justify="end">
              <!-- Reject BUtton -->
              <v-col cols="12" sm="auto">
                <v-btn
                  color="error"
                  block
                  :large="!$root.onDesktop"
                  @click="rejectRequest"
                  :disabled="user.doctor.validated !== null"
                >
                  <v-icon left>mdi-close-circle-outline</v-icon>
                  Rejeitar
                </v-btn>
              </v-col>
              <!-- End Reject Button -->

              <!-- Accept Button -->
              <v-col cols="12" sm="auto">
                <v-btn
                  color="success"
                  outlined
                  block
                  :large="!$root.onDesktop"
                  @click="acceptRequest"
                  :disabled="user.doctor.validated !== null"
                >
                  <v-icon left>mdi-check-circle-outline</v-icon>
                  Aprovar
                </v-btn>
              </v-col>
              <!-- End Accept Button -->
            </v-row>
          </v-col>
        </v-row>
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
      loading: true,
      user: {
        doctor: {}
      }
    };
  },
  created() {
    this.loadUser(this.$route.params["id"]).then(user => {
      this.user = user;
    });
  },
  methods: {
    loadUser(userId) {
      if (!userId) {
        this.$router.go(-1);
        this.$toasted.show("Usuário inválido");
        return;
      }

      // Set loading
      this.loading = true;

      // Consulta o serviço
      return User.findByID(userId)
        .then(res => res)
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
    },
    copyToClipboard(val) {
      console.log(val);
    },
    acceptRequest() {
      /**
       * Exibir dialogo para confirmação
       */
    },
    rejectRequest() {
      /**
       * Exibir dialogo para confirmação
       */
    }
  }
};
</script>

<style type="stylus"></style>
