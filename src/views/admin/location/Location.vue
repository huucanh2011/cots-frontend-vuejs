<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Danh sách địa điểm</h5>
          </div>
          <div class="d-flex flex-row">
            <div class="py-1 mr-2">
              <button class="btn btn-success" @click="newModal">
                <i class="fas fa-plus"></i>
                Thêm
              </button>
            </div>
            <div>
              <form @submit.prevent="searchUp()" class="input-group">
                <input
                  type="text"
                  v-model="searchText"
                  class="form-control form-control-sm"
                  placeholder="Tìm kiếm..."
                />
                <div class="input-group-append">
                  <button type="submit" class="btn btn-light">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <table class="table table-hover">
          <caption>
            List of location
          </caption>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên địa điểm</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Mô tả</th>
              <th scope="col" class="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="text-center">
              <td colspan="8">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(location, index) in locations.data" :key="index">
              <th scope="row">{{ ++index }}</th>
              <td>
                <p class="text-truncate" style="width: 150px">
                  {{ location.location_name }}
                </p>
              </td>
              <td>
                <p class="text-truncate" style="width: 150px">
                  {{ location.address }}
                </p>
              </td>
              <td>
                <p class="text-truncate" style="width: 250px">
                  {{ location.description }}
                </p>
              </td>
              <td class="text-center">
                <a class="mr-2" href="#" @click="viewAllImage(location)">
                  <i class="menu-icon icon-images text-dark"></i>
                </a>
                <a class="mx-2" href="#" @click="updateModal(location)">
                  <i class="menu-icon icon-pencil text-info"></i>
                </a>
                <a class="ml-2" href="#" @click="deleteModal(location)">
                  <i class="menu-icon icon-bin2 text-danger"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="locations.last_page == null ? 1 : locations.last_page"
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
    <!-- Modal -->
    <div
      id="modalLocation"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editMode" id="modalTitle">
              Thêm địa điểm
            </h5>
            <h5 class="modal-title" v-show="editMode" id="modalTitle">
              Cập nhật địa điểm
            </h5>
            <button
              type="button"
              class="close"
              @click="closeModal()"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            @submit.prevent="editMode ? updateLocation() : createLocation()"
          >
            <ValidationObserver v-slot="{ valid }">
              <div class="modal-body">
                <div class="form-group">
                  <label for="locationName">Tên địa điểm</label>
                  <ValidationProvider
                    name="location name"
                    rules="required|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="locationName"
                      placeholder="Tên địa điểm"
                      name="locationName"
                      id="locationName"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="address">Địa chỉ</label>
                  <ValidationProvider
                    name="address"
                    rules="required|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="address"
                      placeholder="Địa chỉ"
                      name="address"
                      id="address"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Mô tả</label>
                  <ValidationProvider
                    name="description"
                    rules="required|min:100"
                    v-slot="{ errors }"
                  >
                    <textarea
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="description"
                      placeholder="Mô tả"
                    ></textarea>
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label
                    >Hình
                    <i class="text-danger">(nên chọn ít nhất 1 hình)</i></label
                  >
                  <input
                    class="form-control-file"
                    multiple
                    type="file"
                    ref="imageLocations"
                    accept="image/*"
                    @change="handleFileUploads()"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeModal()"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  v-show="!editMode"
                  class="btn btn-primary"
                  :disabled="!valid"
                >
                  <span
                    v-if="loadingButton"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Thêm
                </button>
                <button
                  type="submit"
                  v-show="editMode"
                  class="btn btn-primary"
                  :disabled="!valid"
                >
                  <span
                    v-if="loadingButton"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Cập nhật
                </button>
              </div>
            </ValidationObserver>
          </form>
        </div>
      </div>
    </div>
    <!-- /Modal -->
    <!-- Delete Modal -->
    <submit-delete-modal>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Huỷ
        </button>
        <button type="button" class="btn btn-primary" @click="submitDelete">
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
    <!-- /Delete Modal -->
    <!-- Detail Modal -->
    <details-modal>
      <div slot="modal-header" class="modal-header">
        <h5 class="modal-title" id="modalTitle">Hình ảnh</h5>
        <button
          type="button"
          class="close"
          @click="closeViewImage()"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div slot="modal-body" class="modal-body p-3">
        <carousel
          v-if="data.length !== 0"
          :data="data"
          indicator-type="disc"
          :autoplay="false"
        >
        </carousel>
        <p v-else class="text-center lead">Không có hình ảnh nào</p>
      </div>
    </details-modal>
    <!-- /Detail Modal -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    editMode: false,
    loadingButton: false,

    id: "",
    locationName: "",
    address: "",
    description: "",
    files: [],
    data: [],

    searchText: ""
  }),
  created() {
    store.dispatch("location/LOCATIONS_FETCH");
    store.dispatch("imagelocation/IMAGES_FETCH");
  },
  computed: {
    ...mapGetters("location", ["locations", "isLoading"]),
    ...mapGetters("imagelocation", ["images", "isLoadingImage"])
  },
  methods: {
    ...mapActions("location", [
      "LOCATION_CREATE",
      "LOCATION_UPDATE",
      "LOCATION_DELETE",
      "LOCATIONS_PAGINATE",
      "LOCATIONS_SEARCH"
    ]),
    ...mapActions("imagelocation", ["IMAGES_CREATE", "IMAGES_DELETE"]),
    handleFileUploads() {
      this.files = this.$refs.imageLocations.files;
    },
    clickPaginate(pageNum) {
      this.LOCATIONS_PAGINATE(pageNum);
    },
    searchUp() {
      this.LOCATIONS_SEARCH(this.searchText);
    },
    newModal() {
      this.editMode = false;
      this.id = "";
      this.locationName = "";
      this.address = "";
      this.description = "";
      this.files = [];
      $("#modalLocation").modal("show");
    },
    closeModal() {
      this.editMode = false;
      this.id = "";
      this.locationName = "";
      this.address = "";
      this.description = "";
      this.files = [];
      $("#modalLocation").modal("hide");
    },
    async viewAllImage(location) {
      let vm = this;
      let len = vm.images.length;
      let out = [];
      for (let i = 0; i < len; i++) {
        let src =
          "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/locations/";
        if (vm.images[i].location.id === location.id) {
          src += vm.images[i].image_name;
          out.push('<img class="post-image w-100" src="' + src + '" />');
        }
      }
      this.data = await out;
      $(".details__modal").modal("show");
    },
    closeViewImage() {
      this.data = [];
      $(".details__modal").modal("hide");
    },
    updateModal(location) {
      this.editMode = true;
      this.id = location.id;
      this.locationName = location.location_name;
      this.address = location.address;
      this.description = location.description;
      $("#modalLocation").modal("show");
    },
    deleteModal(location) {
      this.id = location.id;
      $(".submit__delete__modal").modal("show");
    },
    async createLocation() {
      let files = this.files;
      let len = files.length;
      this.loadingButton = true;
      let location = {
        location_name: this.locationName,
        address: this.address,
        description: this.description
      };
      try {
        const response = await this.LOCATION_CREATE(location);
        if (len <= 0) {
          $("#modalLocation").modal("hide");
          this.loadingButton = false;

          this.$toast.success({
            color: "#51A351",
            title: "Success!",
            message: "Thêm địa điểm thành công"
          });
          return;
        }
        for (let i = 0; i < len; i++) {
          let formData = new FormData();
          formData.append("image_name", files[i]);
          formData.append("location_id", response.id);
          this.IMAGES_CREATE(formData);
        }
        $("#modalLocation").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Thêm địa điểm thành công"
        });
      } catch (error) {
        $("#modalLocation").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Thêm địa điểm thất bại"
        });
      }
    },
    async updateLocation() {
      this.loadingButton = true;
      let files = this.files;
      let len = files.length;
      let location = {
        id: this.id,
        updatedFields: {
          location_name: this.locationName,
          address: this.address,
          description: this.description
        }
      };
      try {
        const response = await this.LOCATION_UPDATE(location);
        if (len <= 0) {
          $("#modalLocation").modal("hide");
          this.loadingButton = false;

          this.$toast.success({
            color: "#51A351",
            title: "Success!",
            message: "Cập nhật địa điểm thành công"
          });

          return;
        }
        this.IMAGES_DELETE(this.id);
        for (let i = 0; i < len; i++) {
          let formData = new FormData();
          formData.append("image_name", files[i]);
          formData.append("location_id", this.id);
          this.IMAGES_CREATE(formData);
        }
        $("#modalLocation").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Cập nhật địa điểm thành công"
        });
      } catch (error) {
        $("#modalLocation").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Cập nhật địa điểm thất bại"
        });
      }
    },
    async submitDelete() {
      this.loadingButton = true;
      try {
        await this.LOCATION_DELETE(this.id);
        this.IMAGES_DELETE(this.id);
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Xoá địa điểm thành công"
        });
      } catch (error) {
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Xoá địa điểm thất bại"
        });
      }
    }
  }
};
</script>

<style></style>
