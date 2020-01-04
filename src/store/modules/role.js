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
      const response = await CallerApiService.get("roles");
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLES_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.query(
        "search-roles?q=" + searchText
      );
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLES_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.query("roles?page=" + pageNum);
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLE_CREATE({ commit }, role) {
    try {
      const response = await CallerApiService.create("roles", role);
      if (response && response.status === 200) {
        commit("CREATE_ROLE", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLE_UPDATE({ commit }, params) {
    try {
      const response = await CallerApiService.update(
        "roles",
        params.id,
        params.updatedFields
      );
      if (response && response.status === 200) {
        commit("UPDATE_ROLE", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async ROLE_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("roles", id);
      commit("DELETE_ROLE", id);
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
  DELETE_ROLE(state, id) {
    const index = state.roles.data.findIndex(item => item.id === id);
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
