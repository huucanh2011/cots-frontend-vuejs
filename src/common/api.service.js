import Vue from "vue";
import axios from "axios";
// import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";

import { API_URL } from "@/common/config";

// axios.defaults.baseURL = API_URL;

const ApiService = {
  // init() {
  //   // Vue.use(VueAxios, axios);
  //   Vue.use(axios);
  //   Vue.axios.defaults.baseURL = API_URL;
  // },

  setHeader() {
    // Vue.axios.defaults.headers.common["Content-Type"] = "application/json";

    // Vue.axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

    // Vue.axios.defaults.headers.common["Accept"] = "application/json";

    // Vue.axios.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${JwtService.getToken()}`;

    axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

    axios.defaults.headers.common["Accept"] = "application/json";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return axios.get(`${API_URL}/${resource}`, params).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  // query(resource, params) {
  //   return Vue.axios.get(resource, params).catch(error => {
  //     throw new Error(`ApiService ${error}`);
  //   });
  // },

  get(resource, id) {
    if (id !== null && id !== undefined && id !== "") {
      return axios.get(`${API_URL}/${resource}/${id}`).catch(error => {
        throw new Error(`ApiService ${error}`);
      });
    } else {
      return axios.get(`${API_URL}/${resource}`).catch(error => {
        throw new Error(`ApiService ${error}`);
      });
    }
  },

  post(resource, params) {
    return axios.post(`${API_URL}/${resource}`, params);
  },

  update(resource, id, params) {
    return axios.put(`${API_URL}/${resource}/${id}`, params);
  },

  put(resource, params) {
    return axios.put(`${API_URL}/${resource}`, params);
  },

  delete(resource, id) {
    if (id !== null && id !== undefined && id !== "") {
      return axios.delete(`${API_URL}/${resource}/${id}`).catch(error => {
        throw new Error(`ApiService ${error}`);
      });
    }
  }
  // post(resource, params) {
  //   return Vue.axios.post(`${resource}`, params);
  // },

  // update(resource, id, params) {
  //   return Vue.axios.put(`${resource}/${id}`, params);
  // },

  // put(resource, params) {
  //   return Vue.axios.put(`${resource}`, params);
  // },

  // delete(resource, id = "") {
  //   return Vue.axios.delete(`${resource}/${id}`).catch(error => {
  //     throw new Error(`ApiService ${error}`);
  //   });
  // }
};

export default ApiService;

// call api service
export const CallerApiService = {
  query(api, params) {
    return ApiService.query(api, params);
  },

  get(api, id) {
    return ApiService.get(api, id);
  },

  create(api, params) {
    return ApiService.post(api, params);
  },

  update(api, id, params) {
    return ApiService.update(api, id, params);
  },

  delete(api, id) {
    return ApiService.delete(api, id);
  }
};
