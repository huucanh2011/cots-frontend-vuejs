<template>
  <div class="row">
    <div class="col-md-3 pr-2">
      <div class="card shadow rounded-lg border-0 sticky-top">
        <div class="card-body">
          <h4 class="card-title text-center text-uppercase">
            Địa điểm nổi bật
          </h4>
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <router-link
            v-else
            v-for="location in topLocations"
            :key="location.id"
            :to="{
              name: 'Location Detail',
              params: { locationId: location.id }
            }"
            class="card-link text-dark"
            :title="location.location_name"
          >
            <div class="d-flex flex-row justify-content-between">
              <p class="text-truncate my-1 mr-3">
                {{ location.location_name }}
              </p>
              <span class="font-weight-bold text-warning my-1">
                {{ location.avg_location_scores | myRating }}
                <!-- <i class="fas fa-star my-1"></i> -->
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-md-6 px-2">
      <div v-if="currentUser != null" class="row mb-3">
        <div class="col-6 pr-2">
          <button
            type="button"
            class="btn btn-secondary btn-lg btn-block"
            @click="onClickBookTour()"
          >
            <i class="fas fa-route mr-3"></i>ĐẶT TOUR
          </button>
        </div>
        <div class="col-6 pl-2">
          <button
            type="button"
            class="btn btn-info btn-lg btn-block"
            :disabled="isCardShow"
            @click="onClickPost()"
          >
            <i class="far fa-newspaper mr-3"></i>ĐĂNG BÀI
          </button>
        </div>
      </div>
      <div v-if="showCardPost" class="card shadow rounded-lg border-0">
        <div class="card-body">
          <div class="d-flex">
            <div class="mr-auto">
              <h5 class="card-title text-uppercase">Đăng bài</h5>
            </div>
            <div class="ml-auto">
              <button type="button" class="close" @click="onCloseCardPost()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <form @submit.prevent="createPost()">
            <ValidationObserver v-slot="{ valid }">
              <div class="form-group">
                <vue-bootstrap-typeahead
                  v-model="searchLocationText"
                  :data="locations"
                  :serializer="item => item.location_name"
                  @hit="selectedLocation = $event"
                  placeholder="Tìm địa điểm..."
                />
              </div>
              <div class="form-gourp my-3">
                <ValidationProvider
                  name="content"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <textarea
                    class="form-control"
                    :class="{ 'is-invalid': errors[0] }"
                    v-model="postContent"
                    placeholder="Bạn suy nghĩ gì..."
                    rows="2"
                  ></textarea>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="form-group d-flex flex-row">
                <div class="ml-0">
                  <label>Chọn hình</label>
                  <input
                    type="file"
                    class="form-control-file"
                    ref="imageUploads"
                    accept="image/*"
                    multiple
                    @change="handleFileUploads()"
                  />
                </div>
                <div class="ml-auto">
                  <label>Điểm</label>
                  <ValidationProvider
                    name="content"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <star-rating
                      v-model="rating"
                      :star-size="20"
                      :show-rating="false"
                    ></star-rating>
                  </ValidationProvider>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-dark btn-block"
                :disabled="!valid"
              >
                <span
                  v-if="loadingButton"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Đăng
              </button>
            </ValidationObserver>
          </form>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div
        v-else
        v-for="(post, index) in posts.data"
        :key="index"
        class="card shadow rounded-lg border-0"
      >
        <div class="card-body">
          <div class="post">
            <div class="post-header">
              <img :src="getUrlImage(post.user.avatar)" class="border" />
              <div class="d-flex flex-row">
                <div class="d-flex flex-column post-info">
                  <div class="d-flex flex-row">
                    <router-link
                      class="text-center text-info mr-4"
                      :to="{
                        name: 'Location Detail',
                        params: { locationId: post.location.id }
                      }"
                    >
                      <i class="fas fa-map-marker-alt"></i>
                      {{ post.location.location_name }}
                    </router-link>
                    <span class="text-warning mr-auto"
                      >{{ post.post_scores }}<i class="fas fa-star mx-1"></i
                    ></span>
                  </div>
                  <div class="d-flex flex-row">
                    <span class="post-author mr-4">{{ post.user.name }}</span>
                    <span class="post-date">{{
                      post.created_at | myDate2
                    }}</span>
                  </div>
                </div>
                <div class="ml-auto">
                  <div
                    v-if="
                      isAuthenticated === true &&
                        currentUser.id === post.user_id
                    "
                    class="d-flex flex-row"
                  >
                    <a
                      class="text-danger mx-3"
                      @click="onClickDeletePost(post.id)"
                      style="cursor: pointer"
                    >
                      <i class="fas fa-trash"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="post-body">
              <p>{{ post.post_content }}</p>
              <carousel
                :data="getImageData(post.image_posts)"
                indicator-type="disc"
              >
              </carousel>
            </div>
            <div class="post-actions">
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="like-btn">
                    <i class="far fa-heart"></i> {{ post.likes.length }} Like
                  </a>
                </li>
                <li>
                  <a href="#" @click="onClickCommentPost(post.id)">
                    <i class="far fa-comment"></i> 0 Comment</a
                  >
                </li>
              </ul>
            </div>
            <div class="post-comments">
              <div
                v-for="(comment, index) in comments"
                :key="index"
                class="my-2"
              >
                <div v-if="comment.post_id === post.id" class="post-comm">
                  <img
                    :src="getUrlImage(comment.user.avatar)"
                    class="comment-img border"
                  />
                  <div class="comment-container">
                    <span class="comment-author">
                      {{ comment.user.name }}
                      <i class="font-weight-normal text-muted"
                        >- {{ comment.created_at | myDate2 }} -</i
                      >
                      <small
                        v-if="
                          currentUser != null &&
                            comment.user.id === currentUser.id
                        "
                        class="comment-date"
                      >
                        <a
                          v-if="
                            optionComment &&
                              onListenerClickEditComment(comment.id)
                          "
                          class="text-info"
                          href="#"
                          @click="openEditComment(comment)"
                          ><i class="fas fa-pen"></i
                        ></a>
                        <a
                          v-if="
                            optionComment &&
                              onListenerClickEditComment(comment.id)
                          "
                          class="text-danger mx-3"
                          href="#"
                          @click="deleteComment(comment.id)"
                          ><i class="fas fa-trash"></i
                        ></a>
                        <a
                          @click="toggleMenuComment(comment.id)"
                          class="text-dark"
                          href="#"
                        >
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                      </small>
                    </span>
                  </div>
                  <span class="comment-text">
                    {{ comment.comment_content }}
                  </span>
                </div>
              </div>
              <div v-if="isAuthenticated" class="new-comment mt-2">
                <div v-if="commentMode && onListenerClick(post.id)">
                  <form @submit.prevent="sendComment(post.id)">
                    <input
                      type="text"
                      v-model="commentContent"
                      class="form-control search-input rounded-pill"
                      placeholder="Nhập bình luận..."
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isLoading" class="text-center mb-4">
        <div v-if="!loadingLoadMore">
          <button
            type="button"
            class="btn btn-sm btn-secondary rounded-pill"
            @click="paginatePost()"
          >
            Xem thêm
          </button>
        </div>
        <div v-else class="text-center mb-4">
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 pl-2">
      <div class="card shadow rounded-lg border-0 sticky-top">
        <div class="card-body">
          <h4 class="card-title text-center text-uppercase">Công ty nổi bật</h4>
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <router-link
            v-else
            v-for="partner in topPartners"
            :key="partner.id"
            :to="{ name: 'Company Detail', params: { companyId: partner.id } }"
            class="card-link text-dark"
            :title="partner.name"
          >
            <div class="d-flex flex-row justify-content-between">
              <p class="text-truncate my-1 mr-3">{{ partner.name }}</p>
              <span class="font-weight-bold text-warning my-1">
                {{
                  partner.avg_partner_scores == null
                    ? "0"
                    : partner.avg_partner_scores | myRating
                }}
                <!-- <i class="fas fa-star"></i> -->
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <modal-normal>
      <div slot="modal-header" class="modal-header">
        <h5 class="modal-title">Cập nhật bình luận</h5>
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
        <div class="form-group">
          <label for="commentContent">Nội dung bình luận</label>
          <input
            class="form-control"
            v-model="commentEdit.content"
            id="commentContent"
            rows="2"
          />
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Hủy
        </button>
        <button type="button" class="btn btn-success" @click="updateComment()">
          <i class="fas fa-save"></i> Lưu
        </button>
      </div>
    </modal-normal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import axios from "axios";

