import { CallerApiService } from "@/common/api.service";

//state
const state = {
  tours: [],
  isLoading: false
};

//getters
const getters = {
  tours: state => {
    return state.tours;
  },

  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  TOURS_FETCH({ commit }) {
    commit("FETCH_START");
    return CallerApiService.get("tour-partner")
      .then(response => {
        if (response && response.status === 200) {
          commit("FETCH_END", response.data);
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  async TOUR_FETCH_ONE(context, id) {
    return new Promise((reslove, reject) => {
      CallerApiService.get("tours", id)
        .then(response => {
          if (response && response.status === 200) {
            reslove(response);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  TOURS_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    return CallerApiService.query("search-tours?q=" + searchText)
      .then(response => {
        if (response && response.status === 200) {
          commit("FETCH_END", response.data);
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  TOURS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    return CallerApiService.query("tours?page=" + pageNum)
      .then(response => {
        if (response && response.status === 200) {
          commit("FETCH_END", response.data);
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  async TOUR_CREATE({ commit }, tour) {
    return new Promise((reslove, reject) => {
      CallerApiService.create("tours", tour)
        .then(response => {
          if (response && response.status === 200) {
            reslove(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async TOUR_UPDATE(context, params) {
    return new Promise((reslove, reject) => {
      CallerApiService.update("tours", params.id, params.updatedFields)
        .then(response => {
          if (response && response.status === 200) {
            reslove(response);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async TOUR_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("tours", id);
      commit("DELETE_TOUR", id);
    } catch (error) {
      throw new Error(error);
    }
  },

  async TOUR_BLOCK({ commit }, tour) {
    try {
      const response = await CallerApiService.create("block-tour", tour);
      if (response && response.status === 200) {
        commit("BLOCK_TOUR", response.data);
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
  FETCH_END(state, tours) {
    state.isLoading = false;
    state.tours = tours;
  },
  BLOCK_TOUR(state, tour) {
    const index = state.tours.data.findIndex(item => item.id == tour.id);
    state.tours.data.splice(index, 1, {
      id: tour.id,
      tour_name: tour.tour_name,
      to_place: tour.to_place,
      from_place: tour.from_place,
      number_days: tour.number_days,
      number_persons: tour.number_persons,
      tour_price: tour.tour_price,
      tour_cate: {
        cate_name: tour.tour_cate.cate_name
      },
      is_active: tour.is_active
    });
  },
  DELETE_TOUR(state, id) {
    const index = state.tours.data.findIndex(item => item.id == id);
    state.tours.data.splice(index, 1);
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
