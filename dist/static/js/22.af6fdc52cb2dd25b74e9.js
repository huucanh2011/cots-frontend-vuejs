webpackJsonp([22],{B4Oo:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("Dd8w"),a=r.n(o),s=r("Xxa5"),i=r.n(s),n=r("exGp"),c=r.n(n),u=r("NYxO"),l=r("IcnI"),m={data:function(){return{tour:{tourName:"",description:"",fromPlace:"",toPlace:"",numberDays:"",numberPersons:"",tourPrice:"",note:"",tourCateId:"",isActive:!0,imageCover:[]},loadingButton:!1,isLoading:!1}},created:function(){var t=this;return c()(i.a.mark(function e(){var r,o,a,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.isLoading=!0,r=t.$route.params.tourId,(o=t.tour).id=r,e.next=6,t.TOUR_FETCH_ONE(r);case 6:a=e.sent,s=a.data,o.tourName=s.tour_name,o.fromPlace=s.from_place,o.toPlace=s.to_place,o.numberDays=s.number_days,o.numberPersons=s.number_persons,o.description=s.description,o.note=s.note,o.tourPrice=s.tour_price,o.tourCateId=s.tourcate_id,o.isActive=s.is_active,t.isLoading=!1,l.a.dispatch("tourcategory/TOURCATES_FETCH");case 20:case"end":return e.stop()}},e,t)}))()},computed:a()({},Object(u.c)("tourcategory",["tourcates"])),methods:a()({},Object(u.b)("tour",["TOUR_UPDATE","TOUR_FETCH_ONE"]),{onClickListTour:function(){this.$router.push({name:"Tour Management"})},onChangeImageCover:function(){this.tour.imageCover.push(this.$refs.imageCover.files[0])},updateTour:function(){var t=this;return c()(i.a.mark(function e(){var r,o,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loadingButton=!0,r=t.tour,o=1,!1===r.isActive&&(o=0),new FormData,a={id:r.id,updatedFields:{tour_name:r.tourName,description:r.description,from_place:r.fromPlace,to_place:r.toPlace,number_days:r.numberDays,number_persons:r.numberPersons,tour_price:r.tourPrice,note:r.note,tourcate_id:r.tourCateId,is_active:o}},e.next=8,t.TOUR_UPDATE(a);case 8:t.loadingButton=!1,t.$router.push({name:"Tour Management"}),t.$toast.success({color:"#67C23A",title:"Success!",message:"Cập nhật thành công!"});case 11:case"end":return e.stop()}},e,t)}))()}})},v={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("nav",{attrs:{"aria-label":"breadcrumb"}},[r("ol",{staticClass:"breadcrumb"},[r("li",{staticClass:"breadcrumb-item"},[r("router-link",{staticClass:"text-secondary",attrs:{to:{name:"Home"}}},[t._v("Home")])],1),t._v(" "),r("li",{staticClass:"breadcrumb-item"},[r("router-link",{staticClass:"text-secondary",attrs:{to:{name:"Tour Management"}}},[t._v("Quản lý tour")])],1),t._v(" "),r("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v("Cập nhật tour")]),t._v(" "),r("li",{staticClass:"ml-auto"},[r("router-link",{staticClass:"text-info",attrs:{to:{name:"Tour Management"}}},[t._v("Back")])],1)])]),t._v(" "),r("div",{staticClass:"card"},[t.isLoading?r("div",{staticClass:"text-center py-5"},[t._m(0)]):r("div",{staticClass:"card-body"},[r("h5",{staticClass:"card-title"},[t._v("Cập nhật tour")]),t._v(" "),r("form",{on:{submit:function(e){return e.preventDefault(),t.updateTour()}}},[r("div",{staticClass:"form-row"},[r("div",{staticClass:"form-group col-md-6"},[r("label",[t._v("Tên tour")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.tourName,expression:"tour.tourName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nhập tên tour"},domProps:{value:t.tour.tourName},on:{input:function(e){e.target.composing||t.$set(t.tour,"tourName",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-row"},[r("div",{staticClass:"form-group col-md-4"},[r("label",[t._v("Nơi đi")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.fromPlace,expression:"tour.fromPlace"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nhập nơi đi"},domProps:{value:t.tour.fromPlace},on:{input:function(e){e.target.composing||t.$set(t.tour,"fromPlace",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group col-md-4"},[r("label",[t._v("Nơi đến")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.toPlace,expression:"tour.toPlace"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nhập nơi đến"},domProps:{value:t.tour.toPlace},on:{input:function(e){e.target.composing||t.$set(t.tour,"toPlace",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group col-md-4"},[r("label",[t._v("Loại tour")]),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.tour.tourCateId,expression:"tour.tourCateId"}],staticClass:"form-control custom-select",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.tour,"tourCateId",e.target.multiple?r:r[0])}}},[r("option",{attrs:{selected:"",disabled:""}},[t._v("Chọn")]),t._v(" "),t._l(t.tourcates,function(e,o){return r("option",{key:o,domProps:{value:e.id}},[t._v(t._s(e.cate_name))])})],2)])])])]),t._v(" "),r("div",{staticClass:"form-row"},[r("div",{staticClass:"form-group col-md-6"},[r("label",[t._v("Mô tả")]),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tour.description,expression:"tour.description"}],staticClass:"form-control",attrs:{type:"text",rows:"7",placeholder:"Nhập mô tả"},domProps:{value:t.tour.description},on:{input:function(e){e.target.composing||t.$set(t.tour,"description",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group col-md-6"},[r("label",[t._v("Ghi chú")]),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tour.note,expression:"tour.note"}],staticClass:"form-control",attrs:{type:"text",rows:"7",placeholder:"Nhập ghi chú"},domProps:{value:t.tour.note},on:{input:function(e){e.target.composing||t.$set(t.tour,"note",e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"form-row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-row"},[r("div",{staticClass:"form-group col-md-4"},[r("label",[t._v("Số ngày đi")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.numberDays,expression:"tour.numberDays"}],staticClass:"form-control",attrs:{type:"number",min:"1",max:"10",placeholder:"Nhập số ngày"},domProps:{value:t.tour.numberDays},on:{input:function(e){e.target.composing||t.$set(t.tour,"numberDays",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group col-md-4"},[r("label",[t._v("Số người")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.numberPersons,expression:"tour.numberPersons"}],staticClass:"form-control",attrs:{type:"number",min:"1",max:"20",placeholder:"Nhập số người"},domProps:{value:t.tour.numberPersons},on:{input:function(e){e.target.composing||t.$set(t.tour,"numberPersons",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group col-md-4"},[r("label",[t._v("Giá tiền")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.tourPrice,expression:"tour.tourPrice"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nhập giá tiền"},domProps:{value:t.tour.tourPrice},on:{input:function(e){e.target.composing||t.$set(t.tour,"tourPrice",e.target.value)}}})])])]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-row"},[r("div",{staticClass:"form-group col-md-6"},[r("label",[t._v("Ảnh cover")]),t._v(" "),r("div",{staticClass:"form-control border-0 px-0"},[r("input",{ref:"imageCover",staticClass:"form-control-file",attrs:{type:"file",accept:"image/*"},on:{change:function(e){return t.onChangeImageCover()}}})])]),t._v(" "),r("div",{staticClass:"form-group col-md-6 text-right"},[r("label",[t._v("Active")]),t._v(" "),r("div",{staticClass:"form-control border-0 px-0"},[r("div",{staticClass:"custom-control custom-checkbox"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.tour.isActive,expression:"tour.isActive"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"activeTour",checked:""},domProps:{checked:Array.isArray(t.tour.isActive)?t._i(t.tour.isActive,null)>-1:t.tour.isActive},on:{change:function(e){var r=t.tour.isActive,o=e.target,a=!!o.checked;if(Array.isArray(r)){var s=t._i(r,null);o.checked?s<0&&t.$set(t.tour,"isActive",r.concat([null])):s>-1&&t.$set(t.tour,"isActive",r.slice(0,s).concat(r.slice(s+1)))}else t.$set(t.tour,"isActive",a)}}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"activeTour"}},[t._v("active")])])])])])])]),t._v(" "),r("div",{staticClass:"divider mt-0 mb-3"}),t._v(" "),r("div",{staticClass:"d-flex justify-content-between"},[r("div",[t._m(1),t._v(" "),r("button",{staticClass:"btn btn-outline-info ml-1",attrs:{type:"button"},on:{click:function(e){return t.onClickListTour()}}},[r("i",{staticClass:"fas fa-list-ul"}),t._v(" Danh sách")])]),t._v(" "),r("button",{staticClass:"btn btn-info",attrs:{type:"submit"}},[t.loadingButton?r("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):r("i",{staticClass:"far fa-save"}),t._v(" Cập nhật")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spinner-border",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[this._v("Loading...")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-outline-secondary mr-1",attrs:{type:"reset"}},[e("i",{staticClass:"fas fa-redo-alt"}),this._v(" Làm mới")])}]};var d=r("VU/8")(m,v,!1,function(t){r("Dzv1")},null,null);e.default=d.exports},Dzv1:function(t,e){}});
//# sourceMappingURL=22.af6fdc52cb2dd25b74e9.js.map