<template>
  <div>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-lg-12 mb-3">
        <div class="profile-cover height--img--cover orverflow-hidden shadow">
          <img class="w-100 h-100" :src="getUrlImage(tour.image_cover)" />
        </div>
        <div class="profile-header">
          <div class="ml-0 profile-name">
            <h3 class="text-uppercase">{{ tour.tour_name }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="card shadow border-0">
          <div class="card-body">
              <h5 class="card-title text-center text-uppercase">Thông tin tour</h5>
              <div class="d-flex flex-row justify-content-between pb-0">
                <p class="card-text"><strong>Loại tour:</strong> {{ tour.tour_cate.cate_name }}</p>  
                <p class="card-text"><strong>Nơi đi:</strong> {{ tour.from_place }}</p>
                <p class="card-text"><strong>Nơi đến:</strong> {{ tour.to_place }} </p>
                <p class="card-text"><strong>Số ngày:</strong> {{ tour.number_days }} ngày</p>
                <p class="card-text"><strong>Số người tối đa:</strong> {{ tour.number_persons }} người</p>
                <p class="card-text"><strong>Giá tour/người:</strong> {{ tour.tour_price | myCurrency }} đồng</p>
              </div>
              <hr>
              <p class="card-text"><strong>Mô tả:</strong> {{ tour.description }}</p>
              <p class="card-text"><strong>Ghi chú:</strong> {{ tour.note }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card shadow border-0">
          <div class="card-body">
            <h5 class="card-title text-center text-uppercase">Ngày khởi hành</h5>            
            <div class="trending-services" style="height: 325px; overflow-y: auto">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã tour</th>
                    <th scope="col">Ngày khởi hành</th>
                    <th scope="col">Giá</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(date, index) in dates" :key="index">
                    <th scope="row">{{ ++index }}</th>
                    <th>{{ date.date_departure_code }}</th>
                    <td><p class="font-weight-bold font-italic">{{ date.date_departure }}</p></td>
                    <td>{{ tour.tour_price | myCurrency }} đồng</td>
                    <td>
                      <button v-if="isAuthenticated" class="btn btn-outline-info js-btn-choose-date" @click="onClickBookTour(tour, date, index)">Đặt</button>
                      <button v-else class="btn btn-link" @click="onClickLogin">Đăng nhập</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card shadow border-0">
          <div class="card-body">
            <h5 class="card-title text-center text-uppercase">Đặt tour</h5>
            <div class="mb-3">
              <h6 class="lead">Ngày đã chọn: 
                <span v-if="isShowDateSelected" class="badge badge-sm badge-light">
                  <a href="#" class="text-dark" @click="onClickRemoveDate()"><strong>{{ tourDateSelected }} &times;</strong></a>
                </span>
              </h6>
            </div>
            <div class="form-group">
              <label>Số lượng người</label>
              <input type="number" class="form-control" v-model="tourOrder.numberPersons" placeholder="Nhập số lượng người">
            </div>
              <div class="form-group">
                <label>Phương thức thanh toán</label>
                <select class="form-control">
                  <option selected disabled>Chọn</option>
                  <option>Thanh toán trực tiếp</option>
                </select>
              </div>
            <div class="form-group">
              <label>Ghi chú</label>
              <textarea type="text" class="form-control" v-model="tourOrder.note" rows="2" placeholder="Nhập ghi chú (nếu có)"></textarea>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div v-if="showTotalAmount">
                <p class="font-weight-bold">Tổng tiền: {{ computeTotalPrice(price, tourOrder.numberPersons) }}</p>
              </div>
              <div v-else></div>
              <button v-if="isAuthenticated" class="btn btn-dark py-2" @click="onClickSubmit" :disabled="isDisabledButtonSubmit">Xác nhận</button>
              <div v-else>Bạn cần <button class="btn btn-link px-0" @click="onClickLogin">Đăng nhập</button> để đặt tour</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-normal>
      <div slot="modal-header" class="modal-header">
        <h5 class="modal-title" id="modalTitle">Xác nhận đặt tour</h5>
        <button type="button" class="close" @click="onClickCloseSubmit" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div slot="modal-body" class="modal-body">
        <div v-if="notification" class="alert alert-success" role="alert">
            <h6 class="alert-heading">Thành công!</h6>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, yêu cầu của bạn đã được gửi đến công ty du lịch. Chúng tôi sẽ liên hệ đến bạn để xác nhận. Trân trọng cảm ơn!</p>
            <hr>
            <p class="mb-0">Nếu có thắc mắc vui lòng gọi hotline: <a class="alert-link" href="tel:+84397532345">0397532345</a> </p>
            
        </div>
        <div v-else class="d-flex flex-column">
          <p><strong>Tên tour: </strong>{{ tour.tour_name }}</p>
          <div class="d-flex flex-row">
            <p class="mr-3"><strong>Nơi đi: </strong>{{ tour.from_place }}</p>
            <p class="ml-3"><strong>Nơi đến: </strong>{{ tour.to_place }}</p>
          </div>
          <p><strong>Ngày khởi hành: </strong>{{ tourOrder.dateDeparture }}</p>
          <p><strong>Ghi chú: </strong>{{ tourOrder.note }}</p>
          <div class="d-flex flex-row">
            <p class="mr-3"><strong>Giá tour: </strong>{{ tour.tour_price | myCurrency }} đồng</p>
            <p class="mx-3"><strong>Số người: </strong>{{ tourOrder.numberPersons }}</p>
            <p class="ml-3"><strong>Tổng cộng: </strong>{{ tourOrder.total | myCurrency }} đồng</p>
          </div>
          <p><strong>Phương thức thanh toán: </strong>thanh toán trực tiếp</p>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="onClickCloseSubmit">Đóng</button>
        <button v-if="!notification" type="button" class="btn btn-success" @click="submitOrder()">Xác nhận</button>
      </div>
    </modal-normal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import { en, vi } from "vuejs-datepicker/dist/locale";
import moment from "moment";
moment.locale("vi");

export default {
  data: () => ({
    tour: {
      type: Object
    },
    tourOrder: {
      numberPersons: "",
      note: "",
      total: "",
      dateDepartureId: ""
    },
    tourDateSelected: '',
    dateDeparture: "",
    price: "",
    isShowDateSelected: false,
    isDisabledButtonSubmit: true,
    showTotalAmount: false,
    notification: false,
    isLoading: false
  }),
  async created() {
    let vm = this;
    vm.isLoading = true;
    let id = vm.$route.params.tourId;
    const { data } = await vm.TOUR_FETCH_ONE(id);
    vm.tour = data;
    vm.isLoading = false;
    store.dispatch("datedeparture/DATES_FETCH", id);
  },
  computed: {
    ...mapGetters("authentication", ["isAuthenticated"]),
    ...mapGetters("datedeparture", ["dates"]),
  },
  methods: {
    ...mapActions("tour", ["TOUR_FETCH_ONE"]),
    ...mapActions("tourorder", ["TOUR_ORDER_CREATE"]),
    getUrlImage(name) {
      return "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/tours/" + name;
    },
    computeTotalPrice(price, number) {
      if(number == "")
        number = 0;
      let total = price * number;
      this.tourOrder.total = total;
      return price + " đồng x " + number + " = " + total + " đồng";
    },
    onClickBookTour(tour, date, index) {
      let vm = this;
      vm.showTotalAmount = true;
      vm.isShowDateSelected = true;
      vm.isDisabledButtonSubmit = false;
      vm.price = tour.tour_price;
      vm.tourOrder.numberPersons = 1;
      vm.tourOrder.dateDepartureId = date.id;
      vm.tourOrder.dateDeparture = date.date_departure;
      vm.tourDateSelected = date.date_departure;
      $('.js-btn-choose-date').addClass('d-none');
    },
    onClickRemoveDate() {
      let vm = this;
      vm.showTotalAmount = false;
      vm.isShowDateSelected = false;
      vm.isDisabledButtonSubmit = true;
      vm.price = '';
      vm.tourOrder = {};
      vm.tourDateSelected = '';
      $('.js-btn-choose-date').removeClass('d-none');
    },
    onClickCloseSubmit() {
      let vm = this;
      vm.showTotalAmount = false;
      vm.price = "";
      vm.tourOrder.numberPersons = "";
      vm.tourOrder.dateDepartureId = "";
      vm.tourOrder.dateDeparture = "";
      $(".normal__modal").modal("hide");
    },
    onClickSubmit() {
      let remaining = this.tour.number_persons;
      let order = this.tourOrder.numberPersons;
      if(order > remaining) {
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: `Không còn đủ số lượng người: ${remaining} người còn lại`
        });
      } else {
        $(".normal__modal").modal("show");
      }
    },
    async submitOrder() {
      let vm = this;
      const tourOrder = {
        'quantily_people': vm.tourOrder.numberPersons,
        'total': vm.tourOrder.total,
        'note': vm.tourOrder.note,
        'date_departure_tour_id': vm.tourOrder.dateDepartureId
      }
      const res = await vm.TOUR_ORDER_CREATE(tourOrder);
      vm.notification = true;
    },
    onClickLogin() {
      $("#modal__login").modal("show");
    }
  }
};
</script>

<style></style>
