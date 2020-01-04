<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Chi tiết công ty</li>
      </ol>
    </nav>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-md-12">
        <div class="profile-cover shadow height--img--cover overflow-hidden">
          <img class="w-100 h-100" :src="getUrlImageCover(partner.image_cover)">
        </div>
        <div class="profile-header">
          <div class="ml-0 profile-name">
            <h3>{{ partner.name }}</h3>
          </div>
          <div class="profile-header-menu">
            <ul class="list-unstyled">
              <li><a href="#">Mô tả: {{ partner.description }}</a></li>
              <li><a href="#">Địa chỉ: {{ partner.address }}</a></li>
              <li><a class="text-warning" href="#">{{ partner.avg_partner_scores | myRating }}<i class="fas fa-star ml-2"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-deck row">
          <div v-for="(tour, index) in tours.data" :key="index" class="col-md-6 p-0 mb-4">
            <div class="card rounded-lg shadow border-0 mx-3">
              <router-link :to="{ name: 'Tour Detail', params: { tourId: tour.id } }">
                <img :src="getUrlImageTour(tour.image_cover)" class="card-img-top" height="245px">  
              </router-link>
              <div class="card-body m-0">
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
        <div v-if="tours.total !== 0" class="py-3">
          <paginate
            :page-count="tours.last_page"
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
        <div v-else class="py-3 text-center">
          <span class="font-weight-bold">Không có tour nào</span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow rounded-lg border-0">
          <div class="card-body">
            <h5 class="card-title text-center text-uppercase">Đánh giá</h5>
            <div v-for="(rating, index) in ratings" :key="index" class="d-flex flex-row justify-content-between mb-3">
              <div>
                <div class="font-weight-bold">{{ rating.user.name }}</div>
                <div class="text-truncate">{{ rating.rating_content }}</div>
              </div>
              <div class="font-weight-bold text-warning my-auto">{{ rating.rating_scores | myRating }}</div>
            </div>
            <div v-if="isAuthenticated" class="mt-2 text-center">
              <a v-if="!checkRating()" href="#" class="card-link" @click="ratingMode = true">Viết đánh giá</a>
              <a v-else href="#" class="card-link" @click="editRating()">Sửa đánh giá</a>
            </div>
          </div>
        </div>
        <div v-if="ratingMode" class="card shadow rounded-lg border-0">
          <div class="card-body">
            <h5 v-if="!editMode" class="card-title text-center text-uppercase">Viết đánh giá</h5>
            <h5 v-else class="card-title text-center text-uppercase">Sửa đánh giá</h5>
            <div class="d-flex flex-column">
              <div class="mb-3">
                <textarea v-model="rating.content" class="form-control" rows="3" placeholder="Nhập nội dung đánh giá"></textarea>
              </div>
              <div class="d-flex flex-grow justify-content-between">
                <star-rating v-model="rating.scores" :star-size="20" :show-rating="false"></star-rating>
                <div>
                  <button class="btn btn-secondary" @click="ratingMode = false">Đóng</button>
                  <button v-if="!editMode" class="btn btn-success" @click="submitRating()">Đánh giá</button>
                  <button v-else class="btn btn-info" @click="submitUpdateRating()">Sửa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card shadow rounded-lg border-0 sticky-top">
          <div class="card-body">
            <h5 class="card-title text-center text-uppercase">Công ty nổi bật</h5>
            <a
              v-for="(partner, index) in topPartners"
              :key="index"
              @click="onClickCompany(partner.id)"
              class="card-link text-dark"
              :title="partner.name"
              style="cursor: pointer"
            >
            <div v-if="partner.id != currentPartnerId" class="d-flex flex-row justify-content-between">
              <p class="text-truncate my-1 mr-3">{{ partner.name }}</p>
              <span class="font-weight-bold text-warning my-1">
                {{ partner.avg_partner_scores | myRating }}
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
    partner: {},
    tours: {},
    ratings: {},
    rating: {
      content: "",
      scores: null
    },
    ratingMode: false,
    editMode: false,
    currentPartnerId: "",
    isLoading: false,
  }),
  async created() {
    let vm = this;
    vm.isLoading = true;
    let id = vm.currentPartnerId = vm.$route.params.companyId;
    const { data } = await vm.PARTNER_FETCH_ONE(id);
    vm.partner = data.partner;
    vm.ratings = data.ratings;
    vm.tours = data.tours;
    store.dispatch("home/TOP_PARTNERS_FETCH");
    vm.isLoading = false;
  },
  computed: {
    ...mapGetters("authentication", ["currentUser","isAuthenticated"]),
    ...mapGetters("home", ["topPartners"]),
  },
  methods: {
    ...mapActions("partner", ["PARTNER_FETCH_ONE"]),
    ...mapActions("rating", ["RATING_CREATE"]),
    ...mapActions("tour", ["TOURS_PAGINATE"]),
    getUrlImageTour(name) {
      return "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/tours/" + name;
    },
    getUrlImageCover(name) {
      return "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" + name;
    },
    async onClickCompany(companyId) {
      let vm = this;
      vm.isLoading = true;
      vm.$router.push({ name: 'Company Detail', params: { companyId: companyId } });
      const { data } = await vm.PARTNER_FETCH_ONE(companyId);
      vm.currentPartnerId = companyId;
      vm.partner = data.partner;
      vm.ratings = data.ratings;
      vm.tours = data.tours;
      store.dispatch("home/TOP_PARTNERS_FETCH");
      vm.isLoading = false;
    },
    async submitRating() {
      let rating = {
        'rating_content': this.rating.content,
        'rating_scores': this.rating.scores,
        'partner_id': this.currentPartnerId
      }
      await this.RATING_CREATE(rating);
      this.ratingMode = false;
      let vm = this;
      let id = vm.currentPartnerId = vm.$route.params.companyId;
      const { data } = await vm.PARTNER_FETCH_ONE(id);
      vm.partner = data.partner;
      vm.ratings = data.ratings;
      vm.tours = data.tours;
      store.dispatch("home/TOP_PARTNERS_FETCH");
    },
    checkRating() {
      const index = this.ratings.findIndex(rating => rating.user_id == this.currentUser.id);
      if(index != -1) {
        return true;
      } else {
        return false;
      }
    },
    editRating() {
      this.ratingMode = true;
      this.editMode = true;
    },
    clickPaginate(pageNum) {
      this.TOURS_PAGINATE(pageNum);
    }
  },
}
</script>

<style>

</style>