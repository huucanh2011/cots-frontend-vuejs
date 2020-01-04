import { CallerApiService } from "@/common/api.service";

//state
const state = {
  decentralizations: [],
  errors: null,
  isLoading: false
};

//getters
const getters = {
  decentralizations: state => {
    return state.decentralizations;
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
  async DECENTRALIZATIONS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.get("decentralizations");
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async DECENTRALIZATIONS_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("search-decentralizations?q=" + searchText);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async DECENTRALIZATIONS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("decentralizations?page=" + pageNum);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async DECENTRALIZATION_CHANGE_STATUS({ commit }, user) {
    try {
      const { data } = await CallerApiService.create("block-user", user);
      commit("CHANGE_STATUS", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async DECENTRALIZATION_UPDATE({ commit }, params) {
    try {
      const { data } = await CallerApiService.update("decentralizations", params.id, params.updatedFields);
      commit("CHANGE_STATUS", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  }
};

//mutations
const mutations = {
  SET_ERROR(state, errors) {
    state.isLoading = false;
    state.errors = errors;
  },
  FETCH_START(state) {
    state.isLoading = true;
  },
  CHANGE_STATUS(state, data) {
    const index = state.decentralizations.data.findIndex(item => item.id == data.id);
    state.decentralizations.data.splice(index, 1, data);
    state.errors = {};
  },
  FETCH_END(state, decentralizations) {
    state.isLoading = false;
    state.decentralizations = decentralizations;
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
