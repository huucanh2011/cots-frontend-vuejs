<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div>
            <h5 class="card-title">Phân quyền</h5>
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
        <table class="table table-hover">
          <caption>
            List of decentralization
          </caption>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Active</th>
              <th scope="col" v-for="role in roles.data" :key="role.id">
                {{ role.role_name }}
              </th>
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
              v-for="(decentralization, index) in decentralizations.data"
              :key="index"
            >
              <th scope="row">{{ ++index }}</th>
              <td>{{ decentralization.name }}</td>
              <td class="text-info font-weight-bold">
                {{ decentralization.email }}
              </td>
              <td>
                <span
                  v-if="decentralization.is_active"
                  class="badge badge-success"
                >
                  Active
                </span>
                <span v-else class="badge badge-danger">
                  Blocked
                </span>
              </td>
              <td>
                <div class="custom-control custom-checkbox">
                  <input
                    class="custom-control-input"
                    type="checkbox"
                    value="0"
                    :id="fetchNameCheck(decentralization)"
                    @change="onChangeStatus($event, decentralization)"
                    :checked="decentralization.is_active"
                  />
                  <label
                    class="custom-control-label"
                    :for="fetchNameCheck(decentralization)"
                  >
                  </label>
                </div>
              </td>
              <td v-for="(role, index) in roles.data" :key="index">
                <div
                  class="custom-control custom-radio"
                  v-if="role.id === decentralization.role_id"
                >
                  <input
                    type="radio"
                    class="custom-control-input"
                    :name="fetchNameRadio(decentralization)"
                    :id="fetchNameRadio(decentralization, role)"
                    @change="onChangeRole(decentralization, role)"
                    checked
                  />
                  <label
                    class="custom-control-label"
                    :for="fetchNameRadio(decentralization, role)"
                  >
                  </label>
                </div>
                <div class="custom-control custom-radio" v-else>
                  <input
                    type="radio"
                    class="custom-control-input"
                    :name="fetchNameRadio(decentralization)"
                    :id="fetchIdRadio(decentralization, role)"
                    @change="onChangeRole(decentralization, role)"
                  />
                  <label
                    class="custom-control-label"
                    :for="fetchIdRadio(decentralization, role)"
                  >
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
          :page-count="
            decentralizations.last_page == null
              ? 1
              : decentralizations.last_page
          "
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    searchText: ""
  }),
  created() {
    store.dispatch("decentralization/DECENTRALIZATIONS_FETCH");
    store.dispatch("role/ROLES_FETCH");
  },
  computed: {
    ...mapGetters("decentralization", [
      "decentralizations",
      "errors",
      "isLoading"
    ]),
    ...mapGetters("role", ["roles"])
  },
  methods: {
    ...mapActions("decentralization", [
      "DECENTRALIZATIONS_PAGINATE",
      "DECENTRALIZATIONS_SEARCH",
      "DECENTRALIZATION_UPDATE",
      "DECENTRALIZATION_CHANGE_STATUS"
    ]),
    fetchNameCheck(x) {
      return "checkbox_" + x.id;
    },
    fetchNameRadio(x) {
      return "radio_" + x.id;
    },
    fetchIdRadio(x, y) {
      return "radio_" + x.id + "_" + y.id;
    },
    searchUp() {
      this.DECENTRALIZATIONS_SEARCH(this.searchText);
    },
    clickPaginate(pageNum) {
      this.DECENTRALIZATIONS_PAGINATE(pageNum);
    },
    async onChangeStatus($event, decentralization) {
      let isActive = false;
      if ($event.target.checked === true) {
        isActive = true;
      }
      let user = {
        id: decentralization.id,
        is_active: isActive
      };
      await this.DECENTRALIZATION_CHANGE_STATUS(user);
    },
    async onChangeRole(user, role) {
      let decentralization = {
        id: user.id,
        updatedFields: {
          role_update: role.id
        }
      };
      try {
        await this.DECENTRALIZATION_UPDATE(decentralization);
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Phân quyền thành công"
        });
      } catch (error) {
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Phân quyền thất bại"
        });
      }
    }
  }
};
</script>

<style></style>
