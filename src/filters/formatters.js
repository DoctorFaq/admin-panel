export default {
  /**
   * Formata um número de telefone
   * @param {string|Number} val Número a ser formatado
   */
  phoneNumber(val) {
    return `${val}`
      .replace(/[^\d+]/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})$/, " ($1) $2-$3")
      .trim();
  }
};
