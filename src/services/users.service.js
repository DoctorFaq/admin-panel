import { RestService } from "../lib/rest.service";

export const User = new (class extends RestService {
  constructor() {
    super("users");
  }

  /**
   * Obtém os dados de todos os profissionais
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  findProfessionals(filters = {}, config = {}) {
    return this._axios
      .request({
        method: "GET",
        url: "/professionals",
        params: filters,
        ...config
      })
      .then(res => res.data);
  }
})();
