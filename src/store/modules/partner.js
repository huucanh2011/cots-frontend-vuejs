import { CallerApiService } from "@/common/api.service";

//state
const state = {
  partners: [],
  errors: {},
  partnersBlock: [],
  isLoading: false
};

//getters
const getters = {
  partners: state => {
    return state.partners;
  },
  errors: state => {
    return state.errors;
  },
  partnersBlock: state => {
    return state.partnersBlock;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async PARTNERS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.get("partners");
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async PARTNER_FETCH_ONE(context, id) {
    return new Promise((reslove, reject) => {
      CallerApiService.get("partners", id)
        .then(res => {
          reslove(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async PARTNERSBLOCK_FETCH({ commit }) {
    const { data } = await CallerApiService.get("count-partner-block");      
    commit("FETCH_PARTNERSBLOCK", data);
  },

  async PARTNERS_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("search-partners?q=" + searchText);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async PARTNERS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("partners?page=" + pageNum);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async PARTNER_CHANGE_STATUS(context, user) {
    try {
      const { data } = await CallerApiService.create("block-user", user);
      context.commit("UPDATE_PARTNER", data);
      context.dispatch("partner/PARTNERSBLOCK_FETCH", {}, { root: true });
    } catch ({ response }) {
      context.commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async PARTNER_CREATE({ commit }, partner) {
    try {
      const { data } = await CallerApiService.create("partners", partner);
      commit("CREATE_PARTNER", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async PARTNER_UPDATE({ commit }, params) {
    try {
      const { data } = await CallerApiService.update("partners", params.id, params.updatedFields);
      commit("UPDATE_PARTNER", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async PARTNER_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("partners", id);
      commit("DELETE_PARTNER", id);
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
  FETCH_END(state, partners) {
    state.isLoading = false;
    state.partners = partners;
    state.errors = {};
  },
  CREATE_PARTNER(state, partner) {
    state.partners.data.unshift(partner);
    state.errors = {};
  },
  UPDATE_PARTNER(state, partner) {
    const index = state.partners.data.findIndex(item => item.id === partner.id);
    state.partners.data.splice(index, 1, partner)
    state.errors = {};
  },
  DELETE_PARTNER(state, id) {
    const index = state.partners.data.findIndex(item => item.id === id);
    state.partners.data.splice(index, 1)
    state.errors = {};
  },
  FETCH_PARTNERSBLOCK(state, partnersBlock) {
    state.partnersBlock = partnersBlock;
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
