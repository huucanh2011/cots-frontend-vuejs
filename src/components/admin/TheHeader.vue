<template>
  <!-- Page Header -->
  <div class="page-header">
    <nav class="navbar navbar-default navbar-expand-md">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <div class="logo-sm">
            <router-link class="logo-box" :to="{ name: 'Home' }">
              <span>Home</span>
            </router-link>
          </div>
        </div>
        <button class="btn btn-info" @click="logout()">Đăng xuất</button>
      </div>
      <!-- /.container-fluid -->
    </nav>
  </div>
  <!-- /Page Header -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("authentication", ["currentUser"])
  },
  methods: {
    ...mapActions("authentication", ["LOGOUT"]),
    getUrlImage(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" +
        name
      );
    },
    logout() {
      this.LOGOUT().then(response => {
        this.$router.push({ name: 'Home'});
      })
    }
  }
};
</script>

<style></style>
