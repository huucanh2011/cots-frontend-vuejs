<template>
  <div>
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="row">

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="info-card">
              <h4 class="info-title">Tổng thành viên<span class="info-stats font-weight-bold">{{ counts.countMember }} thành viên</span></h4>
              <div class="progress" style="height: 3px;">
                <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="info-card">
              <h4 class="info-title">Tổng tour<span class="info-stats font-weight-bold">{{ counts.countTour }} tour</span></h4>
              <div class="progress" style="height: 3px;">
                <div class="progress-bar bg-success" role="progressbar" style="width: 50%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="info-card">
              <h4 class="info-title">Tổng bài viết<span class="info-stats font-weight-bold">{{ counts.countPost }} bài viết</span></h4>
              <div class="progress" style="height: 3px;">
                <div class="progress-bar bg-danger" role="progressbar" style="width: 50%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- <div class="d-flex justify-content-start">
              <div class="form-group mb-0">
                <select class="form-control" v-model="yearSelected" @change="onChangeYear()">
                  <option selected disabled>Chọn năm</option>
                  <option v-for="(year, index) in years" :key="index" :value="year.year">
                    {{ year.year }}
                  </option>
                </select>
              </div>
            </div> -->
            <fusioncharts
              :type="type"
              :width="width"
              :dataformat="dataFormat"
              :datasource="datasource.tourOrder"
              >
            </fusioncharts>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- <div class="d-flex flex-row justify-content-between mb-2">
              <div class="d-flex flex-row">
                <date-picker v-model="filterDate" @selected="selectDate()" :disabled-dates="disabledDates" :bootstrap-styling="true" :language="vi" :format="dateFormatter" :monday-first="true" placeholder="Lọc theo ngày"></date-picker>
                <div class="mx-3">
                  <button class="btn btn-warning" @click="onClearFilter()">
                    <i class="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>
              <div>
                <h5 class="card-title">Danh sách đặt tour ngày hôm nay</h5>
              </div>
            </div> -->
            <div class="d-flex flex-row">
              <h5 class="card-title">Danh sách đặt tour ngày hôm nay</h5>
              <h6 class="text-muted ml-2">{{ new Date() | myDate }}</h6>
            </div>            
            <table class="table table-hover">
              <caption>
                List of tour order today
              </caption>
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên khách</th>
                  <th scope="col">Mã tour</th>
                  <th scope="col">Ngày khởi hành</th>
                  <th scope="col">Số lượng người</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tourOrder, index) in tourOrders.data" :key="index">
                  <th scope="row">{{ ++index }}</th>
                  <td>{{ tourOrder.customer_name }}</td>
                  <td>{{ tourOrder.date_departure_code }}</td>
                  <td>{{ tourOrder.date_departure | myDate }}</td>
                  <td>{{ tourOrder.quantity_people }}</td>
                  <td>{{ tourOrder.total | myCurrency}} đ</td>
                  <td>
                    <span v-if="tourOrder.is_active == 1" class="badge badge-success">Đã duyệt</span>
                    <span v-else class="badge badge-danger">Chưa duyệt</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <paginate
              :page-count="tourOrders.last_page == null ? 1 : tourOrders.last_page"
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
      </div>

    </div>
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
    "type": "column2d",
    "renderAt": "chart-container",
    "width": "100%",
    "dataFormat": "json",
    "datasource": {
      "tourOrder": {
        "chart": {
          "caption": "Tổng số tour đã đặt trong năm " + new Date().getFullYear(),
          "subCaption": "Tổng số tour đã đặt trong từng tháng",
          "xAxisName": "Tháng",
          "yAxisName": "Tour",
          "theme": "fusion"
        },
        "data": []
      }
    },
    yearSelected: "Chọn năm",
    filterDate: "",
    disabledDates: {
      from: new Date(),
    },
    vi: vi
  }),
  async created () {
    await store.dispatch("dashboard/DATAS_FETCH");
    const month = "";
    const value = 0;
    const arrFake = [];
    for(let i = 1; i <= 12; i++) {
      arrFake.push({ "label": i, "value": value })
    }
    const arrReal = this.tourOrdersMonthly;
    for(let i = 0; i < arrReal.length; i++) {
      for(let j = 0; j < arrFake.length; j++) { 
        if(arrFake[j].label === arrReal[i].month) {
          arrFake[j].label = arrReal[i].month;
          arrFake[j].value = arrReal[i].total_tour;
        }
      }
    }
    this.datasource.tourOrder.data = arrFake.map(item => ({ "label": "Tháng " + item.label, "value": item.value}));
  },
  computed: {
    ...mapGetters("dashboard", ["counts", "tourOrders", "tourOrdersMonthly", "postsMonthly", "years", "isLoading"]),
  },
  methods: {
    ...mapActions("dashboard", ["PAGINATE"]),
    onChangeYear() {
      console.log(this.yearSelected);
    },
    dateFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    clickPaginate(pageNum) {
      
    }
  },
}
</script>

<style>

</style>