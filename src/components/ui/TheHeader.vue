<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top border-0 shadow">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <img src="@/assets/cots-logo.png" class="img-fulid" alt="logo">
      </router-link>
      <form class="input-group" @submit.prevent="search()" style="max-width: 300px">
          <input
            class="form-control form-control-sm border-0 rounded-pill"
            size="40"
            type="text"
            v-model="searchText"
            placeholder="Tìm kiếm địa điểm, tour ..."
            style="background-color: #565e65a6; color: #f1f1f1"
          />
      </form>
      <ul class="navbar-nav ml-3 mr-auto text-uppercase">
        <li class="nav-item mr-2">
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Bảng tin</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link class="nav-link" :to="{ name: 'All Tour' }"
            >Tour</router-link
          >
        </li>
        <li class="nav-item ml-2">
          <router-link class="nav-link" :to="{ name: 'All Company' }"
            >Công ty du lịch</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav">
        <li v-if="currentUser != null" class="nav-item mr-2 text-uppercase">
          <router-link
            v-if="currentUser.role_id === 1"
            class="nav-link"
            :to="{ name: 'Dashboard' }"
          >
           Quản trị
          </router-link>
          <router-link
            v-if="currentUser.role_id === 2"
            class="nav-link"
            :to="{ name: 'Tour Management' }"
          >
            Quản lý tour
          </router-link>
        </li>
        <li v-if="currentUser != null" class="nav-item mr-2 text-uppercase">
          <router-link
            v-if="currentUser.role_id === 2"
            class="nav-link"
            :to="{ name: 'Tour Order' }"
          >
            Đặt tour
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <a class="nav-link text-uppercase" @click="openModalLogin()" href="#">
            Đăng nhập
          </a>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <div id="myDropdown" class="dropdown">
            <a @click="onClickDropMenu()" class="nav-link p-0" href="#">
              <span class="mr-1">{{ currentUser.name }}</span>
              <img :src="getUrlImage(currentUser.avatar)" class="rounded-circle img-fluid" style="height: 30px; width: 30px">
            </a>

            <div id="myDropdownMenu" class="dropdown-menu dropdown-menu-right" style="cursor: pointer">
              <a class="dropdown-item" @click="getProfile()">Trang cá nhân</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout()">Đăng xuất</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <!-- Login -->
    <div
      id="modal__login"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="modalTitle">Đăng nhập</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              v-if="serverError"
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{{ serverError }}</strong>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form @submit.prevent="authLogin()">
              <ValidationObserver v-slot="{ valid }">
                <div class="form-group">
                  <label for>Email</label>
                  <ValidationProvider
                    name="email"
                    rules="required|email|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      placeholder="Nhập email"
                      v-model="login.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for>Mật khẩu</label>
                  <ValidationProvider
                    name="password"
                    rules="required|min:6|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      placeholder="Nhập mật khẩu"
                      v-model="login.password"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <!-- <ValidationProvider name="captcha" rules="required" v-slot="{ errors }">
                  <vue-recaptcha
                    :class="{ 'is-invalid': errors[0] }"
                    sitekey="6Lfi6sEUAAAAAFN7mQ_k-Ugn2gK-mrR68OnS71Kq"
                    :loadRecaptchaScript="true"
                  ></vue-recaptcha>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider> -->
                <div class="custom-control custom-checkbox form-group">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="remember"
                  />
                  <label class="custom-control-label" for="remember"
                    >Nhớ đăng nhập</label
                  >
                </div>
                <button
                  type="submit"
                  class="btn btn-dark btn-block"
                  :disabled="!valid"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Đăng nhập
                </button>
              </ValidationObserver>
            </form>
          </div>
          <div class="modal-footer">
            <a
              href
              class="text-success mr-auto"
              data-dismiss="modal"
              @click="openModalRegister"
              >Đăng ký</a
            >
            <a
              href
              class="text-danger ml-auto"
              data-dismiss="modal"
              @click="openModalForgotPassword"
              >Quên mật khẩu?</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Login -->
    <!-- Register -->
    <div
      id="modal__register"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="modalTitle">Đăng ký</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              v-if="serverError"
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <div v-for="(value, index) in serverError" :key="index">
                <strong>{{ value[0] }}</strong>
              </div>

              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form @submit.prevent="authRegister()">
              <ValidationObserver v-slot="{ valid }">
                <div class="form-group">
                  <label for>Tên</label>
                  <ValidationProvider
                    name="name"
                    rules="required|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      placeholder="Nhập tên"
                      v-model="register.name"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for>Email</label>
                  <ValidationProvider
                    name="email"
                    rules="required|email|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      placeholder="Nhập email"
                      v-model="register.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for>Mật khẩu</label>
                  <ValidationProvider
                    name="password"
                    rules="required|min:6|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      placeholder="Nhập mật khẩu"
                      v-model="register.password"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label class="mr-3">Bạn là</label>
                  <div
                    class="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      class="custom-control-input"
                      type="radio"
                      name="chooseRole"
                      id="chooseRole1"
                      @click="chooseRole(3)"
                      checked
                    />
                    <label class="custom-control-label" for="chooseRole1">
                      Người dùng
                    </label>
                  </div>
                  <div
                    class="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      class="custom-control-input"
                      type="radio"
                      name="chooseRole"
                      id="chooseRole2"
                      @click="chooseRole(2)"
                    />
                    <label class="custom-control-label" for="chooseRole2">
                      Đối tác
                    </label>
                  </div>
                </div>
                <button
                  :disabled="!valid"
                  type="submit"
                  class="btn btn-dark btn-block"
                >
                  Đăng ký
                </button>
              </ValidationObserver>
            </form>
          </div>
          <div class="modal-footer">
            <a
              href
              class="text-success mr-auto"
              data-dismiss="modal"
              @click="openModalLogin"
              >Đăng nhập</a
            >
            <a
              href
              class="text-danger ml-auto"
              data-dismiss="modal"
              @click="openModalForgotPassword"
              >Quên mật khẩu?</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Register -->
    <!-- Forgot password -->
    <div
      id="modal__forgot"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="modalTitle">Quên mật khẩu</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="forgotPassword()">
              <ValidationObserver v-slot="{ valid }">
                <div class="form-group">
                  <ValidationProvider
                    name="email"
                    rules="required|min:6|max:255"
                    v-slot="{ errors }"
                  >
                    <label for>Email</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      placeholder="Nhập email"
                      v-model="forgot.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <button
                  type="submit"
                  class="btn btn-dark btn-block"
                  :disabled="!valid"
                >
                  Khôi phục
                </button>
              </ValidationObserver>
            </form>
          </div>
          <div class="modal-footer">
            <a
              href
              class="text-success mr-auto"
              data-dismiss="modal"
              @click="openModalLogin"
              >Đăng nhập</a
            >
            <a
              href
              class="text-success ml-auto"
              data-dismiss="modal"
              @click="openModalRegister"
              >Đăng ký</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Forgot password -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import VueRecaptcha from "vue-recaptcha";
