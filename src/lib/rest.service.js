import axios from "axios";
import join from "url-join";
import { API_URL } from "@/config";

export class RestService {
  constructor(url, auth = true, config = {}) {
    this._axios = axios.create({
      baseURL: join(API_URL, url),
      ...config
    });

    /**
     * Rota a ser requisitada necessita de autenticação
     */
    if (auth) {
      this._axios.interceptors.request.use(async req => {
        /**
         * Lógica para definir autenticação no header 'Authorization'
         */
        return req;
      });
    }

    /**
     * Validação dos tokens
     */
    this._axios.interceptors.response.use(
      async res => res,
      async err => {
        /**
         * Lógica para validação dos tokens
         */
        throw err;
      }
    );
  }

  /**
   * Obtém todos os valores do recurso
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  find(filters = {}, config = {}) {
    return this._axios
      .request({
        method: "GET",
        url: "/",
        params: filters,
        ...config
      })
      .then(res => res.data);
  }

  /**
   * Encontra um valor do recurso através do ID
   * @param {Number} id ID do recurso
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  findByID(id, filters = {}, config = {}) {
    return this._axios
      .request({
        method: "GET",
        url: id.toString(),
        params: filters,
        ...config
      })
      .then(res => res.data);
  }

  /**
   * Adiciona valores ao recurso
   * @param {Object} data
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  create(data, filters = {}, config = {}) {
    return this._axios
      .request({
        method: "POST",
        url: "/",
        data,
        params: filters,
        ...config
      })
      .then(res => res.data);
  }

  /**
   * Atualiza os valores do recurso
   * @param {Object} data
   * @param {Number} data.id ID do recurso
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  update(data, filters = {}, config = {}) {
    return this._axios
      .request({
        method: "PATCH",
        url: data.id.toString(),
        data,
        params: filters,
        ...config
      })
      .then(res => res.data);
  }

  /**
   * Cria ou atualiza um recurso
   * @param {Object} data
   * @param {Number} [data.id] ID do recurso
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  save(data, filters = {}, config = {}) {
    return data.id === null || data.id === undefined
      ? this.create(data, filters, config)
      : this.update(data, filters, config);
  }

  /**
   * Remove os dados de um recurso
   * @param {Number} id ID do recurso
   * @param {Object} filters Filtros
   * @param {axios.AxiosRequestConfig} config Configuração axios
   */
  remove(id, filters = {}, config = {}) {
    return this._axios
      .request({
        method: "DELETE",
        url: id.toString(),
        params: filters,
        ...config
      })
      .then(res => res.data);
  }
}
