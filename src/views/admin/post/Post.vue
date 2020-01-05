<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Danh sách bài đăng</h5>
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
            List of post
          </caption>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Điểm</th>
              <th scope="col">Địa điểm</th>
              <th scope="col">Người đăng</th>
              <th scope="col">Lượt thích</th>
              <th scope="col">Status</th>
              <th scope="col" class="text-center">Active</th>
              <th scope="col" class="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isPostLoading" class="text-center">
              <td colspan="8">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(post, index) in posts.data" :key="index">
              <th scope="row">{{ ++index }}</th>
              <td>
                <p class="text-truncate" style="max-width: 200px;">
                  {{ post.post_content }}
                </p>
              </td>
              <td>
                <h6 class="text-warning">
                  <i class="fas fa-star"></i>
                  {{ post.post_scores }}
                </h6>
              </td>
              <td>
                <p class="text-truncate" style="max-width: 200px;">
                  {{ post.location.location_name }}
                </p>
              </td>
              <td>
                <a href="#" class="text-primary" @click="viewDetailUser(post)">
                  {{ post.user.name }}
                </a>
              </td>
              <td>{{ post.likes.length }}</td>
              <td class="text-center">
                <span
                  :class="
                    post.is_active
                      ? 'badge badge-success'
                      : 'badge badge-danger'
                  "
                >
                  {{ post.is_active ? "Active" : "Blocked" }}
                </span>
              </td>
              <td class="text-center">
                <div class="custom-control custom-checkbox">
                  <input
                    class="custom-control-input"
                    type="checkbox"
                    value="0"
                    :id="fetchNameCheck(post)"
                    @change="onChangeStatus($event, post)"
                    :checked="post.is_active"
                  />
                  <label
                    class="custom-control-label"
                    :for="fetchNameCheck(post)"
                  >
                  </label>
                </div>
              </td>
              <td class="text-center">
                <a class="mr-2" href="#" @click="updateModal(post)">
                  <i class="menu-icon icon-pencil text-info"></i>
                </a>
                <a class="ml-2" href="#" @click="deleteModal(post)">
                  <i class="menu-icon icon-bin2 text-danger"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="posts.last_page == null ? 1 : posts.last_page"
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
      id="modalPost"
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
              Thêm bài đăng
            </h5>
            <h5 class="modal-title" v-show="editMode" id="modalTitle">
              Cập nhật bài đăng
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
          <form @submit.prevent="editMode ? updatePost() : createPost()">
            <ValidationObserver v-slot="{ valid }">
              <div class="modal-body">
                <div class="form-gourp">
                  <label v-if="currentLocation === null">Địa điểm</label>
                  <label v-else
                    >Địa điểm hiện tại
                    <i class="text-info">{{ currentLocation }}</i></label
                  >
                  <vue-bootstrap-typeahead
                    v-model="searchLocationText"
                    :data="locations"
                    :serializer="item => item.location_name"
                    @hit="selectedLocation = $event"
                    placeholder="Tìm địa điểm..."
                  />
                </div>
                <div class="form-gourp">
                  <ValidationProvider
                    name="content"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <label>Nội dung</label>
                    <textarea
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="postContent"
                      placeholder="Bạn suy nghĩ gì"
                      rows="3"
                    ></textarea>
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Điểm</label>
                  <star-rating
                    v-if="editMode === false"
                    v-model="rating"
                    :star-size="20"
                  ></star-rating>
                  <star-rating
                    v-else
                    v-model="currentScores"
                    :star-size="20"
                  ></star-rating>
                </div>
                <div class="form-group">
                  <label
                    >Hình
                    <i class="text-danger">(chọn ít nhất 1 hình)</i></label
                  >
                  <input
                    type="file"
                    class="form-control-file"
                    ref="imagePosts"
                    accept="image/*"
                    multiple
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
        <h5 class="modal-title" id="modalTitle">Thông tin người bình luận</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div slot="modal-body" class="modal-body">
        <div class="row">
          <div class="col-4">
            <img
              :src="urlImage"
              class="rounded-circle img-fulid"
              width="150px"
            />
          </div>

          <div class="col-8">
            <div class="form-group row">
              <label class="col-4 col-form-label">Email:</label>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.email"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-4 col-form-label">Tên hiển thị:</label>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.name"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-4 col-form-label">Địa chỉ:</label>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.address"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-4 col-form-label">Số điện thoại:</label>
              <div class="col-8">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.phone_number"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-4 col-form-label">Mô tả:</label>
              <div class="col-8">
                <textarea
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.description"
                ></textarea>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-4 col-form-label" for="show-ten"
                >Trạng thái:</label
              >
              <div class="col-8">
                <span
                  :class="
                    user.is_active === 1
                      ? 'badge badge-success'
                      : 'badge badge-danger'
                  "
                  >{{ user.is_active === 1 ? "Active" : "Blocked" }}</span
                >
              </div>
            </div>
            <div class="form-group row">
              <label class="col-4 col-form-label">Quyền:</label>
              <div class="col-8">
                <span class="badge badge-primary">{{
                  user.role_id === 1
                    ? "admin"
                    : user.role_id === 2
                    ? "partner"
                    : "user"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Đóng
        </button>
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

    id: null,
    postContent: null,
    rating: null,
    selectedLocation: null,
    files: [],

    searchLocationText: null,
    locations: [],

    currentLocation: null,
    currentLocationId: null,
    currentScores: null,

    searchText: null,
    user: {},
    urlImage: null
  }),
  created() {
    store.dispatch("post/POSTS_FETCH");
    store.dispatch("imagepost/IMAGES_FETCH");
  },
  computed: {
    ...mapGetters("post", ["posts", "errors", "isPostLoading"]),
    ...mapGetters("imagepost", ["images", "isLoadingImage"])
  },
  watch: {
    async searchLocationText(query) {
      const { data } = await this.LOCATIONS_SEARCH(query);
      this.locations = data;
    }
  },
  methods: {
    ...mapActions("post", [
      "POST_CREATE",
      "POST_UPDATE",
      "POST_DELETE",
      "POSTS_PAGINATE",
      "POSTS_SEARCH",
      "POST_CHANGE_STATUS"
    ]),
    ...mapActions("user", ["USER_ONE_FETCH"]),
    ...mapActions("location", ["LOCATIONS_SEARCH"]),
    ...mapActions("imagepost", [
      "IMAGES_CREATE",
      "IMAGES_DELETE",
      "IMAGES_SHOW"
    ]),
    fetchNameCheck(x) {
      return "checkbox_" + x.id;
    },
    searchUp() {
      this.POSTS_SEARCH(this.searchText);
    },
    onChangeStatus($event, payload) {
      let is_active = false;
      if ($event.target.checked) {
        is_active = true;
      }
      let post = {
        id: payload.id,
        is_active: is_active
      };
      this.POST_CHANGE_STATUS(post);
    },
    handleFileUploads() {
      this.files = this.$refs.imagePosts.files;
    },
    show(post) {
      this.IMAGES_SHOW(post.id);
    },
    getUrlImage(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" +
        name
      );
    },
    clickPaginate(pageNum) {
      console.log(pageNum);
      this.POSTS_PAGINATE(pageNum);
    },
    newModal() {
      this.editMode = false;
      this.postContent = null;
      this.rating = null;
      this.selectedLocation = null;
      this.searchLocationText = null;
      this.currentLocation = null;
      this.currentLocationId = null;
      this.currentScores = null;
      this.searchText = null;
      $("#modalPost").modal("show");
    },
    closeModal() {
      this.editMode = false;
      this.postContent = null;
      this.rating = null;
      this.selectedLocation = null;
      this.searchLocationText = null;
      this.currentLocation = null;
      this.currentLocationId = null;
      this.currentScores = null;
      this.searchText = null;
      $("#modalPost").modal("hide");
    },
    updateModal(post) {
      this.editMode = true;
      this.id = post.id;
      this.postContent = post.post_content;
      this.currentScores = post.post_scores;
      this.currentLocation = post.location.location_name;
      this.currentLocationId = post.location.id;
      $("#modalPost").modal("show");
    },
    async updatePost() {
      this.loadingButton = true;
      let locationId = null;
      if (this.selectedLocation === null) {
        locationId = this.currentLocationId;
      } else {
        locationId = this.selectedLocation.id;
      }
      try {
        const response = await this.POST_UPDATE({
          id: this.id,
          updatedFields: {
            post_content: this.postContent,
            post_scores: this.currentScores,
            location_id: locationId
          }
        });
        let files = this.files;
        let len = files.length;
        if (len <= 0) {
          $("#modalPost").modal("hide");
          this.loadingButton = false;
          this.$toast.success({
            color: "#51A351",
            title: "Success!",
            message: "Cập nhật bài đăng thành công"
          });
          return;
          this.IMAGES_DELETE(this.id);
          for (let i = 0; i < len; i++) {
            let formData = new FormData();
            formData.append("image_name", files[i]);
            formData.append("post_id", this.id);
            this.IMAGES_CREATE(formData);
          }
          $("#modalPost").modal("hide");
          this.loadingButton = false;
          this.$toast.success({
            color: "#51A351",
            title: "Success!",
            message: "Cập nhật bài đăng thành công"
          });
        }
      } catch (error) {
        $("#modalPost").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Cập nhật bài đăng thất bại"
        });
      }
    },
    viewDetailUser(post) {
      this.USER_ONE_FETCH(post.user.id).then(({ data }) => {
        this.user = data;
        this.urlImage = this.getUrlImage(data.avatar);
        $(".details__modal").modal("show");
      });
    },
    async createPost() {
      this.loadingButton = true;
      let post = {
        post_content: this.postContent,
        post_scores: this.rating,
        location_id: this.selectedLocation.id
      };
      try {
        const response = await this.POST_CREATE(post);
        let files = this.files;
        let len = files.length;
        if (len <= 0) {
          $("#modalPost").modal("hide");
          this.loadingButton = false;
          this.$toast.success({
            color: "#51A351",
            title: "Success!",
            message: "Thêm bài đăng thành công"
          });
          return;
        }
        for (let i = 0; i < len; i++) {
          let formData = new FormData();
          formData.append("image_name", files[i]);
          formData.append("post_id", response.id);
          this.IMAGES_CREATE(formData);
        }
        $("#modalPost").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Thêm bài đăng thành công"
        });
      } catch (error) {
        $("#modalPost").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Thêm bài đăng thất bại"
        });
      }
    },
    deleteModal(post) {
      $(".submit__delete__modal").modal("show");
      this.id = post.id;
    },
    async submitDelete() {
      this.loadingButton = true;
      try {
        await this.POST_DELETE(this.id);
        this.IMAGES_DELETE(this.id);
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Xoá bài đăng thành công"
        });
      } catch (error) {
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Xoá bài đăng thất bại"
        });
      }
    }
  }
};
</script>

<style></style>
