<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Tour Management' }"
            >Quản lý tour</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Quản lý đặt tour</li>
      </ol>
    </nav>

    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Danh sách đặt tour</h5>
          </div>
          <div class="d-flex flex-row">
            <!-- <div class="form-inline">
              <label class="mr-3">Lọc theo ngày</label>
              <date-picker v-model="filter.date" @selected="selectDate()" :bootstrap-styling="true" :language="vi" :format="dateFormatter" :monday-first="true" placeholder="Chọn ngày"></date-picker>
            </div>
            <div class="mx-3">
              <button class="btn btn-warning my-1" @click="onClearFilter()">
                <i class="fas fa-sync-alt"></i>
              </button>
            </div> -->
            <div>
              <form @submit.prevent="submitSearchBlock()" class="input-group">
                <input type="text" v-model="searchTextBlock" class="form-control form-control-sm" placeholder="Nhập mã tour, tên khách">
                <div class="input-group-append">
                  <button type="submit" class="btn btn-light"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <table class="table table-hover">
          <caption>
            List of tour order
          </caption>
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Tên khách</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Mã tour</th>
              <th scope="col">Ngày khởi hành</th>
              <th scope="col">Số lượng người</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Ghi chú</th>
              <th scope="col">Status</th>
              <th scope="col" class="text-center">Active</th>
              <th scope="col" class="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoadingB" class="text-center">
              <td colspan="12">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(tourOrder, index) in tourOrdersBlocked.data" :key="index">
              <th scope="row">{{ tourOrder.id }}</th>
              <td>{{ tourOrder.customer_name }}</td>
              <td>{{ tourOrder.customer_phone_number }}</td>
              <td>{{ tourOrder.date_departure_code }}</td>
              <td>{{ tourOrder.date_departure }}</td>
              <td>{{ tourOrder.quantity_people }}</td>
              <td>{{ tourOrder.total | myCurrency}} đ</td>
              <td>{{ tourOrder.note }}</td>
              <td>
                <span class="badge badge-danger">No active</span>
              </td>
              <td class="text-center">
                <a href="#" class="text-info" @click="activeTourOrder(tourOrder)">
                  <i class="fas fa-check-circle"></i> Duyệt
                </a>
              </td>
              <td class="text-center">
                <a href="#" class="text-danger btn-link mr-0" @click="onClickDeleteTourOrder(tourOrder.id)">Xoá</a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="tourOrdersBlocked.last_page == null ? 1 : tourOrdersBlocked.last_page"
          :click-handler="clickPaginateTourOrderBock"
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

    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Danh sách tour đã duyệt</h5>
          </div>
          <div class="d-flex flex-row">
            <!-- <div class="form-inline">
              <label class="mr-3">Lọc theo ngày</label>
              <date-picker v-model="filter.date" @selected="selectDate()" :bootstrap-styling="true" :language="vi" :format="dateFormatter" :monday-first="true" placeholder="Chọn ngày"></date-picker>
            </div>
            <div class="mx-3">
              <button class="btn btn-warning my-1" @click="onClearFilter()">
                <i class="fas fa-sync-alt"></i>
              </button>
            </div> -->
            <div>
              <form @submit.prevent="submitSearchActive()" class="input-group">
                <input type="text" v-model="searchTextActive" class="form-control form-control-sm" placeholder="Nhập mã tour, tên khách">
                <div class="input-group-append">
                  <button type="submit" class="btn btn-light"><i class="fas fa-search"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <table class="table table-hover">
          <caption>
            List of tour order activated
          </caption>
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Tên khách</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Mã tour</th>
              <th scope="col">Ngày khởi hành</th>
              <th scope="col">Số lượng người</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Status</th>
              <th scope="col" class="text-center">Active</th>
              <th scope="col" class="text-center">Đã duyệt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoadingA" class="text-center">
              <td colspan="12">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(tourOrder, index) in tourOrdersActive.data" :key="index">
              <th scope="row">{{ tourOrder.id }}</th>
              <td>{{ tourOrder.customer_name }}</td>
              <td>{{ tourOrder.customer_phone_number }}</td>
              <td>{{ tourOrder.date_departure_code }}</td>
              <td>{{ tourOrder.date_departure }}</td>
              <td>{{ tourOrder.quantity_people }}</td>
              <td>{{ tourOrder.total | myCurrency}} đ</td>
              <td>
                <span class="badge badge-success">Active</span>
              </td>
              <td class="text-center">
                <a href="#" class="text-warning" @click="blockTourOrder(tourOrder)">
                  <i class="fas fa-times-circle"></i> Hủy
                </a>
              </td>
              <td class="text-center text-success">
                Đã duyệt
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="tourOrdersActive.last_page == null ? 1 : tourOrdersActive.last_page"
          :click-handler="clickPaginateTourOrderActive"
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
    tourOrder: {
      id: ""
    },
    filter: {
      date: "",
    },
    searchTextActive: "",
    searchTextBlock: "",
    vi: vi,
    loadingButton: false
  }),
  created() {
    store.dispatch("tourorder/TOUR_ORDER_FETCH")
  },
  computed: {
    ...mapGetters("tourorder", ["tourOrdersActive", "tourOrdersBlocked", "isLoadingA", "isLoadingB"]),
  },
  methods: {
    ...mapActions("tourorder", ["TOUR_ORDER_PAGINATE", "TOUR_ORDER_ACTIVE_SEARCH", "TOUR_ORDER_BLOCK_SEARCH", "TOUR_ORDER_FILTER", "TOUR_ORDER_DELETE", "TOUR_ORDER_ACTIVE", "TOUR_ORDER_BLOCK"]),
    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    async selectDate(e) {
      let vm = this;
      let date;
      await vm.$nextTick(() => {
        date = this.dateFormatter(this.filter.date);
      })
      await this.TOUR_ORDER_FILTER(date);
    },
    onClearFilter() {
      this.filter.date = "",
      store.dispatch("tourorder/TOUR_ORDER_FETCH")
    },
    submitSearchActive() {
      this.TOUR_ORDER_ACTIVE_SEARCH(this.searchTextActive);
    },
    submitSearchBlock() {
      this.TOUR_ORDER_BLOCK_SEARCH(this.searchTextBlock);
    },
    clickPaginateTourOrderBock(pageNum) {
      // this.TOUR_ORDER_PAGINATE(pageNum);
    },
    clickPaginateTourOrderActive(pageNum) {
      // this.TOUR_ORDER_PAGINATE(pageNum);
    },
    activeTourOrder(payload) {
      let isActive = true;
      let tourOrder = {
        id: payload.id,
        is_active: isActive
      };
      this.TOUR_ORDER_ACTIVE(tourOrder);
    },
    blockTourOrder(payload) {      
      let isActive = false;
      let tourOrder = {
        id: payload.id,
        is_active: isActive
      };
      this.TOUR_ORDER_BLOCK(tourOrder);
    },
    onClickDeleteTourOrder(tourOrderId) {
      this.tourOrder.id = tourOrderId;
      $('.submit__delete__modal').modal('show');
    },
    submitDelete() {
      this.TOUR_ORDER_DELETE(this.tourOrder.id);
      $('.submit__delete__modal').modal('hide');
      this.$toast.success({
          color: "#67C23A",
          title: "Success!",
          message: "Xoá thành công!"
      });
    },
    closeModalDelete() {
      $('.submit__delete__modal').modal('hide');
      this.tourOrder.id = "";
    }
  },
};
</script>

<style></style>