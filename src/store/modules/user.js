import { CallerApiService } from "@/common/api.service";

//state
const state = {
  users: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  users: state => {
    return state.users;
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
  async USERS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.get("users");
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  USER_ONE_FETCH(context, id) {
    return new Promise((reslove, reject) => {
      CallerApiService.get("users", id)
        .then(response => {
          if (response && response.status === 200) {
            reslove(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async USERS_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.query(
        "search-users?q=" + searchText
      );
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async USERS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.query("users?page=" + pageNum);
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async USER_CHANGE_STATUS({ commit }, user) {
    try {
      const response = await CallerApiService.create("block-user", user);
      if (response && response.status === 200) {
        commit("UPDATE_USER", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async USER_CREATE({ commit }, user) {
    try {
      const response = await CallerApiService.create("users", user);
      if (response && response.status === 200) {
        commit("CREATE_USER", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async USER_UPDATE({ commit }, params) {
    try {
      const response = await CallerApiService.update(
        "users",
        params.id,
        params.updatedFields
      );
      if (response && response.status === 200) {
        commit("UPDATE_USER", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async USER_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("users", id);
      commit("DELETE_USER", id);
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
  FETCH_END(state, users) {
    state.isLoading = false;
    state.users = users;
    state.errors = {};
  },
  CREATE_USER(state, user) {
    state.users.data.unshift(user);
    state.errors = {};
  },
  UPDATE_USER(state, user) {
    const index = state.users.data.findIndex(item => item.id === user.id);
    state.users.data.splice(index, 1, user);
    state.errors = {};
  },
  DELETE_USER(state, id) {
    const index = state.users.data.findIndex(item => item.id === id);
    state.users.data.splice(index, 1);
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
