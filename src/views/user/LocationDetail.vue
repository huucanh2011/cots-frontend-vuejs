<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Chi tiết địa điểm</li>
      </ol>
    </nav>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-md-12">
        <div class="profile-cover shadow">
          <carousel :data="getImageLocationData()" direction="down" :controls="false" indicator-type="disc" :interval="3000">
          </carousel>
        </div>
        <div class="profile-header">
          <div class="ml-0 profile-name">
            <h3>{{ location.location_name }}</h3>
          </div>
          <div class="profile-header-menu">
            <ul class="list-unstyled">
              <li><a class="text-warning">{{ location.avg_location_scores | myRating }}<i class="fas fa-star ml-2"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-3 pr-2">
        <div class="card shadow rounded-lg border-0 sticky-top">
          <div class="card-body">
            <h5 class="card-title text-center">Thông tin</h5>
            <blockquote class="blockquote mb-0">
              <h5 class="mb-2">{{ location.description }}</h5>
              <footer class="blockquote-footer">Địa chỉ: <cite :title="location.address">{{ location.address }}</cite></footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div class="col-md-6 px-2">
        <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else v-for="(post, index) in posts.data" :key="index" class="card shadow-sm rounded-lg border-0">
        <div class="card-body">
          <div class="post">
            <div class="post-header">
              <img :src="getUrlImage(post.user.avatar)" class="border" />
              <div class="d-flex flex-row">
                <div class="d-flex flex-column post-info">
                  <div class="d-flex flex-row">
                    <router-link class="text-center text-info mr-4" :to="{ name: 'Location Detail', params: { locationId: post.location.id } }">
                      <i class="fas fa-map-marker-alt"></i> {{ post.location.location_name }}                  
                    </router-link>
                    <span class="text-warning mr-auto">{{ post.post_scores }}<i class="fas fa-star mx-1"></i></span>
                  </div>
                  <div class="d-flex flex-row">
                    <span class="post-author mr-4">{{ post.user.name }}</span>
                    <span class="post-date">{{ post.created_at | myDate2 }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="post-body">
              <p>
                {{ post.post_content }}
              </p>
                <carousel :data="getImageData(post.id)" indicator-type="disc">
                </carousel>
            </div>
            <div class="post-actions">
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="like-btn">
                    <i class="far fa-heart"></i> 0 Like
                  </a>
                </li>
                <li>
                  <a href="#"> <i class="far fa-comment"></i> 0 Comment</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      <div class="col-md-3 pl-2">
        <div class="card shadow rounded-lg border-0 sticky-top">
          <div class="card-body">
            <h5 class="card-title text-center">Địa điểm khác</h5>
            <a
              v-for="(location, index) in topLocations"
              :key="index"
              @click="onClickLocation(location.id)"
              class="card-link text-dark"
              :title="location.location_name"
              style="cursor: pointer"
            >
            <div v-if="location.id != currentLocationId" class="d-flex flex-row justify-content-between">
              <p class="text-truncate my-1 mr-3">{{ location.location_name }}</p>
              <span class="font-weight-bold text-warning my-1">
                {{ location.avg_location_scores | myRating }}
                <!-- <i class="fas fa-star my-1"></i> -->
              </span>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    location: {},
    imageLocations: [],
    posts: {},
    currentLocationId: "",
    isLoading: false
  }),
  async created() {
    let vm = this;
    vm.isLoading = true;
    let id = vm.currentLocationId = vm.$route.params.locationId;
    const { data } = await vm.LOCATION_FETCH_ONE(id);
    vm.location = data.location;    
    vm.posts = data.posts;
    vm.imageLocations = data.imageLocations;
    store.dispatch("home/TOP_LOCATIONS_FETCH")
    vm.isLoading = false;
  },
  computed: {
    ...mapGetters("authentication", ["currentUser", "isAuthenticated"]),
    ...mapGetters("home", ["topLocations"]),
  },
  methods: {
    ...mapActions("location", ["LOCATION_FETCH_ONE"]),
    getImageData(postId) {
      let arrImage = this.imageLocations.filter(image => image.post_id == postId);
      return arrImage.map(item => `<img class="post-image" src="https://storage.googleapis.com/cdio-cots.appspot.com/uploads/posts/${item.image_name}" />`)
    },
    getUrlImage(name) {
      return "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" + name;
    },
    async onClickLocation(locationId) {
      let vm = this;
      vm.isLoading = true;
      vm.$router.push({ name: 'Location Detail', params: { locationId: locationId } });
      const { data } = await vm.LOCATION_FETCH_ONE(locationId);
      vm.currentLocationId = locationId;
      vm.location = data.location;    
      vm.posts = data.posts;
      vm.imageLocations = data.imageLocations;
      store.dispatch("home/TOP_LOCATIONS_FETCH")
      vm.isLoading = false;
    },
    getImageLocationData() {
      return this.imageLocations.map(img => '<div class="height--img--cover orverflow-hidden"><img class="w-100 h-100" src="https://storage.googleapis.com/cdio-cots.appspot.com/uploads/locations/'+ img.image_name + '" /></div>');
    }
  }
};
</script>

<style></style>
