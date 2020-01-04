import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";

import CxltToastr from "cxlt-vue2-toastr";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

import {
  ValidationProvider,
  ValidationObserver
} from "vee-validate/dist/vee-validate.full";

// Import css js template
// import "bootstrap";
// import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./assets/admin_assets/plugins/font-awesome/css/all.min.css";
import "./assets/admin_assets/plugins/icomoon/style.css";
import "./assets/admin_assets/plugins/switchery/switchery.min.css";

import "./assets/admin_assets/css/concept.min.css";
import "./assets/admin_assets/css/custom.css";

import "./assets/admin_assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js";
import "./assets/admin_assets/plugins/switchery/switchery.min.js";
import "./assets/admin_assets/js/concept.js";

import "bootstrap-select";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "bootstrap-select/dist/js/bootstrap-select.js";

// End import css js template

import ApiService from "@/common/api.service";

import VueProgressBar from "vue-progressbar";

import SubmitDeleteModal from "@/components/admin/modal/SubmitDeleteModal";
import DetailsModal from "@/components/admin/modal/DetailsModal";
import ModalLarge from "@/components/admin/modal/ModalLarge";
import ModalNormal from "@/components/admin/modal/ModalNormal";

import Paginate from "vuejs-paginate";

import moment from "moment";
moment.locale("vi");

import numeral from "numeral";

import StarRating from "vue-star-rating";

import VueCarousel from "@chenfengyuan/vue-carousel";

import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

import Datepicker from "vuejs-datepicker";

import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

const toastrConfigs = {
  position: "bottom right",
  showDuration: 1000,
  hideDuration: 1000,
  timeOut: 3500,
  delay: 0,
  showMethod: "fadeInUpBig",
  hideMethod: "fadeOutRight",
  progressBar: true
};

Vue.use(CxltToastr, toastrConfigs);

const options = {
  // color: "#a307dd",
  color: "#79b8ff",
  failedColor: "#EA4335",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300
  }
};

Vue.use(VueProgressBar, options);

Vue.component("modal-normal", ModalNormal);
Vue.component("submit-delete-modal", SubmitDeleteModal);
Vue.component("details-modal", DetailsModal);
Vue.component("modal-large", ModalLarge);

Vue.component("paginate", Paginate);

Vue.filter("myDate", function(created) {
  return moment(created).format("Do/M/YYYY");
});

Vue.filter("myDate2", function(created) {
  return moment(created).fromNow();
});

Vue.filter("myRating", function(value) {
  return numeral(value).format("0.0");
});

Vue.filter("myCurrency", function(value) {
  return numeral(value).format("0,000₫");
});

Vue.component("star-rating", StarRating);

Vue.use(VueCarousel);

Vue.component("vue-bootstrap-typeahead", VueBootstrapTypeahead);

Vue.component("date-picker", Datepicker);

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

Vue.config.productionTip = false;

/* Initialize the API service. */
// ApiService.init();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
