<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Danh sách thành viên</h5>
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
            List of user
          </caption>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col" class="text-center">Ảnh đại diện</th>
              <th scope="col">Số diện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Quyền</th>
              <th scope="col">Status</th>
              <th scope="col" class="text-center">Active</th>
              <th scope="col" class="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="text-center">
              <td colspan="10">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(user, index) in users.data" :key="index">
              <th scope="row">{{ ++index }}</th>
              <td>{{ user.name }}</td>
              <td class="text-info font-weight-bold">{{ user.email }}</td>
              <td class="text-center">
                <img
                  class="rounded-circle img-fulid"
                  :src="getUrlImage(user.avatar)"
                  width="30"
                />
              </td>
              <td>{{ user.phone_number }}</td>
              <td>{{ user.address }}</td>
              <td>
                <span class="badge badge-info">
                  {{ user.role.role_name }}
                </span>
              </td>
              <td>
                <span v-if="user.is_active === 1" class="badge badge-success">
                  Active
                </span>
                <span v-else class="badge badge-danger">
                  Block
                </span>
              </td>
              <td class="text-center">
                <div class="custom-control custom-checkbox">
                  <input
                    class="custom-control-input"
                    type="checkbox"
                    value="0"
                    :id="fetchNameCheck(user)"
                    @change="onChangeStatus($event, user)"
                    :checked="user.is_active === 1"
                  />
                  <label
                    class="custom-control-label"
                    :for="fetchNameCheck(user)"
                  >
                  </label>
                </div>
              </td>
              <td class="text-center">
                <a class="mr-2" href="#" @click="updateModal(user)">
                  <i class="menu-icon icon-pencil text-info"></i>
                </a>
                <a class="ml-2" href="#" @click="deleteModal(user)">
                  <i class="menu-icon icon-bin2 text-danger"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="users.last_page == null ? 1 : users.last_page"
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
      id="modalUser"
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
              Thêm thành viên
            </h5>
            <h5 class="modal-title" v-show="editMode" id="modalTitle">
              Cập nhật thành viên
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
          <form @submit.prevent="editMode ? updateUser() : createUser()">
            <ValidationObserver v-slot="{ valid }">
              <div class="modal-body">
                <div class="form-group">
                  <label>Tên</label>
                  <ValidationProvider
                    name="name"
                    rules="required|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="name"
                      placeholder="Nhập tên"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <ValidationProvider
                    name="email"
                    rules="required|email|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="email"
                      :disabled="editMode"
                      placeholder="Nhập email"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Số điện thoại</label>
                  <ValidationProvider
                    name="phone number"
                    rules="required|min:3|max:12"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="phoneNumber"
                      placeholder="Nhập số điện thoại"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Địa chỉ</label>
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
                      placeholder="Nhập địa chỉ"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Mô tả</label>
                  <textarea
                    type="text"
                    class="form-control"
                    v-model="description"
                    placeholder="Nhập mô tả"
                  ></textarea>
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
                  :disabled="!valid"
                  class="btn btn-primary"
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
                  :disabled="!valid"
                  class="btn btn-primary"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    editMode: false,
    loadingButton: false,
    searchText: "",

    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    description: ""
  }),
  created() {
    store.dispatch("user/USERS_FETCH");
  },
  computed: {
    ...mapGetters("user", ["users", "errors", "isLoading"])
  },
  methods: {
    ...mapActions("user", [
      "USER_CREATE",
      "USER_UPDATE",
      "USER_DELETE",
      "USERS_PAGINATE",
      "USERS_SEARCH",
      "USER_CHANGE_STATUS"
    ]),
    getUrlImage(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" +
        name
      );
    },
    fetchNameCheck(x) {
      return "checkbox_" + x.id;
    },
    onChangeStatus($event, payload) {
      let isActive = 0;
      if ($event.target.checked === true) {
        isActive = 1;
      }
      let user = {
        id: payload.id,
        is_active: isActive
      };
      this.USER_CHANGE_STATUS(user);
    },
    clickPaginate(pageNum) {
      this.USERS_PAGINATE(pageNum);
    },
    searchUp() {
      this.USERS_SEARCH(this.searchText);
    },
    newModal() {
      this.editMode = false;
      this.name = "";
      this.email = "";
      this.phoneNumber = "";
      this.address = "";
      this.description = "";
      $("#modalUser").modal("show");
    },
    closeModal() {
      this.editMode = false;
      this.name = "";
      this.email = "";
      this.phoneNumber = "";
      this.address = "";
      this.description = "";
      $("#modalUser").modal("hide");
    },
    updateModal(user) {
      this.editMode = true;
      this.name = user.name;
      this.email = user.email;
      this.phoneNumber = user.phone_number;
      this.address = user.address;
      this.description = user.description;
      this.id = user.id;
      $("#modalUser").modal("show");
    },
    deleteModal(user) {
      this.id = user.id;
      $(".submit__delete__modal").modal("show");
    },
    async createUser() {
      this.loadingButton = true;
      let user = {
        name: this.name,
        email: this.email,
        phone_number: this.phoneNumber,
        address: this.address,
        description: this.description
      };
      try {
        await this.USER_CREATE(user);
        $("#modalUser").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Thêm thành viên thành công"
        });
      } catch (error) {
        $("#modalUser").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: this.errors.email[0]
        });
      }
    },
    async updateUser() {
      this.loadingButton = true;
      const user = {
        id: this.id,
        updatedFields: {
          name: this.name,
          phone_number: this.phoneNumber,
          address: this.address,
          description: this.description
        }
      };
      try {
        await this.USER_UPDATE(user);
        $("#modalUser").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Cập nhật thành viên thành công"
        });
      } catch (error) {
        $("#modalUser").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Cập nhật thành viên thất bại"
        });
      }
    },
    async submitDelete() {
      this.loadingButton = true;
      try {
        await this.USER_DELETE(this.id);
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Xoá thành viên thành công"
        });
      } catch (error) {
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Xoá thành viên thất bại"
        });
      }
    }
  }
};
</script>

<style></style>
