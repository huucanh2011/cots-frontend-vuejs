import { CallerApiService } from "@/common/api.service";

//state
const state = {
  images: [],
  isLoading: false
};

//getters
const getters = {
  images: state => {
    return state.images;
  },

  isLoadingImage: state => {
    return state.isLoading;
  }
};

//actions
const actions = {
  async IMAGES_FETCH({ commit }) {
    commit("FETCH_START");
    try {
      const res = await CallerApiService.get("image-locations");
      if (res && res.status === 200) {
        commit("FETCH_END", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async IMAGES_CREATE(context, image) {
    await CallerApiService.create("image-locations", image);
    context.dispatch("imagelocation/IMAGES_FETCH", {}, { root: true });
  },

  async IMAGES_DELETE(context, id) {
    await CallerApiService.delete("image-locations", id);
    context.dispatch("imagelocation/IMAGES_FETCH", {}, { root: true });
  }
};

//mutations
const mutations = {
  FETCH_START(state) {
    state.isLoading = true;
  },

  FETCH_END(state, images) {
    state.isLoading = false;
    state.images = images;
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
