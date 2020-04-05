<template>
  <v-chip
    :color="validated === null ? 'grey' : validated ? 'success' : 'error'"
    :small="small"
    :large="large"
    :label="label"
    :style="chipStyle"
    text-color="white"
  >
    <v-icon left :small="small" :large="large">
      {{
        validated === null
          ? "mdi-help-circle"
          : validated
          ? "mdi-check-circle"
          : "mdi-close-circle"
      }}
    </v-icon>
    {{ validated | status }}
  </v-chip>
</template>

<script>
export default {
  name: "ProfStatus",
  props: {
    value: {
      type: Boolean
    },
    small: {
      type: Boolean
    },
    large: {
      type: Boolean
    },
    label: {
      type: Boolean
    },
    block: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {
    validated: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    chipStyle() {
      return {
        width: this.block ? "100%" : "auto"
      };
    }
  },
  filters: {
    status(status) {
      if (status === null) return "Pendente";
      else if (status) return "Aprovado";
      else return "Reprovado";
    }
  }
};
</script>

<style></style>
