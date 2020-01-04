webpackJsonp([15],{VcKU:function(t,a){},X5qW:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Dd8w"),r=e.n(s),n=e("Xxa5"),i=e.n(n),c=e("exGp"),o=e.n(c),d=e("NYxO"),l=e("IcnI"),u={data:function(){return{partner:{},tours:{},ratings:{},rating:{content:"",scores:null},ratingMode:!1,editMode:!1,currentPartnerId:"",isLoading:!1}},created:function(){var t=this;return o()(i.a.mark(function a(){var e,s,r,n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(e=t).isLoading=!0,s=e.currentPartnerId=e.$route.params.companyId,a.next=5,e.PARTNER_FETCH_ONE(s);case 5:r=a.sent,n=r.data,e.partner=n.partner,e.ratings=n.ratings,e.tours=n.tours,l.a.dispatch("home/TOP_PARTNERS_FETCH"),e.isLoading=!1;case 12:case"end":return a.stop()}},a,t)}))()},computed:r()({},Object(d.c)("authentication",["currentUser","isAuthenticated"]),Object(d.c)("home",["topPartners"])),methods:r()({},Object(d.b)("partner",["PARTNER_FETCH_ONE"]),Object(d.b)("rating",["RATING_CREATE"]),Object(d.b)("tour",["TOURS_PAGINATE"]),{getUrlImageTour:function(t){return"https://storage.googleapis.com/cdio-cots.appspot.com/uploads/tours/"+t},getUrlImageCover:function(t){return"https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/"+t},onClickCompany:function(t){var a=this;return o()(i.a.mark(function e(){var s,r,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(s=a).isLoading=!0,s.$router.push({name:"Company Detail",params:{companyId:t}}),e.next=5,s.PARTNER_FETCH_ONE(t);case 5:r=e.sent,n=r.data,s.currentPartnerId=t,s.partner=n.partner,s.ratings=n.ratings,s.tours=n.tours,l.a.dispatch("home/TOP_PARTNERS_FETCH"),s.isLoading=!1;case 13:case"end":return e.stop()}},e,a)}))()},submitRating:function(){var t=this;return o()(i.a.mark(function a(){var e,s,r,n,c;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e={rating_content:t.rating.content,rating_scores:t.rating.scores,partner_id:t.currentPartnerId},a.next=3,t.RATING_CREATE(e);case 3:return t.ratingMode=!1,r=(s=t).currentPartnerId=s.$route.params.companyId,a.next=8,s.PARTNER_FETCH_ONE(r);case 8:n=a.sent,c=n.data,s.partner=c.partner,s.ratings=c.ratings,s.tours=c.tours,l.a.dispatch("home/TOP_PARTNERS_FETCH");case 14:case"end":return a.stop()}},a,t)}))()},checkRating:function(){var t=this;return-1!=this.ratings.findIndex(function(a){return a.user_id==t.currentUser.id})},editRating:function(){this.ratingMode=!0,this.editMode=!0},clickPaginate:function(t){this.TOURS_PAGINATE(t)}})},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{attrs:{"aria-label":"breadcrumb"}},[e("ol",{staticClass:"breadcrumb"},[e("li",{staticClass:"breadcrumb-item"},[e("router-link",{staticClass:"text-secondary",attrs:{to:{name:"Home"}}},[t._v("Home")])],1),t._v(" "),e("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v("Chi tiết công ty")])])]),t._v(" "),t.isLoading?e("div",{staticClass:"text-center py-5"},[t._m(0)]):e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"profile-cover shadow height--img--cover overflow-hidden"},[e("img",{staticClass:"w-100 h-100",attrs:{src:t.getUrlImageCover(t.partner.image_cover)}})]),t._v(" "),e("div",{staticClass:"profile-header"},[e("div",{staticClass:"ml-0 profile-name"},[e("h3",[t._v(t._s(t.partner.name))])]),t._v(" "),e("div",{staticClass:"profile-header-menu"},[e("ul",{staticClass:"list-unstyled"},[e("li",[e("a",{attrs:{href:"#"}},[t._v("Mô tả: "+t._s(t.partner.description))])]),t._v(" "),e("li",[e("a",{attrs:{href:"#"}},[t._v("Địa chỉ: "+t._s(t.partner.address))])]),t._v(" "),e("li",[e("a",{staticClass:"text-warning",attrs:{href:"#"}},[t._v(t._s(t._f("myRating")(t.partner.avg_partner_scores))),e("i",{staticClass:"fas fa-star ml-2"})])])])])])]),t._v(" "),e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"card-deck row"},t._l(t.tours.data,function(a,s){return e("div",{key:s,staticClass:"col-md-6 p-0 mb-4"},[e("div",{staticClass:"card rounded-lg shadow border-0 mx-3"},[e("router-link",{attrs:{to:{name:"Tour Detail",params:{tourId:a.id}}}},[e("img",{staticClass:"card-img-top",attrs:{src:t.getUrlImageTour(a.image_cover),height:"245px"}})]),t._v(" "),e("div",{staticClass:"card-body m-0"},[e("h5",{staticClass:"card-title"},[e("router-link",{staticClass:"text-dark",attrs:{to:{name:"Tour Detail",params:{tourId:a.id}}}},[t._v("\n                    "+t._s(a.tour_name)+"\n                  ")])],1),t._v(" "),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"mr-auto"},[e("p",{staticClass:"card-text"},[t._v(t._s(a.from_place)+" - "+t._s(a.to_place))])]),t._v(" "),e("div",{staticClass:"ml-auto"},[e("h5",{staticClass:"card-text text-primary"},[t._v("Giá "+t._s(t._f("myCurrency")(a.tour_price))+" đ / ngày")])])])])],1)])}),0),t._v(" "),0!==t.tours.total?e("div",{staticClass:"py-3"},[e("paginate",{attrs:{"page-count":t.tours.last_page,"click-handler":t.clickPaginate,"prev-text":"Prev","next-text":"Next","container-class":"pagination justify-content-center","page-class":"page-item","page-link-class":"page-link","prev-class":"page-item","prev-link-class":"page-link","next-class":"page-item","next-link-class":"page-link"}})],1):e("div",{staticClass:"py-3 text-center"},[e("span",{staticClass:"font-weight-bold"},[t._v("Không có tour nào")])])]),t._v(" "),e("div",{staticClass:"col-md-4"},[e("div",{staticClass:"card shadow rounded-lg border-0"},[e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title text-center text-uppercase"},[t._v("Đánh giá")]),t._v(" "),t._l(t.ratings,function(a,s){return e("div",{key:s,staticClass:"d-flex flex-row justify-content-between mb-3"},[e("div",[e("div",{staticClass:"font-weight-bold"},[t._v(t._s(a.user.name))]),t._v(" "),e("div",{staticClass:"text-truncate"},[t._v(t._s(a.rating_content))])]),t._v(" "),e("div",{staticClass:"font-weight-bold text-warning my-auto"},[t._v(t._s(t._f("myRating")(a.rating_scores)))])])}),t._v(" "),t.isAuthenticated?e("div",{staticClass:"mt-2 text-center"},[t.checkRating()?e("a",{staticClass:"card-link",attrs:{href:"#"},on:{click:function(a){return t.editRating()}}},[t._v("Sửa đánh giá")]):e("a",{staticClass:"card-link",attrs:{href:"#"},on:{click:function(a){t.ratingMode=!0}}},[t._v("Viết đánh giá")])]):t._e()],2)]),t._v(" "),t.ratingMode?e("div",{staticClass:"card shadow rounded-lg border-0"},[e("div",{staticClass:"card-body"},[t.editMode?e("h5",{staticClass:"card-title text-center text-uppercase"},[t._v("Sửa đánh giá")]):e("h5",{staticClass:"card-title text-center text-uppercase"},[t._v("Viết đánh giá")]),t._v(" "),e("div",{staticClass:"d-flex flex-column"},[e("div",{staticClass:"mb-3"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.rating.content,expression:"rating.content"}],staticClass:"form-control",attrs:{rows:"3",placeholder:"Nhập nội dung đánh giá"},domProps:{value:t.rating.content},on:{input:function(a){a.target.composing||t.$set(t.rating,"content",a.target.value)}}})]),t._v(" "),e("div",{staticClass:"d-flex flex-grow justify-content-between"},[e("star-rating",{attrs:{"star-size":20,"show-rating":!1},model:{value:t.rating.scores,callback:function(a){t.$set(t.rating,"scores",a)},expression:"rating.scores"}}),t._v(" "),e("div",[e("button",{staticClass:"btn btn-secondary",on:{click:function(a){t.ratingMode=!1}}},[t._v("Đóng")]),t._v(" "),t.editMode?e("button",{staticClass:"btn btn-info",on:{click:function(a){return t.submitUpdateRating()}}},[t._v("Sửa")]):e("button",{staticClass:"btn btn-success",on:{click:function(a){return t.submitRating()}}},[t._v("Đánh giá")])])],1)])])]):t._e(),t._v(" "),e("div",{staticClass:"card shadow rounded-lg border-0 sticky-top"},[e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title text-center text-uppercase"},[t._v("Công ty nổi bật")]),t._v(" "),t._l(t.topPartners,function(a,s){return e("a",{key:s,staticClass:"card-link text-dark",staticStyle:{cursor:"pointer"},attrs:{title:a.name},on:{click:function(e){return t.onClickCompany(a.id)}}},[a.id!=t.currentPartnerId?e("div",{staticClass:"d-flex flex-row justify-content-between"},[e("p",{staticClass:"text-truncate my-1 mr-3"},[t._v(t._s(a.name))]),t._v(" "),e("span",{staticClass:"font-weight-bold text-warning my-1"},[t._v("\n              "+t._s(t._f("myRating")(a.avg_partner_scores))+"\n              ")])]):t._e()])})],2)])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"spinner-border",attrs:{role:"status"}},[a("span",{staticClass:"sr-only"},[this._v("Loading...")])])}]};var g=e("VU/8")(u,v,!1,function(t){e("VcKU")},null,null);a.default=g.exports}});
//# sourceMappingURL=15.288d872177a9c3876c3e.js.map