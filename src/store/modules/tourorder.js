import { CallerApiService } from "@/common/api.service";

//state
const state = {
  tourOrdersActive: [],
  tourOrdersBlocked: [],
  isLoadingA: false,
  isLoadingB: false,
};

//getters
const getters = {
  tourOrdersActive: state => {
    return state.tourOrdersActive;
  },
  tourOrdersBlocked: state => {
    return state.tourOrdersBlocked;
  },
  isLoadingA: state => {
    return state.isLoadingA;
  },
  isLoadingB: state => {
    return state.isLoadingB;
  }
};

//actions
const actions = {
  async TOUR_ORDER_FETCH({ commit }) {
    commit("FETCH_ACTIVE_START");
    commit("FETCH_BLOCKED_START");
    try {
      const { data } = await CallerApiService.get("tour-orders");    
      commit("FETCH_ACTIVE_END", data.tourOrdersActive);
      commit("FETCH_BLOCKED_END", data.tourOrdersBlocked);      
    } catch (error) {
      throw new Error(error);
    }
  },
  
  async TOUR_ORDER_FILTER({ commit }, date) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("filter-tour-orders?date=" + date);
      commit("FETCH_END", data)
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_ORDER_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("tour-orders?page=" + pageNum);
      commit("FETCH_END", data);
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_ORDER_CREATE({ commit }, tourOrder) {
    return new Promise((reslove, reject) => {
      CallerApiService.create("tour-orders", tourOrder)
        .then(({ data }) => {
          reslove(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async TOUR_ORDER_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("tour-orders", id);
      commit("DELETE_TOUR_ORDER", id);
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_ORDER_ACTIVE({ commit }, tourOrder) {
    try {
      const { data } = await CallerApiService.create("active-tourorder", tourOrder);
      commit("ACTIVE_TOUR_ORDER", data)
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_ORDER_BLOCK({ commit }, tourOrder) {
    try {
      const { data } = await CallerApiService.create("active-tourorder", tourOrder);
      commit("BLOCK_TOUR_ORDER", data)
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_ORDER_ACTIVE_SEARCH({ commit }, searchText) {
    commit("FETCH_ACTIVE_START");
    try {
      const { data } = await CallerApiService.query("search-tour-orders-active?q=" + searchText);
      commit("FETCH_ACTIVE_END", data);
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_ORDER_BLOCK_SEARCH({ commit }, searchText) {
    commit("FETCH_BLOCKED_START");
    try {
      const { data } = await CallerApiService.query("search-tour-orders-block?q=" + searchText);      
      commit("FETCH_BLOCKED_END", data);
    } catch (error) {
      throw new Error(error);
    }
  },
};

//mutations
const mutations = {
  FETCH_ACTIVE_START(state) {
    state.isLoadingA = true;
  },
  FETCH_BLOCKED_START(state) {
    state.isLoadingB = true;
  },
  FETCH_ACTIVE_END(state, tourOrdersActive) {
    state.isLoadingA = false;
    state.tourOrdersActive = tourOrdersActive;
  },
  FETCH_BLOCKED_END(state, tourOrdersBlocked) {
    state.isLoadingB = false;
    state.tourOrdersBlocked = tourOrdersBlocked;
  },
  ACTIVE_TOUR_ORDER(state, tourOrder) {
    state.isLoadingA = false;
    const index = state.tourOrdersBlocked.data.findIndex(item => item.id == tourOrder.id);
    state.tourOrdersBlocked.data.splice(index, 1)
    state.tourOrdersActive.data.unshift(tourOrder)
  },
  BLOCK_TOUR_ORDER(state, tourOrder) {
    state.isLoadingB = false;
    const index = state.tourOrdersActive.data.findIndex(item => item.id == tourOrder.id);
    state.tourOrdersActive.data.splice(index, 1)
    state.tourOrdersBlocked.data.unshift(tourOrder)
  },
  DELETE_TOUR_ORDER(state, id) {
    const index = state.tourOrders.data.findIndex(item => item.id == id);
    state.tourOrders.data.splice(index, 1);
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
