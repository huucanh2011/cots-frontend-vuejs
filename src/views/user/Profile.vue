<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Profile</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-12">
        <div class="profile-cover shadow height--img--cover orverflow-hidden">
          <img class="w-100 h-100" :src="getUrlImage(currentUser.image_cover)">
        </div>
        <div class="profile-header">
          <input type="file" class="d-none" ref="imageAvatar" accept="image/*" @change="onChangeImageAvatar()">
          <div class="profile-img" @click="onClickImageAvatar()" style="cursor: pointer">
            <img :src="getUrlImage(currentUser.avatar)">
          </div>
          <div class="profile-name">
            <h3>{{ currentUser.name }}</h3>
          </div>
          <div class="profile-header-menu">
            <ul class="list-unstyled">
              <li>
                <input type="file" class="d-none" ref="imageCover" accept="image/*" @change="onChangeImageCover()">
                <a class="border rounded-lg py-1 px-2" href="#" @click="onClickBtnImgCover()"><i class="far fa-image"></i> Đổi ảnh bìa</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card shadow rounded-lg border-0 sticky-top">
          <div class="card-body">
            <h5 class="card-title text-center">Thông tin</h5>
            <div class="form-group row">
              <label for="emailUser" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input type="email" readonly class="form-control-plaintext" id="emailUser" :value="currentUser.email">
              </div>
            </div>
            <div class="form-group row">
              <label for="nameUser" class="col-sm-3 col-form-label">Tên</label>
              <div class="col-sm-9">
                <input v-if="!editMode" type="text" readonly class="form-control" id="nameUser" :value="currentUser.name">
                <input v-else type="text" v-model="user.name" class="form-control" id="nameUser">
              </div>
            </div>
            <div class="form-group row">
              <label for="phoneNumberUser" class="col-sm-3 col-form-label">Số điện thoại</label>
              <div class="col-sm-9">
                <input v-if="!editMode" type="text" readonly class="form-control" id="phoneNumberUser" :value="currentUser.phone_number">
                <input v-else type="text" v-model="user.phoneNumber" class="form-control" id="phoneNumberUser">
              </div>
            </div>
            <div class="form-group row">
              <label for="addressUser" class="col-sm-3 col-form-label">Địa chỉ</label>
              <div class="col-sm-9">
                <input v-if="!editMode" type="text" readonly class="form-control" id="addressUser" :value="currentUser.address">
                <input v-else type="text" v-model="user.address" class="form-control" id="addressUser">
              </div>
            </div>
            <div class="form-group row">
              <label for="descriptionUser" class="col-sm-3 col-form-label">Mô tả</label>
              <div class="col-sm-9">
                <textarea v-if="!editMode" type="text" v-model="currentUser.description" readonly class="form-control" id="descriptionUser" rows="3"></textarea>
                <textarea v-else type="text" v-model="user.description" class="form-control" id="descriptionUser" rows="3"></textarea>
              </div>
            </div>
            <div v-if="changePasswordMode">
              <div class="form-group row">
                <label for="currentPassword" class="col-sm-3 col-form-label">Mật khẩu cũ</label>
                <div class="col-sm-9">
                  <input type="password" v-model="currentPassword" class="form-control" id="currentPassword">
                </div>
              </div>
              <div class="form-group row">
                <label for="newPassword" class="col-sm-3 col-form-label">Mật khẩu mới</label>
                <div class="col-sm-9">
                  <input type="password" v-model="newPassword" class="form-control" id="newPassword">
                </div>
              </div>
              <div class="form-group row">
                <label for="confirmNewPassword" class="col-sm-3 col-form-label">Xác nhận</label>
                <div class="col-sm-9">
                  <input type="password" v-model="confirmNewPassword" class="form-control" id="confirmNewPassword">
                </div>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-end">                
              <div v-if="!editMode">
                <div v-if="changePasswordMode">
                  <button class="btn btn-secondary" @click="changePasswordMode = false"><i class="fas fa-times"></i> Huỷ</button>
                  <button class="btn btn-success ml-2" @click="updatePassword()">
                    <span v-if="loadingButton" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <i v-else class="fas fa-save"></i> Cập nhật
                  </button>
                </div>
                <div v-else>
                  <!-- <button class="btn btn-info" @click="changePasswordMode = true"><i class="fas fa-key"></i> Đổi mật khẩu</button> -->
                  <button class="btn btn-dark ml-2" @click="onClickBtnEdit()"><i class="fas fa-pen"></i> Sửa</button>
                </div>
              </div>
              <div v-else>
                <button class="btn btn-secondary" @click="editMode = false"><i class="fas fa-times"></i> Huỷ</button>
                <button class="btn btn-success ml-2" @click="updateDetails()">
                  <span v-if="loadingButton" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <i v-else class="fas fa-save"></i> Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card shadow rounded-lg border-0">
          <div class="card-body">
            <h5 class="card-title text-center">Bài Đăng</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    user: {
      name: "",
      phoneNumber: "",
      address: "",
      description: ""
    },
    imageCover: [],
    avatar: [],
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    editMode: false,
    changePasswordMode: false,
    loadingButton: false
  }),
  created() {
    
  },
  computed: {
    ...mapGetters("authentication", ["currentUser", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("authentication", ["UPDATE_DETAILS", "UPDATE_AVATAR"]),
    getUrlImage(name) {
      return "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" + name;
    },
    onClickBtnEdit() {
      this.editMode = true;
      let cur = this.currentUser;
      let upd = this.user;
      upd.name = cur.name;
      upd.phoneNumber = cur.phone_number;
      upd.address = cur.address;
      upd.description = cur.description;
    },
    async updateDetails() {
      let vm = this;
      vm.loadingButton = true;
      const userUpdate = {
        'name': vm.user.name,
        'phone_number': vm.user.phoneNumber,
        'address': vm.user.address,
        'description': vm.user.description
      }
      await vm.UPDATE_DETAILS(userUpdate);
      this.$toast.success({
        color: "#51A351",
        title: "Success!",
        message: "Cập nhật thành công!"
      });
      vm.loadingButton = false;
      vm.editMode = false;
    },
    onClickImageAvatar() {
      this.$refs.imageAvatar.click();
    },
    async onChangeImageAvatar() {
      if(this.$refs.imageAvatar.files.length !== 0) {
        let avatar = new FormData();      
        avatar.append("avatar", this.$refs.imageAvatar.files[0]);      
        await this.UPDATE_AVATAR(avatar);
        this.$toast.success({
          color: "#51A351",
          title: "Success!",
          message: "Cập nhật thành công!"
        });
      }
    },
    onClickBtnImgCover() {
      this.$refs.imageCover.click();
    },
    onChangeImageCover() {
      this.imageCover = this.$refs.imageCover.files[0];
      console.log(this.imageCover);
    },
    updatePassword() {
      
    }
  }
};
</script>

<style></style>
