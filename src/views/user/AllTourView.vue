<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Tour</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <form
            class="form-inline form-row p-3"
            @submit.prevent="submitSearchForm()"
          >
            <div class="col-6">
              <input
                type="text"
                v-model="searchTourText"
                class="form-control w-100"
                placeholder="Nhập tên tour, nơi đi, nơi đến..."
              />
            </div>
            <div class="col-3">
              <select class="form-control w-100" v-model="tourCateSelected">
                <option value="1" selected>Trong nước</option>
                <option value="2">Ngoài nước</option>
                <option value="0">Tất cả</option>
              </select>
            </div>
            <div class="col-3">
              <button type="submit" class="btn btn-dark btn-block py-2 my-auto">
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-12">
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else class="card-deck row">
          <div
            v-for="(tour, index) in tours.data"
            :key="index"
            class="col-4 p-0 mb-4"
          >
            <div class="card rounded-lg shadow border-0 mx-3">
              <router-link
                :to="{ name: 'Tour Detail', params: { tourId: tour.id } }"
              >
                <img
                  :src="getUrlImage(tour.image_cover)"
                  class="card-img-top"
                  height="245px"
                />
              </router-link>
              <div class="card-body m-0">
                <h5 class="card-title">
                  <router-link
                    class="text-dark"
                    :to="{ name: 'Tour Detail', params: { tourId: tour.id } }"
                  >
                    {{ tour.tour_name }}
                  </router-link>
                </h5>
                <div class="d-flex">
                  <div class="mr-auto">
                    <p class="card-text">
                      {{ tour.from_place }} - {{ tour.to_place }}
                    </p>
                  </div>
                  <div class="ml-auto">
                    <h5 class="card-text text-primary">
                      {{ tour.tour_price | myCurrency }} đ / ngày
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-3">
          <paginate
            :page-count="tours.last_page == null ? 1 : tours.last_page"
            :click-handler="clickPaginate"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
          >
          </paginate>
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
    searchTourText: "",
    tourCateSelected: 1
  }),
  created() {
    store.dispatch("alltour/TOURS_FETCH");
  },
  computed: {
    ...mapGetters("alltour", ["tours", "isLoading"])
  },
  methods: {
    ...mapActions("alltour", ["TOURS_PAGINATE", "SEARCH_TOURS"]),
    submitSearchForm() {
      const params = {
        q: this.searchTourText,
        cate: this.tourCateSelected == 0 ? "" : parseInt(this.tourCateSelected)
      };
      this.SEARCH_TOURS(params);
    },
    clickPaginate(pageNum) {
      this.TOURS_PAGINATE(pageNum);
    },
    getUrlImage(name) {
      return `https://storage.googleapis.com/cdio-cots.appspot.com/uploads/tours/${name}`;
    }
  }
};
</script>

<style></style>
