import { CallerApiService } from "@/common/api.service";

//state
const state = {
  posts: [],
  comments: [],
  topLocations: [],
  topPartners: [],
  isLoading: false
};

//getters
const getters = {
  posts: state => {
    return state.posts;
  },
  comments: state => {
    return state.comments;
  },
  topLocations: state => {
    return state.topLocations;
  },
  topPartners: state => {
    return state.topPartners;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async POSTS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("index-home");
      if (res && res.status === 200) {
        commit("FETCH_POST", res.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async COMMENTS_FETCH({ commit }) {
    try {
      const res = await CallerApiService.get("comment-home");
      if (res && res.status === 200) {
        commit("FETCH_COMMENT", res.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async FETCH_MORE_DATA({ commit }, pageNum) {
    try {
      const res = await CallerApiService.query(`index-home?page=${pageNum}`);
      if (res && res.status === 200) {
        commit("PAGINATE_POST", res.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async TOP_LOCATIONS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("top-location");
      if (res && res.status === 200) {
        commit("FETCH_LOCATION", res.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async TOP_PARTNERS_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("top-partner");
      if (res && res.status === 200) {
        commit("FETCH_PARTNER", res.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async POST_CREATE({ commit }, post) {
    return new Promise((reslove, reject) => {
      CallerApiService.create("posts", post)
        .then(res => {
          if (res && res.status === 200) {
            commit("CREATE_POST", res.data);
            reslove(res);
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
        .then(res => {
          if (res && res.status === 200) {
            commit("UPDATE_POST", res.data);
            reslove(res);
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
  },
  async COMMENT_CREATE({ commit }, comment) {
    try {
      const res = await CallerApiService.create("comments", comment);
      if (res && res.status === 200) {
        commit("CREATE_COMMENT", res.data);
      }
    } catch ({ response }) {
      commit("SET_ERROR", JSON.parse(response.data));
      throw new Error(JSON.parse(response.data));
    }
  },
  async COMMENT_UPDATE({ commit }, params) {
    try {
      const res = await CallerApiService.update(
        "comments",
        params.id,
        params.updatedFields
      );
      if (res && res.status === 200) {
        commit("UPDATE_COMMENT", res.data);
      }
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
  FETCH_START(state) {
    state.isLoading = true;
  },
  FETCH_POST(state, posts) {
    state.posts = posts;
    state.isLoading = false;
  },
  FETCH_COMMENT(state, comments) {
    state.comments = comments;
    state.isLoading = false;
  },
  FETCH_LOCATION(state, locations) {
    state.topLocations = locations;
    state.isLoading = false;
  },
  FETCH_PARTNER(state, partners) {
    state.topPartners = partners;
    state.isLoading = false;
  },
  CREATE_POST(state, post) {
    state.posts.data.unshift(post);
  },
  UPDATE_POST(state, post) {
    const index = state.posts.data.findIndex(item => item.id === post.id);
    state.posts.data.splice(index, 1, post);
  },
  DELETE_POST(state, id) {
    const index = state.posts.data.findIndex(item => item.id === id);
    state.posts.data.splice(index, 1);
  },
  CREATE_COMMENT(state, comment) {
    state.comments.push(comment);
  },
  UPDATE_COMMENT(state, comment) {
    const index = state.comments.findIndex(item => item.id === comment.id);
    state.comments.splice(index, 1, comment);
  },
  DELETE_COMMENT(state, id) {
    const index = state.comments.findIndex(item => item.id === id);
    state.comments.splice(index, 1);
  },
  PAGINATE_POST(state, posts) {
    posts.data.map(item => state.posts.data.push(item));
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
