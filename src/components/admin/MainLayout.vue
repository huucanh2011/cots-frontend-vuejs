<template>
  <!-- Page Container -->
  <div class="page-container">
    <the-sidebar></the-sidebar>
    <div class="settings-overlay"></div>
    <div class="page-content">
      <the-secondary-sidebar></the-secondary-sidebar>
      <the-header></the-header>
      <div class="page-inner no-page-title">
        <div id="main-wrapper" class="fix__footer">
          <router-view></router-view>
        </div>
        <the-footer></the-footer>
      </div>
    </div>
  </div>
  <!-- Page Container -->
</template>

<script>
import TheHeader from "@/components/admin/TheHeader";
import TheSidebar from "@/components/admin/TheSidebar";
import TheSecondarySidebar from "@/components/admin/TheSecondarySidebar";
import TheFooter from "@/components/admin/TheFooter";

export default {
  name: "MainLayout",
  components: {
    TheHeader,
    TheSidebar,
    TheSecondarySidebar,
    TheFooter
  },
};
</script>

<style lang="css">
.fix__footer {
  min-height: 100vh;
}
</style>