import axios from "axios";

export default {
  data: () => ({
    login: {
      email: "",
      password: ""
    },
    register: {
      name: "",
      email: "",
      password: "",
      roleId: 3,
      confirmPassword: ""
    },
    forgot: {
      email: ""
    },
    searchText: "",
    isLoading: false,
    isAdmin: false,
    serverError: ""
  }),
  components: {
    VueRecaptcha
  },
  computed: {
    ...mapGetters("authentication", ["currentUser", "isAuthenticated"])
  },
  methods: {
    ...mapActions("authentication", [
      "LOGIN",
      "REGISTER",
      "LOGOUT",
      "FORGOT_PASSWORD"
    ]),
    getProfile() {
      this.$router.push({ name: 'Profile' })
      this.onClickDropMenu()
    },
    onClickDropMenu() {
      let drop_menu = document.getElementById("myDropdownMenu");
      let drop_menu_wrapper = document.getElementById("myDropdown");
      (!drop_menu.classList.contains("show")) ? drop_menu.classList.add("show") : drop_menu.classList.remove("show");
      (!drop_menu_wrapper.classList.contains("show")) ? drop_menu_wrapper.classList.add("show") : drop_menu_wrapper.classList.remove("show");
    },
    search() {
      let query = this.searchText;
      this.$router.push({ name: "Search Page", query: { q: query } });
      store.dispatch("search/SEARCH", query);
    },
    getUrlImage(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" +
        name
      );
    },
    chooseRole(role) {
      this.register.roleId = role;
    },
    openModalLogin() {
      $("#modal__login").modal("show");
    },
    authLogin() {
      this.isLoading = true;
      this.LOGIN({
        email: this.login.email,
        password: this.login.password
      })
        .then(response => {
          $("#modal__login").modal("hide");
          this.$toast.success({
            color: "#51A351",
            title: "Login successfully!",
            message: "You are already logged in"
          });
          this.isLoading = false;
        })
        .catch(error => {
          this.serverError = "Email or password is incorrect!";
          this.login.email = "";
          this.login.password = "";
          this.isLoading = false;
        });
    },
    logout() {
      this.LOGOUT();
    },
    openModalRegister() {
      $("#modal__register").modal("show");
    },
    authRegister() {
      this.isLoading = true;
      this.REGISTER({
        name: this.register.name,
        email: this.register.email,
        password: this.register.password,
        role_id: this.register.roleId
      })
        .then(response => {
          this.isLoading = false;
          $("#modal__register").modal("hide");
          this.$toast.success({
            color: "#51A351",
            title: "Register successfully!",
            message: "You are already logged in"
          });
        })
        .catch(error => {
          this.serverError = JSON.parse(error.response.data);
          this.isLoading = false;
        });
    },
    openModalForgotPassword() {
      $("#modal__forgot").modal("show");
    },
    forgotPassword() {
      this.FORGOT_PASSWORD("admin@admin.com");
      $("#modal__forgot").modal("hide");
      this.$toast.success({
        color: "#51A351",
        title: "Success!",
        message: "Please check your email!"
      });
      this.isLoading = false;
    }
  }
};
</script>

<style lang="css"></style>
