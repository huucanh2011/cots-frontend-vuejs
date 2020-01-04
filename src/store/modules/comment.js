import { CallerApiService } from "@/common/api.service";

//state
const state = {
  comments: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  comments: state => {
    return state.comments;
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
  async COMMENTS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.get("comments");
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async COMMENTS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const { data } = await CallerApiService.query("comments?page=" + pageNum);
      commit("FETCH_END", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async COMMENT_CREATE({ commit }, comment) {
    try {
      const { data } = await CallerApiService.create("comments", comment);
      commit("CREATE_COMMENT", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async COMMENT_UPDATE({ commit }, params) {
    try {
      const { data } = await CallerApiService.update("comments", params.id, params.updatedFields);
      commit("UPDATE_COMMENT", data);
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async COMMENT_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("comments", id);
      commit("DELETE_COMMENT", id);
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
  FETCH_END(state, comments) {
    state.isLoading = false;
    state.comments = comments;
    state.errors = {};
  },
  CREATE_COMMENT(state, comment) {
    state.comments.data.push(comment);
    state.errors = {};
  },
  UPDATE_COMMENT(state, comment) {
    const index = state.comments.data.findIndex(item => item.id == comment.id);
    state.comments.data.splice(index, 1, comment);
    state.errors = {};
  },
  DELETE_COMMENT(state, id) {
    const index = state.comments.data.findIndex(item => item.id == id);
    state.comments.data.splice(index, 1);
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
