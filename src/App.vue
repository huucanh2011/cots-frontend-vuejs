<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();
  },
  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  }
};
</script>

<style lang="css">
/* :root {
  font-size: 16px;
} */
html,
body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  font-family: "ROBOTO";
  line-height: 1.5;
  /* font-size: 12px !important; */
  color: #1a1a1a;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #565e65a6;
}

a:hover {
  text-decoration: none;
}

@media (max-width: 576px) {
  .my-margin {
    margin-right: 15px;
    margin-left: 15px;
  }
}

@media (min-width: 576px) {
  .my-margin {
    margin-right: 25px;
    margin-left: 25px;
  }
}

@media (min-width: 768px) {
  .my-margin {
    margin-right: 25px;
    margin-left: 25px;
  }
}

@media (min-width: 992px) {
  .my-margin {
    margin-right: 40px;
    margin-left: 40px;
  }
}

@media (min-width: 1200px) {
  .my-margin {
    margin-right: 70px;
    margin-left: 70px;
  }
}

.sticky-top {
  top: 80px !important;
}

.height--img--cover {
  height: 500px;
}

.heigh--img--post{
  height: 315px;
}
</style>
