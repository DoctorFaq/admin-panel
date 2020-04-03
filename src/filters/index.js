import Vue from "vue";

// Importa os filtros
import formatters from "./formatters";

// Concatenta todos os filtros
const filters = {
  ...formatters
};

// Adiciona os filtros ao Vue
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
