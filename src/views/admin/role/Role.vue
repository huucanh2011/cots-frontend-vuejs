<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Danh sách quyền</h5>
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
            List of role
          </caption>
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Tên quyền</th>
              <th scope="col">Created at</th>
              <th scope="col">Updated at</th>
              <th scope="col" class="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="text-center">
              <td colspan="5">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(role, index) in roles.data" :key="index">
              <th scope="row">{{ role.id }}</th>
              <td>{{ role.role_name }}</td>
              <td>{{ role.created_at | myDate }}</td>
              <td>{{ role.updated_at | myDate }}</td>
              <td class="text-center">
                <a class="mr-2" href="#" @click="updateModal(role)">
                  <i class="menu-icon icon-pencil text-info"></i>
                </a>
                <a class="ml-2" href="#" @click="deleteModal(role)">
                  <i class="menu-icon icon-bin2 text-danger"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="roles.last_page == null ? 1 : roles.last_page"
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
      id="modalRole"
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
              Thêm quyền
            </h5>
            <h5 class="modal-title" v-show="editMode" id="modalTitle">
              Cập nhật quyền
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode ? updateRole() : createRole()">
            <ValidationObserver v-slot="{ valid }">
              <div class="modal-body">
                <div class="form-group">
                  <label for="roleName">Tên quyền</label>
                  <ValidationProvider
                    name="role name"
                    rules="required|max:255"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] }"
                      v-model="roleName"
                      placeholder="Tên quyền"
                      name="roleName"
                      id="roleName"
                    />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
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
          ></span
          >Có
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
  name: "RoleView",
  data: () => ({
    editMode: false,
    loadingButton: false,
    roleName: "",
    searchText: ""
  }),
  created() {
    store.dispatch("role/ROLES_FETCH");
  },
  computed: {
    ...mapGetters("role", ["roles", "errors", "isLoading"])
  },
  methods: {
    ...mapActions("role", [
      "ROLE_CREATE",
      "ROLE_UPDATE",
      "ROLE_DELETE",
      "ROLES_PAGINATE",
      "ROLES_SEARCH"
    ]),
    clickPaginate(pageNum) {
      this.ROLES_PAGINATE(pageNum);
    },
    searchUp() {
      this.ROLES_SEARCH(this.searchText);
    },
    newModal() {
      this.editMode = false;
      this.roleName = "";
      $("#modalRole").modal("show");
    },
    closeModal() {
      this.editMode = false;
      this.roleName = "";
      $("#modalRole").modal("hide");
    },
    updateModal(role) {
      this.editMode = true;
      this.roleName = role.role_name;
      this.id = role.id;
      $("#modalRole").modal("show");
    },
    deleteModal(role) {
      $(".submit__delete__modal").modal("show");
      this.id = role.id;
    },
    async createRole() {
      let vm = this;
      vm.loadingButton = true;
      const role = {
        role_name: vm.roleName
      };
      try {
        await vm.ROLE_CREATE(role);
        $("#modalRole").modal("hide");
        vm.loadingButton = false;
        vm.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Thêm quyền thành công"
        });
      } catch (error) {
        $("#modalRole").modal("hide");
        vm.loadingButton = false;
        vm.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: vm.errors.role_name[0]
        });
      }
    },
    async updateRole() {
      let vm = this;
      vm.loadingButton = true;
      try {
        await vm.ROLE_UPDATE({
          id: vm.id,
          updatedFields: {
            role_name: vm.roleName
          }
        });
        $("#modalRole").modal("hide");
        vm.loadingButton = false;
        vm.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Cập nhật quyền thành công"
        });
      } catch (error) {
        $("#modalRole").modal("hide");
        vm.loadingButton = false;
        vm.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: vm.errors.role_name[0]
        });
      }
    },
    async submitDelete() {
      let vm = this;
      vm.loadingButton = true;
      try {
        await vm.ROLE_DELETE(vm.id);
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Xoá quyền thành công"
        });
      } catch (error) {
        $(".submit__delete__modal").modal("hide");
        this.loadingButton = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: vm.errors.role_name[0]
        });
      }
    }
  }
};
</script>

<style></style>
