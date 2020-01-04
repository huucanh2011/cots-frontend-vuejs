<template>
  <div>
      <!-- {{ $route.params.tourId }} -->
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
        <li class="breadcrumb-item active" aria-current="page">Cập nhật tour</li>
        <li class="ml-auto">
          <router-link class="text-info" :to="{ name: 'Tour Management' }"
            >Back</router-link
          >
        </li>
      </ol>
    </nav>
    <div class="card">
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else class="card-body">
        <h5 class="card-title">Cập nhật tour</h5>
        <form @submit.prevent="updateTour()">
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
                    <textarea type="text" class="form-control" rows="7" placeholder="Nhập mô tả" v-model="tour.description"></textarea>
                </div>
                <div class="form-group col-md-6">
                    <label>Ghi chú</label>
                    <textarea type="text" class="form-control" rows="7" placeholder="Nhập ghi chú" v-model="tour.note"></textarea>
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
                <button type="submit" class="btn btn-info"><span v-if="loadingButton" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><i v-else class="far fa-save"></i> Cập nhật</button>
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
            imageCover: [],
        },
        loadingButton: false,
        isLoading: false
    }),
    async created() {
        this.isLoading = true;
        let id = this.$route.params.tourId;
        let vm = this.tour;
        vm.id = id;
        const { data } = await this.TOUR_FETCH_ONE(id);
        vm.tourName = data.tour_name;
        vm.fromPlace = data.from_place;
        vm.toPlace = data.to_place;
        vm.numberDays = data.number_days;
        vm.numberPersons = data.number_persons;
        vm.description = data.description;
        vm.note = data.note;
        vm.tourPrice = data.tour_price;
        vm.tourCateId = data.tourcate_id;
        vm.isActive = data.is_active;
        this.isLoading = false;
        store.dispatch("tourcategory/TOURCATES_FETCH")
    },
    computed: {
        ...mapGetters("tourcategory", ["tourcates"]),
    },
    methods: {
        ...mapActions("tour", ["TOUR_UPDATE","TOUR_FETCH_ONE"]),
        onClickListTour() {
            this.$router.push({ name: 'Tour Management' });
        },
        onChangeImageCover() {
            this.tour.imageCover.push(this.$refs.imageCover.files[0]);
        },
        async updateTour() {
            this.loadingButton = true;
            let vm = this.tour;
            let active = 1;
            if(vm.isActive === false) {
                active = 0;
            }
            let formData = new FormData();
            let tourUpdate = {
                id: vm.id,
                updatedFields: {
                    tour_name: vm.tourName,
                    description: vm.description,
                    from_place: vm.fromPlace,
                    to_place: vm.toPlace,
                    number_days: vm.numberDays,
                    number_persons: vm.numberPersons,
                    tour_price: vm.tourPrice,
                    note: vm.note,
                    tourcate_id: vm.tourCateId,
                    is_active: active,
                    // image_name: formData.append("image_name", vm.imageCover[0])
                }
            }
            await this.TOUR_UPDATE(tourUpdate);
            this.loadingButton = false;
            this.$router.push({ name: 'Tour Management' })
            this.$toast.success({
                color: "#67C23A",
                title: "Success!",
                message: "Cập nhật thành công!"
            });
        }
    }
};
</script>

<style>

</style>