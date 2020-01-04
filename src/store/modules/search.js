import { CallerApiService } from "@/common/api.service";

//state
const state = {
  locations: [],
  tours: [],
  isLoading: false
};

//getters
const getters = {
  locations: state => {
    return state.locations;
  },

  tours: state => {
    return state.tours;
  },

  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async SEARCH({ commit }, searchText) {
    try {
      commit("FETCH_START");
      const { data } = await CallerApiService.query("search?q=" + searchText);
      commit("FETCH_TOUR_END", data.tours);
      commit("FETCH_LOCATION_END", data.locations);
    } catch (error) {
      throw new Error(err);
    }
  },

  ROLES_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    return CallerApiService.query("roles?page=" + pageNum)
      .then(({ data }) => {
        commit("FETCH_END", data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

//mutations
const mutations = {
  FETCH_START(state) {
    state.isLoading = true;
  },

  FETCH_TOUR_END(state, tours) {
    state.isLoading = false;
    state.tours = tours;
  },

  FETCH_LOCATION_END(state, locations) {
    state.isLoading = false;
    state.locations = locations;
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
