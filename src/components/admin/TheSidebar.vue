<template>
  <!-- Page Sidebar -->
  <div class="page-sidebar">
    <div class="profile-menu">
      <router-link :to="{ name: 'Profile' }">
        <img v-if="isAuthenticated" :src="getUrlImage(currentUser.avatar)" class="img-fulid" />
      </router-link>
    </div>
    <div class="page-sidebar-inner">
      <div class="page-sidebar-menu">
        <ul>
          <li>
            <router-link
              :to="{ name: 'Home' }"
              data-toggle="tooltip"
              data-placement="right"
              title="Home"
            >
              <i class="fas fa-home"></i>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Dashboard' }"
              data-toggle="tooltip"
              data-placement="right"
              title="Dashboard"
            >
              <i class="fas fa-rocket"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- /Page Sidebar -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('authentication', ['currentUser', 'isAuthenticated'])
  },
  methods: {
    getUrlImage(name) {
      return "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" + name;
    }
  }
};
</script>

<style>
</style>