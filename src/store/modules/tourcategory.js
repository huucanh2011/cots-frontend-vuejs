import { CallerApiService } from "@/common/api.service";

//state
const state = {
  tourcates: [],
  isLoading: false
};

//getters
const getters = {
  tourcates: state => {
    return state.tourcates;
  },

  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async TOURCATES_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.get("tour-category");
      commit("FETCH_END", data);
    } catch (error) {
      console.log(error);
    }
  }
};

//mutations
const mutations = {
  FETCH_START(state) {
    state.isLoading = true;
  },

  FETCH_END(state, tourcates) {
    state.isLoading = false;
    state.tourcates = tourcates;
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
