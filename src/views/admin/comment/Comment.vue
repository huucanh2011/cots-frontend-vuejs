<template>
  <div>
    <div class="row">
      <div class="col-xl">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Danh sách bình luận</h5>
            <table class="table table-hover">
              <caption>
                List of rating
              </caption>
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Người bình luận</th>
                  <th scope="col">Bài đăng</th>
                  <th scope="col">Ngày bình luận</th>
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
                <tr
                  v-else
                  v-for="(comment, index) in comments.data"
                  :key="index"
                >
                  <th scope="row">{{ ++index }}</th>
                  <td>{{ comment.comment_content }}</td>
                  <td>
                    <a
                      href="#"
                      class="text-primary"
                      @click="viewDetailUser(comment)"
                    >
                      {{ comment.user.name }}
                    </a>
                  </td>
                  <td>{{ comment.post.post_content }}</td>
                  <td>{{ comment.created_at | myDate }}</td>
                  <td class="text-center">
                    <a href="#" @click="deleteModal(comment)">
                      <i class="menu-icon icon-bin2 text-danger"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <paginate
              :page-count="comments.last_page == null ? 1 : comments.last_page"
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
        <h5 class="modal-title" id="modalTitle">Thông tin người đánh giá</h5>
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
    id: "",
    loadingButton: false,
    user: {},
    urlImage: null
  }),
  created() {
    store.dispatch("comment/COMMENTS_FETCH");
  },
  computed: {
    ...mapGetters("comment", ["comments", "errors", "isLoading"])
  },
  methods: {
    ...mapActions("comment", ["COMMENT_DELETE", "COMMENTS_PAGINATE"]),
    ...mapActions("user", ["USER_ONE_FETCH"]),
    getUrlImage(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" +
        name
      );
    },
    clickPaginate(pageNum) {
      this.COMMENTS_PAGINATE(pageNum);
    },
    deleteModal(comment) {
      $(".submit__delete__modal").modal("show");
      this.id = comment.id;
    },
    async submitDelete() {
      this.loadingButton = true;
      try {
        await this.COMMENT_DELETE(this.id);
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Xoá bình luận thành công"
        });
      } catch (error) {
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Xoá bình luận thất bại"
        });
      }
    },
    viewDetailUser(comment) {
      this.USER_ONE_FETCH(comment.user.id).then(({ data }) => {
        this.user = data;
        this.urlImage = this.getUrlImage(data.avatar);
        $(".details__modal").modal("show");
      });
    }
  }
};
</script>

<style></style>
