<template>
  <div>
    <the-header></the-header>
    <div class="container-fulid my-margin" style="margin-top: 6rem">
      <transition name="fade">
      <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/ui/TheHeader";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserLayout",
  components: {
    TheHeader
  },
};
</script>

<style>
</style>
