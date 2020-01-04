<template>
  <div class="secondary-sidebar">
    <div class="secondary-sidebar-bar">
      <router-link :to="{ name: 'Dashboard' }" class="logo-box">admin</router-link>
    </div>
    <div class="secondary-sidebar-menu">
      <ul class="accordion-menu">
        <li>
          <router-link :to="{ name: 'Dashboard' }">
            <i class="menu-icon icon-apps"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="menu-divider"></li>
        <li>
          <router-link :to="{ name: 'Role' }">
            <i class="menu-icon icon-hammer2"></i>
            <span>Quyền</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Decentralization' }">
            <i class="menu-icon icon-user-check"></i>
            <span>Phân quyền</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Partner' }">
            <i class="menu-icon icon-user-tie"></i>
            Đối tác<span class="badge badge-primary">{{ partnersBlock }}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'User' }">
            <i class="menu-icon icon-users"></i>
            <span>Thành viên</span>
          </router-link>
        </li>
        <li class="menu-divider"></li>
        <li>
          <router-link :to="{ name: 'Location' }">
            <i class="menu-icon icon-location2"></i>
            <span>Địa điểm</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Post' }">
            <i class="menu-icon icon-newspaper"></i>
            <span>Bài đăng</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Rating' }">
            <i class="menu-icon icon-smile"></i>
            <span>Đánh giá</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Comment' }">
            <i class="menu-icon icon-bubbles2"></i>
            <span>Bình luận</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  computed: {
    ...mapGetters("partner", ["partnersBlock"])
  },
  created() {
    store.dispatch("partner/PARTNERSBLOCK_FETCH");
  }
};
</script>

<style></style>
