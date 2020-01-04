import { CallerApiService } from "@/common/api.service";

//state
const state = {
  tours: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  tours: state => {
    return state.tours;
  },
  errors: state => {
    return state.errors;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async TOURS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("tours");
      if (res && res.status === 200) {
        commit("FETCH_END", res.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },
  async SEARCH_TOURS({ commit }, params) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.query(
        `search-tours?q=${params.q}&cate=${params.cate}`
      );
      if (res && res.status === 200) {
        commit("FETCH_END", res.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },
  async TOURS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.query("tours?page=" + pageNum);
      if (res && res.status === 200) {
        commit("FETCH_END", res.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  }
};

//mutations
const mutations = {
  SET_ERROR(state, errors) {
    state.isLoading = true;
    state.errors = errors;
  },
  FETCH_START(state) {
    state.isLoading = true;
  },
  FETCH_END(state, tours) {
    state.tours = tours;
    state.isLoading = false;
    state.errors = {};
  }
};

//export
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
