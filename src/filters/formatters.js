import moment from "moment";

export default {
  /**
   * Formata um número de telefone
   * @param {string|number} val Número a ser formatado
   */
  phoneNumber(val) {
    return `${val}`
      .replace(/[^\d+]/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})$/, " ($1) $2-$3")
      .trim();
  },

  /**
   * Formata uma data
   * @param {string|number} val
   */
  date(val) {
    if (val) {
      return moment(String(val)).format("L");
    }
  }
};
