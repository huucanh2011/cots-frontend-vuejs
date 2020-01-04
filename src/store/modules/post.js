import { CallerApiService } from "@/common/api.service";

//state
const state = {
  posts: [],
  errors: {},
  isLoading: false
};

//getters
const getters = {
  posts: state => {
    return state.posts;
  },
  errors: state => {
    return state.errors;
  },
  isPostLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async POSTS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.get("posts");
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async POSTS_PAGINATE({ commit }, pageNum) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.get("posts?page=" + pageNum);
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async POSTS_SEARCH({ commit }, searchText) {
    commit("FETCH_START");
    try {
      const response = await CallerApiService.query(
        "search-posts?q=" + searchText
      );
      if (response && response.status === 200) {
        commit("FETCH_END", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async POST_CHANGE_STATUS({ commit }, post) {
    try {
      const response = await CallerApiService.create("block-post", post);
      if (response && response.status === 200) {
        commit("UPDATE_POST", response.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },

  async POST_CREATE({ commit }, post) {
    return new Promise((reslove, reject) => {
      CallerApiService.create("posts", post)
        .then(response => {
          if (response && response.status === 200) {
            commit("CREATE_POST", response.data);
            reslove(response);
          }
        })
        .catch(({ response }) => {
          reject(response);
          commit("SET_ERROR", JSON.parse(response.data));
        });
    });
  },

  async POST_UPDATE({ commit }, params) {
    return new Promise((reslove, reject) => {
      CallerApiService.update("posts", params.id, params.updatedFields)
        .then(response => {
          if (response && response.status === 200) {
            commit("UPDATE_POST", response.data);
            reslove(response);
          }
        })
        .catch(({ response }) => {
          reject(response);
          commit("SET_ERROR", JSON.parse(response.data));
        });
    });
  },

  async POST_DELETE({ commit }, id) {
    try {
      await CallerApiService.delete("posts", id);
      commit("DELETE_POST", id);
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
  FETCH_END(state, posts) {
    state.isLoading = false;
    state.posts = posts;
    state.errors = {};
  },
  CREATE_POST(state, post) {
    state.posts.data.unshift(post);
    state.errors = {};
  },
  UPDATE_POST(state, post) {
    const index = state.posts.data.findIndex(item => item.id === post.id);
    state.posts.data.splice(index, 1, post);
    state.errors = {};
  },
  DELETE_POST(state, id) {
    const index = state.posts.data.findIndex(item => item.id === id);
    state.posts.data.splice(index, 1);
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
