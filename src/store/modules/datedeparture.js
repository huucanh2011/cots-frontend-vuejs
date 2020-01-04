import { CallerApiService } from "@/common/api.service";

//state
const state = {
  dates: []
};

//getters
const getters = {
  dates: state => {
    return state.dates;
  }
};

//actions
const actions = {
  async DATES_FETCH({ commit }, id) {
    return new Promise((reslove, reject) => {
      CallerApiService.get("date-departure", id)
        .then(res => {
          if (res && res.status === 200) {
            commit("DATES_FETCH", res.data);
            reslove(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  DATE_CREATE(context, date) {
    return new Promise((reslove, reject) => {
      CallerApiService.create("date-departure", date)
        .then(res => {
          if (res && res.status === 200) {
            context.commit("DATE_CREATE", res.data);
            reslove(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async DATE_DELETE(context, id) {
    try {
      const { data } = await CallerApiService.delete("d-date-departure", id);
      context.commit("DATE_DELETE", data.id);
    } catch (error) {
      console.log(error);
    }
  }
};

//mutations
const mutations = {
  DATES_FETCH(state, dates) {
    state.dates = dates;
  },
  DATE_CREATE(state, date) {
    state.dates.push({
      id: date.id,
      date_departure: date.date_departure,
      tour_id: date.tour_id
    });
  },
  DATE_DELETE(state, id) {
    const index = state.dates.findIndex(item => item.id == id);
    state.dates.splice(index, 1);
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