export default {
  name: "HomeView",
  data: () => ({
    //data
    searchLocationText: "",
    locations: [],
    selectedLocation: "",
    postContent: "",
    rating: null,
    files: [],
    //card-post
    showCardPost: false,
    isCardShow: false,
    loadingButton: false,
    //post
    // urlImage: null,
    postIdSelected: null,
    commentMode: false,
    commentContent: "",
    optionComment: false,
    commentIdSelected: null,
    //
    postIdSelectedO: null,
    optionPost: false,
    //
    commentEdit: {
      id: "",
      content: ""
    },
    currentPagePost: 1,
    loadingLoadMore: false
  }),
  created() {
    // Promise.all([
    store.dispatch("home/TOP_LOCATIONS_FETCH"),
    store.dispatch("home/TOP_PARTNERS_FETCH"),
    store.dispatch("home/POSTS_FETCH");
    store.dispatch("home/COMMENTS_FETCH")
    // ]);
    // console.log("hey");

    // axios("http://localhost:8000/api/v1/top-location", {
    //   method: "get",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "multipart/form-data"
    //   }
    // })
    // .then(res => {
    //   console.log(res);

    // })
    // axios
    //   .get("https://travel-server-api.herokuapp.com/api/v1/top-location")
    //   .then(res => {
    //     console.log(res);
    //   });
    // axios("https://travel-server-api.herokuapp.com/api/v1/top-location", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(response => {
    //   console.log(response);
    // });
  },
  watch: {
    async searchLocationText(query) {
      const { data } = await this.LOCATIONS_SEARCH(query);
      this.locations = data;
    }
  },
  computed: {
    ...mapGetters("home", [
      "posts",
      "comments",
      "topLocations",
      "topPartners",
      "isLoading"
    ]),
    ...mapGetters("authentication", ["currentUser", "isAuthenticated"])
  },
  methods: {
    ...mapActions("home", [
      "POST_CREATE",
      "COMMENTS_FETCH",
      "FETCH_MORE_DATA",
      "POST_UPDATE",
      "POST_DELETE",
      "COMMENT_CREATE",
      "COMMENT_UPDATE",
      "COMMENT_DELETE"
    ]),
    ...mapActions("location", ["LOCATIONS_SEARCH"]),
    ...mapActions("imagepost", [
      "IMAGES_CREATE",
      "IMAGES_DELETE",
      "IMAGES_SHOW"
    ]),
    async paginatePost() {
      this.loadingLoadMore = true;
      this.currentPagePost += 1;
      let pageNum = this.currentPagePost;
      await this.FETCH_MORE_DATA(pageNum);
      this.loadingLoadMore = false;
    },
    onClickCommentPost(postId) {
      this.postIdSelected = postId;
      this.commentMode = !this.commentMode;
    },
    onListenerClick(postId) {
      return this.postIdSelected == postId ? true : false;
    },
    onClickDeletePost(postId) {
      confirm("Bạn có chắc chắn?") ? this.POST_DELETE(postId) : "";
    },
    getImageData(imagePosts) {
      return imagePosts.map(
        item =>
          '<img class="post-image" src="https://storage.googleapis.com/cdio-cots.appspot.com/uploads/posts/' +
          item.image_name +
          '" />'
      );
    },
    openEditComment(comment) {
      this.commentEdit.content = comment.comment_content;
      this.commentEdit.id = comment.id;
      $(".normal__modal").modal("show");
    },
    openEditPost(post) {
      this.postEdit.content = postEdit.comment_content;
      this.postEdit.id = postEdit.id;
      $(".normal__modal").modal("show");
    },
    toggleMenuComment(commentId) {
      this.commentIdSelected = commentId;
      this.optionComment = !this.optionComment;
    },
    onListenerClickEditComment(commentId) {
      return this.commentIdSelected == commentId ? true : false;
    },
    getUrlImage(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/" +
        name
      );
    },
    getUrlImagePost(name) {
      return (
        "https://storage.googleapis.com/cdio-cots.appspot.com/uploads/posts/" +
        name
      );
    },
    onClickBookTour() {
      this.$router.push({ name: "All Tour" });
    },
    onClickPost() {
      this.searchLocationText = "";
      this.locations = [];
      this.selectedLocation = "";
      this.postContent = "";
      this.rating = null;
      this.files = [];
      this.showCardPost = true;
      this.isCardShow = true;
    },
    onCloseCardPost() {
      this.searchLocationText = "";
      this.locations = [];
      this.selectedLocation = "";
      this.postContent = "";
      this.rating = null;
      this.files = [];
      this.showCardPost = false;
      this.isCardShow = false;
    },
    getImage(post) {
      this.IMAGE_SHOW(post.id);
    },
    handleFileUploads() {
      this.files = this.$refs.imageUploads.files;
    },
    clearDataState() {
      this.searchLocationText = "";
      this.locations = [];
      this.selectedLocation = "";
      this.postContent = "";
      this.rating = null;
      this.files = [];
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
          this.clearDataState();
          this.loadingButton = false;
          this.showCardPost = false;
          this.isCardShow = false;
          return;
        }
        for (let i = 0; i < len; i++) {
          let formData = new FormData();
          formData.append("image_name", files[i]);
          formData.append("post_id", response.id);
          this.IMAGES_CREATE(formData);
        }
        this.clearDataState();
        this.loadingButton = false;
        this.showCardPost = false;
        this.isCardShow = false;
        this.loadingButton = false;
      } catch (error) {
        this.clearDataState();
        this.loadingButton = false;
        this.showCardPost = false;
        this.isCardShow = false;
        this.$toast.error({
          color: "#BD362F",
          title: "Error!",
          message: "Something wrong: " + error.data
        });
      }
    },
    toggleMenuPost(postId) {
      this.postIdSelectedO = postId;
      this.optionPost = !this.optionPost;
    },
    onListenerClickEditPost(postId) {
      return this.postIdSelectedO == postId ? true : false;
    },
    sendComment(postId) {
      let comment = {
        comment_content: this.commentContent,
        post_id: postId,
        user_id: this.currentUser.id
      };
      this.COMMENT_CREATE(comment);
      this.commentContent = "";
    },
    deleteComment(commentId) {
      confirm("Bạn có chắc chắn?") ? this.COMMENT_DELETE(commentId) : "";
    },
    async updateComment() {
      const comment = {
        id: this.commentEdit.id,
        updatedFields: { comment_content: this.commentEdit.content }
      };
      await this.COMMENT_UPDATE(comment);
      $(".normal__modal").modal("hide");
      this.optionComment = false;
    }
  }
};
</script>

<style></style>
