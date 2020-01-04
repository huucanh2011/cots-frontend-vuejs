import { CallerApiService } from "@/common/api.service";

//state
const state = {
  ratings: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  ratings: state => {
    return state.ratings;
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
  async RATINGS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.get("ratings");
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async RATINGS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("ratings?page=" + pageNum);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async RATING_CREATE({ commit }, rating) {
    await CallerApiService.create("ratings", rating);
    // try {
    //   const { data } = 
    //   console.log(data);
    //   commit("CREATE_RATING", data);
    // } catch ({ response }) {
    //   commit("SET_ERROR", JSON.parse(response.data));
    //   throw new Error(JSON.parse(response.data));
    // }
  },

  async RATING_UPDATE({ commit }, params) {
    try {
      const { data } = await CallerApiService.update("ratings", params.id, params.updatedFields);
      commit("UPDATE_RATING", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async RATING_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("ratings", id);
      commit("DELETE_RATING", id);
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
  FETCH_END(state, ratings) {
    state.isLoading = false;
    state.ratings = ratings;
    state.errors = {};
  },
  CREATE_RATING(state, rating) {
    state.ratings.data.push(rating);
    state.errors = {};
  },
  UPDATE_RATING(state, rating) {
    const index = state.ratings.data.findIndex(item => item.id === rating.id);
    state.ratings.data.splice(index, 1, rating);
    state.errors = {};
  },
  DELETE_RATING(state, id) {
    const index = state.ratings.data.findIndex(item => item.id == id);
    state.ratings.data.splice(index, 1);
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
