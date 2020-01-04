<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Quản lý tour</li>
        <li class="ml-auto">
          <router-link class="text-info" :to="{ name: 'Create Tour' }"
            >Thêm</router-link
          >
        </li>
      </ol>
    </nav>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Danh sách tour</h5>
        <table class="table table-hover">
          <caption>
            List of tour
          </caption>
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Tên tour</th>
              <th scope="col">Từ nơi</th>
              <th scope="col">Đến nơi</th>
              <th scope="col">Số ngày</th>
              <th scope="col">Số người</th>
              <th scope="col">Giá tour</th>
              <th scope="col">Loại tour</th>
              <th scope="col">Status</th>
              <th scope="col">Active</th>
              <th scope="col" class="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="text-center">
              <td colspan="12">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(tour, index) in tours.data" :key="index">
              <th scope="row">{{ tour.id }}</th>
              <td>
                <router-link class="text-truncate" style="width: 200px" :to="{ name: 'Tour Detail', params: { tourId: tour.id } }">
                  {{ tour.tour_name }}
                </router-link>
              </td>
              <td>{{ tour.from_place }}</td>
              <td>{{ tour.to_place }}</td>
              <td>{{ tour.number_days }}</td>
              <td>{{ tour.number_persons }}</td>
              <td>{{ tour.tour_price | myCurrency }} đ</td>
              <td>{{ tour.tour_cate.cate_name }}</td>
              <td>
                <span v-if="tour.is_active === 1" class="badge badge-success">Active</span>
                <span v-else class="badge badge-danger">Blocked</span>
              </td>
              <td>
                <div class="custom-control custom-checkbox">
                  <input
                    class="custom-control-input"
                    type="checkbox"
                    :id="fetchNameCheck(tour)"
                    @change="onChangeStatus($event, tour)"
                    :checked="tour.is_active === 1"
                  />
                  <label
                    class="custom-control-label"
                    :for="fetchNameCheck(tour)"
                  >
                  </label>
                </div>
              </td>
              <td class="text-center">
                <a href="#" class="btn btn-outline-secondary" @click="onClickDateDeparture(tour.id)">
                  <i class="far fa-calendar-alt"></i>
                </a>
                <router-link class="text-info btn-link ml-1 mx-2" :to="{ name: 'Edit Tour', params: { tourId: tour.id } }">Cập nhật</router-link>
                <a href="#" class="text-danger btn-link" @click="onClickDeleteTour(tour.id)">Xoá</a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="tours.last_page == null ? 1 : tours.last_page"
          :click-handler="clickPaginate"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination justify-content-end'"
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

    <!-- modal-submit-delete -->
    <submit-delete-modal>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModalDelete()">
          Huỷ
        </button>
        <button type="button" class="btn btn-primary" @click="submitDelete()">
          <span
            v-if="loadingButton"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Có
        </button>
      </div>
    </submit-delete-modal>
    <!-- end-modal-submit-delete -->

    <modal-large>
      <div slot="modal-header" class="modal-header">
        <h5 class="modal-title" id="modalTitle">Ngày khởi hành</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div slot="modal-body" class="modal-body">
        <div class="row">
          <div class="col-6">
            <div class="border rounded-lg h-100" style="overflow-y: auto">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(date, index) in dates" :key="index">
                    {{ date.date_departure }} 
                    <a href="#" style="float:right; cursor: pointer" @click="deleteDate(date.id)">&times;</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <label>Chọn ngày</label>
            <date-picker v-model="dateDeparture" @selected="selectDate()" :disabled-dates="disabledDates" :bootstrap-styling="true" :language="vi" :monday-first="true" :inline="true"></date-picker>
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
      </div>
    </modal-large>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import {en, vi} from 'vuejs-datepicker/dist/locale'
import moment from "moment";
moment.locale("vi");

export default {
  data: () => ({
    tour: {
      id: null
    },
    // dates: [],
    vi: vi,
    disabledDates: {
      to: new Date(),
    },
    dateDeparture: "",
    loadingButton: false
  }),
  created() {
    store.dispatch("tour/TOURS_FETCH")
  },
  computed: {
    ...mapGetters("tour", ["tours", "isLoading"]),
    ...mapGetters("datedeparture", ["dates"]),
  },
  methods: {
    ...mapActions("tour", ["TOURS_PAGINATE", "TOUR_DELETE", "TOUR_BLOCK"]),
    ...mapActions("datedeparture", ["DATES_FETCH", "DATE_CREATE", "DATE_DELETE"]),
    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    selectDate(e) {
      let vm = this;
      vm.$nextTick(() => {
        for(let i = 0; i < vm.dates.length; i++) {
          if(vm.dates[i].date_departure == vm.dateFormatter(vm.dateDeparture)) {
            return;
          }
        }
        let code = "COTS_" + vm.id + "_" + vm.dateFormatter(vm.dateDeparture);
        let date = {
          'date_departure_code': code,
          'date_departure': vm.dateFormatter(vm.dateDeparture),
          'tour_id': this.id
        }        
        vm.DATE_CREATE(date)
      })
    },
    async onClickDateDeparture(tourId) {
      this.id = tourId;
      await this.DATES_FETCH(tourId);
      $('.large__modal').modal('show');
    },
    deleteDate(id) {
      this.DATE_DELETE(id);
    },
    clickPaginate(pageNum) {
      this.TOURS_PAGINATE(pageNum);
    },
    fetchNameCheck(x) {
      return "checkbox_" + x.id;
    },
    onChangeStatus($event, payload) {
      let isActive = 0;
      if ($event.target.checked === true) {
        isActive = 1;
      }
      let tour = {
        id: payload.id,
        is_active: isActive
      };
      this.TOUR_BLOCK(tour);
    },
    onClickDeleteTour(tourId, index) {
      this.tour.id = tourId;
      $('.submit__delete__modal').modal('show');
    },
    submitDelete() {
      this.TOUR_DELETE(this.tour.id);
      $('.submit__delete__modal').modal('hide');
      this.$toast.success({
          color: "#67C23A",
          title: "Success!",
          message: "Xoá thành công!"
      });
    },
    closeModalDelete() {
      $('.submit__delete__modal').modal('hide');
      this.tour.id = null;
    }
  },
};
</script>

<style></style>
