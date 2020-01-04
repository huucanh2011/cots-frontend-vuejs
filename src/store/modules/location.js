import { CallerApiService } from "@/common/api.service";

//state
const state = {
  locations: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  locations: state => {
    return state.locations;
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
  async LOCATIONS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("locations");
      if (res && res.status === 200) {
        commit("FETCH_END", res.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async LOCATION_FETCH_ONE({ commit }, id) {
    return new Promise((reslove, reject) => {
      CallerApiService.get("locations", id)
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

  async LOCATIONS_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    return new Promise((reslove, reject) => {
      CallerApiService.query("search-locations?q=" + searchText)
        .then(response => {
          if (response && response.status === 200) {
            commit("FETCH_END", response.data);
            reslove(response);
          }
        })
        .catch(({ response }) => {
          commit("SET_ERROR", JSON.parse(response.data));
          reject(JSON.parse(response.data));
        });
    });
  },

  async LOCATIONS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.query(
        "locations?page=" + pageNum
      );
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async LOCATION_CREATE({ commit }, location) {
    return new Promise((reslove, reject) => {
      CallerApiService.create("locations", location)
        .then(response => {
          if (response && response.status === 200) {
            commit("CREATE_LOCATION", response.data);
            reslove(response);
          }
        })
        .catch(({ response }) => {
          commit("SET_ERROR", JSON.parse(response.data));
          reject(JSON.parse(response.data));
        });
    });
  },

  async LOCATION_UPDATE({ commit }, params) {
    return new Promise((reslove, reject) => {
      CallerApiService.update("locations", params.id, params.updatedFields)
        .then(response => {
          if (response && response.status === 200) {
            commit("UPDATE_LOCATION", response.data);
            reslove(response);
          }
        })
        .catch(({ response }) => {
          commit("SET_ERROR", JSON.parse(response.data));
          reject(JSON.parse(response.data));
        });
    });
  },

  async LOCATION_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("locations", id);
      commit("DELETE_LOCATION", id);
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
  FETCH_END(state, locations) {
    state.isLoading = false;
    state.locations = locations;
    state.errors = {};
  },
  CREATE_LOCATION(state, location) {
    state.locations.data.unshift(location);
    state.errors = {};
  },
  UPDATE_LOCATION(state, location) {
    const index = state.locations.data.findIndex(
      item => item.id === location.id
    );
    state.locations.data.splice(index, 1, location);
    state.errors = {};
  },
  DELETE_LOCATION(state, id) {
    const index = state.locations.data.findIndex(item => item.id === id);
    state.locations.data.splice(index, 1);
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
