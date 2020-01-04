import { CallerApiService } from "@/common/api.service";

//state
const state = {
  roles: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  roles: state => {
    return state.roles;
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
  async ROLES_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.get("roles");
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLES_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("search-roles?q=" + searchText);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLES_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("roles?page=" + pageNum);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLE_CREATE({ commit }, role) {
    try {
      const { data } = await CallerApiService.create("roles", role);
      commit("CREATE_ROLE", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLE_UPDATE({ commit }, params) {
    try {
      const { data } = await CallerApiService.update("roles", params.id, params.updatedFields);
      commit("UPDATE_ROLE", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLE_DELETE({ commit }, id) {
    try {
      const { data } = await CallerApiService.delete("roles", id);
      commit("DELETE_ROLE", data);
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
  FETCH_END(state, roles) {
    state.isLoading = false;
    state.roles = roles;
    state.errors = {};
  },
  CREATE_ROLE(state, role) {
    state.roles.data.push(role);
    state.errors = {};
  },
  UPDATE_ROLE(state, role) {
    const index = state.roles.data.findIndex(item => item.id === role.id);
    state.roles.data.splice(index, 1, role);
    state.errors = {};
  },
  DELETE_ROLE(state, role) {
    const index = state.roles.data.findIndex(item => item.id === role.id);
    state.roles.data.splice(index, 1);
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
