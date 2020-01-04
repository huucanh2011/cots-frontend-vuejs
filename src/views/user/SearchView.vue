<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Tìm kiếm</li>
      </ol>
    </nav>
    <p class="lead">Tour</p>
    <div class="divider mt-0"></div>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="card-deck row">
      <div v-if="tours.data.length == 0" class="col-12">
        <span class="text-center">Không tìm thấy kết quả</span>
      </div>
      <div v-else v-for="(tour, index) in tours.data" :key="index" class="col-md-4 p-0 mb-4">
        <div class="card shadow rounded-lg border-0">
          <router-link :to="{ name: 'Tour Detail', params: { tourId: tour.id } }">
            <img :src="getUrlImageTour(tour.image_cover)" class="card-img-top" height="245px">  
          </router-link>
          <div class="card-body">
            <h5 class="card-title">
              <router-link class="text-dark" :to="{ name: 'Tour Detail', params: { tourId: tour.id } }">
                {{ tour.tour_name }}
              </router-link>
            </h5>
            <div class="d-flex">
              <div class="mr-auto">
                <p class="card-text">{{ tour.from_place }} - {{ tour.to_place }}</p>
              </div>
              <div class="ml-auto">
                <h5 class="card-text text-primary">Giá {{ tour.tour_price | myCurrency }} đ / ngày</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="lead">Địa điểm</p>
    <div class="divider mt-0"></div>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="card-deck row">
      <div v-if="locations.data.length == 0" class="col-12">
        <span class="text-center">Không tìm thấy kết quả</span>
      </div>
      <div v-else v-for="(location, index) in locations.data" :key="index" class="col-md-4 p-0 mb-4">
        <div class="card shadow rounded-lg border-0" style="height: 150px">
          <!-- <router-link :to="{ name: 'Tour Detail', params: { tourId: tour.id } }">
            <img :src="getUrlImageTour(tour.image_cover)" class="card-img-top" height="245px">  
          </router-link> -->
          <div class="card-body">
            <h5 class="card-title">
              <router-link class="text-dark" :to="{ name: 'Location Detail', params: { locationId: location.id } }">
                {{ location.location_name }}
              </router-link>
            </h5>
            <div class="d-flex">
              <div class="mr-auto">
                <p class="card-text">{{ location.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
    computed: {
      ...mapGetters("search", ["locations", "tours", "isLoading"])
    },
    methods: {
      getUrlImageTour(name) {
          return `https://storage.googleapis.com/cdio-cots.appspot.com/uploads/tours/${name}`;
      },
    }
};
</script>

<style></style>
