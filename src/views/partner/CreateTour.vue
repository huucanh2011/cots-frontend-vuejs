<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="breadcrumb-item">
          <router-link class="text-secondary" :to="{ name: 'Tour Management' }"
            >Quản lý tour</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Thêm tour</li>
        <li class="ml-auto">
          <router-link class="text-info" :to="{ name: 'Tour Management' }"
            >Back</router-link
          >
        </li>
      </ol>
    </nav>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Thêm tour</h5>
            <form @submit.prevent="createTour()">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Tên tour</label>
                        <input type="text" class="form-control" placeholder="Nhập tên tour" v-model="tour.tourName">
                    </div>
                    <div class="col-md-6">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label>Nơi đi</label>
                                <input type="text" class="form-control" placeholder="Nhập nơi đi" v-model="tour.fromPlace">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Nơi đến</label>
                                <input type="text" class="form-control" placeholder="Nhập nơi đến" v-model="tour.toPlace">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Loại tour</label>
                                <select class="form-control custom-select" v-model="tour.tourCateId">
                                    <option selected disabled>Chọn</option>
                                    <option v-for="(tourcate, index) in tourcates" :key="index" :value="tourcate.id">{{ tourcate.cate_name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Mô tả</label>
                        <textarea type="text" class="form-control" rows="8" placeholder="Nhập mô tả" v-model="tour.description"></textarea>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Ghi chú</label>
                        <textarea type="text" class="form-control" rows="8" placeholder="Nhập ghi chú" v-model="tour.note"></textarea>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label>Số ngày đi</label>
                                <input type="number" class="form-control" min="1" max="10" placeholder="Nhập số ngày" v-model="tour.numberDays">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Số người</label>
                                <input type="number" class="form-control" min="1" max="20" placeholder="Nhập số người" v-model="tour.numberPersons">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Giá tiền</label>
                                <input type="text" class="form-control" placeholder="Nhập giá tiền" v-model="tour.tourPrice">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Ảnh cover</label>
                                <div class="form-control border-0 px-0">
                                    <input type="file" ref="imageCover" class="form-control-file" accept="image/*" @change="onChangeImageCover()">
                                </div>
                            </div>
                            <div class="form-group col-md-6 text-right">
                                <label>Active</label>
                                <div class="form-control border-0 px-0">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="activeTour" v-model="tour.isActive" checked>
                                        <label class="custom-control-label" for="activeTour">active</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divider mt-0 mb-3"></div>
                <div class="d-flex justify-content-between">
                    <div>
                        <button type="reset" class="btn btn-outline-secondary mr-1"><i class="fas fa-redo-alt"></i> Làm mới</button>
                        <button type="button" class="btn btn-outline-info ml-1" @click="onClickListTour()"><i class="fas fa-list-ul"></i> Danh sách</button>
                    </div>
                    <button type="submit" class="btn btn-success"><span v-if="loadingButton" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><i v-else class="far fa-save"></i> Lưu</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
    data: () => ({
        tour: {
            tourName: "",
            description: "",
            fromPlace: "",
            toPlace: "",
            numberDays: "",
            numberPersons: "",
            tourPrice: "",
            note: "",
            tourCateId: "",
            isActive: true,
            imageCover: []
        },
        dateDeparture: "",
        loadingButton: false
    }),
    created() {
        store.dispatch("tourcategory/TOURCATES_FETCH")
    },
    computed: {
        ...mapGetters("tourcategory", ["tourcates"]),
    },
    methods: {
        ...mapActions("tour", ["TOUR_CREATE"]),
        ...mapActions("datedeparture", ["DATE_CREATE"]),
        onClickListTour() {
            this.$router.push({ name: 'Tour Management' });
        },
        onChangeImageCover() {
            this.tour.imageCover.push(this.$refs.imageCover.files[0]);
        },
        async createTour() {
            this.loadingButton = true;
            let vm = this.tour;
            let active = true;
            if(vm.isActive === false) {
                active = false;
            }
            let formData = new FormData();         
            formData.append("image_cover", vm.imageCover[0]);
            formData.append("tour_name", vm.tourName);
            formData.append("description", vm.description);
            formData.append("from_place", vm.fromPlace);
            formData.append("to_place", vm.toPlace);
            formData.append("number_days", vm.numberDays);
            formData.append("number_persons", vm.numberPersons);
            formData.append("tour_price", vm.tourPrice);
            formData.append("note", vm.note);
            formData.append("tourcate_id", vm.tourCateId);
            formData.append("is_active", active);
            await this.TOUR_CREATE(formData)
            this.loadingButton = false;
            this.$toast.success({
                color: "#67C23A",
                title: "Success!",
                message: "Thêm thành công!"
            });
        }
    }
};
</script>

<style></style>
