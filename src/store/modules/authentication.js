import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

const state = {
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },

  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  REGISTER(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/register", credentials)
        .then(response => {
          if (response && response.status === 200) {
            context.commit("SET_AUTH", response.data);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  LOGIN(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/login", credentials)
        .then(response => {
          if (response && response.status === 200) {
            context.commit("SET_AUTH", response.data);
            resolve(response);
          }
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },

  FORGOT_PASSWORD(email) {
    return new Promise((reslove, reject) => {
      ApiService.post("auth/forgotpassword", email)
        .then(response => {
          if (response && response.status === 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async UPDATE_DETAILS({ commit }, userUpdate) {
    try {
      const response = await ApiService.put("auth/updatedetails", userUpdate);
      if (response && response.status === 200) {
        commit("UPDATE_DATA", response.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  async UPDATE_AVATAR({ commit }, avatar) {
    try {
      const response = await ApiService.post("auth/updateavatar", avatar);
      if (response && response.status === 200) {
        commit("UPDATE_DATA", response.data);
      }
    } catch (error) {
      throw new Error(error);
    }
    // return new Promise((reslove, reject) => {
    //   ApiService.post("auth/updateavatar", avatar)
    //     .then(response => {
    //       console.log(response);

    //       reslove(response);
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
  },

  CHECK_AUTH(context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return new Promise((resolve, reject) => {
        ApiService.get("auth/me")
          .then(response => {
            if (response && response.status === 200) {
              context.commit("SET_AUTH", response.data);
              resolve(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    } else {
      context.commit("PURGE_AUTH");
    }
  },

  LOGOUT(context) {
    context.commit("PURGE_AUTH");
  }
};

const mutations = {
  SET_AUTH(state, params) {
    state.isAuthenticated = true;
    state.user = params.user;
    JwtService.saveToken(params.access_token);
  },

  PURGE_AUTH(state) {
    state.isAuthenticated = false;
    state.user = null;
    JwtService.destroyToken();
  },

  UPDATE_DATA(state, data) {
    state.user = data;
  },

  UPDATE_AVATAR(state, data) {
    state.user.avatar = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
