<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Công ty du lịch</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-8">
        <div class="card shadow-sm rounded-lg border-0">
          <form class="form-inline p-3" @submit.prevent="submitSearchForm()">
            <div class="input-group w-100">
              <label class="mr-3" for="searchTour">Tìm công ty</label>
              <input type="text" v-model="searchText" class="form-control rounded-lg" id="searchTour" placeholder="Nhập tên công ty, địa chỉ, số điện thoại,...">
              <div class="input-group-prepend">
                <button type="submit" class="btn btn-light rounded-lg px-3">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div class="row">
          <div v-if="isLoading" class="col-12 text-center py-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else v-for="(partner, index) in partners.data" :key="index" class="col-md-4 mb-2">
            <div class="card shadow-sm rounded-lg border-0">
              <div class="card-body">
                <router-link :to="{ name: 'Company Detail', params: { companyId: partner.id } }">
                  <h5 class="card-title">{{ partner.name }}</h5>
                  <blockquote class="blockquote mb-0">
                    <div style="height: 60px">
                      <p class="mb-1 text-dark" style="overflow-x: hidden">{{ partner.description }}</p>
                    </div>
                    <footer class="blockquote-footer">Địa chỉ: <cite :title="partner.address">{{ partner.address }}</cite></footer>
                  </blockquote>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="py-3">
              <paginate
                :page-count="partners.last_page == null ? 1 : partners.last_page"
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

      <div class="col-md-4">
        <div class="card shadow-sm rounded-lg border-0 sticky-top">
          <div class="card-body">
            <h5 class="card-title text-center text-uppercase">Công ty nổi bật</h5>
            <router-link v-for="(partner, index) in topPartners" :key="index" :to="{ name: 'Company Detail', params: { companyId: partner.id } }" class="card-link text-dark" :title="partner.name">
              <div class="d-flex flex-row justify-content-between">
                <p class="text-truncate my-1 mr-3">{{ partner.name }}</p>
                <span class="font-weight-bold text-warning my-1">
                  {{ partner.avg_partner_scores | myRating }}
                  <!-- <i class="fas fa-star"></i> -->
                </span>
              </div>
            </router-link>
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
  data: () => ({
    searchText: ""
  }),
  created() {
    store.dispatch("home/TOP_PARTNERS_FETCH");
    store.dispatch("partner/PARTNERS_FETCH");
  },
  computed: {
    ...mapGetters("home", ["topPartners"]),
    ...mapGetters("partner", ["partners", "isLoading"]),
  },
  methods: {
    ...mapActions("partner", ["PARTNERS_SEARCH", "PARTNERS_PAGINATE"]),
    clickPaginate(pageNum) {
      this.PARTNERS_PAGINATE(pageNum);
    },
    submitSearchForm() {
      this.PARTNERS_SEARCH(this.searchText);
    }
  }
}
</script>

<style>
</style>