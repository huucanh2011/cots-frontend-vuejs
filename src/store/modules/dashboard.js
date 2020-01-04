import { CallerApiService } from "@/common/api.service";

//state
const state = {
  counts: [],
  tourOrders: [],
  tourOrdersMonthly: [],
  postsMonthly: [],
  years: [],
  isLoading: false
};

//getters
const getters = {
  counts: state => {
    return state.counts;
  },
  tourOrders: state => {
    return state.tourOrders;
  },
  tourOrdersMonthly: state => {
    return state.tourOrdersMonthly;
  },
  postsMonthly: state => {
    return state.postsMonthly;
  },
  years: state => {
    return state.years;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async DATAS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("dashboard");
      if (res && res.status === 200) {
        commit("FETCH_COUNT_END", res.data.count);
        commit("FETCH_TOUR_ORDER_END", res.data.tourOrders);
        commit("FETCH_TOUR_ORDER_MONTHLY_END", res.data.tourOrdersMonthly);
        commit("FETCH_POST_MONTHLY_END", res.data.postsMonthly);
        commit("FETCH_TOUR_ORDER_YEAR_END", res.data.years);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};

//mutations
const mutations = {
  FETCH_START(state) {
    state.isLoading = true;
  },
  FETCH_COUNT_END(state, counts) {
    state.isLoading = false;
    state.counts = counts;
  },
  FETCH_TOUR_ORDER_END(state, tourOrders) {
    state.isLoading = false;
    state.tourOrders = tourOrders;
  },
  FETCH_TOUR_ORDER_MONTHLY_END(state, tourOrdersMonthly) {
    state.isLoading = false;
    state.tourOrdersMonthly = tourOrdersMonthly;
  },
  FETCH_POST_MONTHLY_END(state, postsMonthly) {
    state.isLoading = false;
    state.postsMonthly = postsMonthly;
  },
  FETCH_TOUR_ORDER_YEAR_END(state, years) {
    state.isLoading = false;
    state.years = years;
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
