webpackJsonp([7],{"XQ+y":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("aHZm"),n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"d-flex flex-row justify-content-between mb-2"},[t._m(0),t._v(" "),s("div",{staticClass:"d-flex flex-row"},[s("div",{staticClass:"py-1 mr-2"},[s("button",{staticClass:"btn btn-success",on:{click:t.newModal}},[s("i",{staticClass:"fas fa-plus"}),t._v("\n              Thêm\n            ")])]),t._v(" "),s("div",[s("form",{staticClass:"input-group",on:{submit:function(e){return e.preventDefault(),t.searchUp()}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"form-control form-control-sm",attrs:{type:"text",placeholder:"Tìm kiếm..."},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),t._v(" "),t._m(1)])])])]),t._v(" "),s("table",{staticClass:"table table-hover"},[s("caption",[t._v("\n          List of user\n        ")]),t._v(" "),t._m(2),t._v(" "),s("tbody",[t.isLoading?s("tr",{staticClass:"text-center"},[t._m(3)]):t._l(t.users.data,function(e,a){return s("tr",{key:a},[s("th",{attrs:{scope:"row"}},[t._v(t._s(++a))]),t._v(" "),s("td",[t._v(t._s(e.name))]),t._v(" "),s("td",{staticClass:"text-info font-weight-bold"},[t._v(t._s(e.email))]),t._v(" "),s("td",{staticClass:"text-center"},[s("img",{staticClass:"rounded-circle img-fulid",attrs:{src:t.getUrlImage(e.avatar),width:"30"}})]),t._v(" "),s("td",[t._v(t._s(e.phone_number))]),t._v(" "),s("td",[t._v(t._s(e.address))]),t._v(" "),s("td",[s("span",{staticClass:"badge badge-info"},[t._v("\n                "+t._s(e.role.role_name)+"\n              ")])]),t._v(" "),s("td",[1===e.is_active?s("span",{staticClass:"badge badge-success"},[t._v("\n                Active\n              ")]):s("span",{staticClass:"badge badge-danger"},[t._v("\n                Block\n              ")])]),t._v(" "),s("td",{staticClass:"text-center"},[s("div",{staticClass:"custom-control custom-checkbox"},[s("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",value:"0",id:t.fetchNameCheck(e)},domProps:{checked:1===e.is_active},on:{change:function(s){return t.onChangeStatus(s,e)}}}),t._v(" "),s("label",{staticClass:"custom-control-label",attrs:{for:t.fetchNameCheck(e)}})])]),t._v(" "),s("td",{staticClass:"text-center"},[s("a",{staticClass:"mr-2",attrs:{href:"#"},on:{click:function(s){return t.updateModal(e)}}},[s("i",{staticClass:"menu-icon icon-pencil text-info"})]),t._v(" "),s("a",{staticClass:"ml-2",attrs:{href:"#"},on:{click:function(s){return t.deleteModal(e)}}},[s("i",{staticClass:"menu-icon icon-bin2 text-danger"})])])])})],2)]),t._v(" "),s("paginate",{attrs:{"page-count":null==t.users.last_page?1:t.users.last_page,"click-handler":t.clickPaginate,"prev-text":"Prev","next-text":"Next","container-class":"pagination justify-content-end","page-class":"page-item","page-link-class":"page-link","prev-class":"page-item","prev-link-class":"page-link","next-class":"page-item","next-link-class":"page-link"}})],1)]),t._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"modalUser",tabindex:"-1",role:"dialog","aria-labelledby":"modalTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{directives:[{name:"show",rawName:"v-show",value:!t.editMode,expression:"!editMode"}],staticClass:"modal-title",attrs:{id:"modalTitle"}},[t._v("\n            Thêm thành viên\n          ")]),t._v(" "),s("h5",{directives:[{name:"show",rawName:"v-show",value:t.editMode,expression:"editMode"}],staticClass:"modal-title",attrs:{id:"modalTitle"}},[t._v("\n            Cập nhật thành viên\n          ")]),t._v(" "),s("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.closeModal()}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),s("form",{on:{submit:function(e){e.preventDefault(),t.editMode?t.updateUser():t.createUser()}}},[s("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.valid;return[s("div",{staticClass:"modal-body"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Tên")]),t._v(" "),s("ValidationProvider",{attrs:{name:"name",rules:"required|max:255"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",class:{"is-invalid":a[0]},attrs:{type:"text",placeholder:"Nhập tên"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),s("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1),t._v(" "),s("div",{staticClass:"form-group"},[s("label",[t._v("Email")]),t._v(" "),s("ValidationProvider",{attrs:{name:"email",rules:"required|email|max:255"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",class:{"is-invalid":a[0]},attrs:{type:"email",disabled:t.editMode,placeholder:"Nhập email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),s("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1),t._v(" "),s("div",{staticClass:"form-group"},[s("label",[t._v("Số điện thoại")]),t._v(" "),s("ValidationProvider",{attrs:{name:"phone number",rules:"required|min:3|max:12"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNumber,expression:"phoneNumber"}],staticClass:"form-control",class:{"is-invalid":a[0]},attrs:{type:"text",placeholder:"Nhập số điện thoại"},domProps:{value:t.phoneNumber},on:{input:function(e){e.target.composing||(t.phoneNumber=e.target.value)}}}),t._v(" "),s("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1),t._v(" "),s("div",{staticClass:"form-group"},[s("label",[t._v("Địa chỉ")]),t._v(" "),s("ValidationProvider",{attrs:{name:"address",rules:"required|max:255"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"form-control",class:{"is-invalid":a[0]},attrs:{type:"text",placeholder:"Nhập địa chỉ"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}}),t._v(" "),s("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1),t._v(" "),s("div",{staticClass:"form-group"},[s("label",[t._v("Mô tả")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nhập mô tả"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function(e){return t.closeModal()}}},[t._v("\n                Huỷ\n              ")]),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:!t.editMode,expression:"!editMode"}],staticClass:"btn btn-primary",attrs:{type:"submit",disabled:!a}},[t.loadingButton?s("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):t._e(),t._v("\n                Thêm\n              ")]),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:t.editMode,expression:"editMode"}],staticClass:"btn btn-primary",attrs:{type:"submit",disabled:!a}},[t.loadingButton?s("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):t._e(),t._v("\n                Cập nhật\n              ")])])]}}])})],1)])])]),t._v(" "),s("submit-delete-modal",[s("div",{staticClass:"modal-footer",attrs:{slot:"modal-footer"},slot:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n        Huỷ\n      ")]),t._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.submitDelete}},[t.loadingButton?s("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):t._e(),t._v("\n        Có\n      ")])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h5",{staticClass:"card-title"},[this._v("Danh sách thành viên")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-light",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-search"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("STT")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Tên")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Email")]),t._v(" "),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Ảnh đại diện")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Số diện thoại")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Địa chỉ")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Quyền")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Status")]),t._v(" "),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Active")]),t._v(" "),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Tuỳ chọn")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",{attrs:{colspan:"10"}},[e("div",{staticClass:"spinner-border",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[this._v("Loading...")])])])}]};var i=function(t){s("v/dr")},r=s("VU/8")(a.a,n,!1,i,null,null);e.default=r.exports},aHZm:function(t,e,s){"use strict";(function(t){var a=s("Xxa5"),n=s.n(a),i=s("exGp"),r=s.n(i),o=s("Dd8w"),l=s.n(o),c=s("NYxO"),d=s("IcnI");e.a={data:function(){return{editMode:!1,loadingButton:!1,searchText:"",name:"",email:"",phoneNumber:"",address:"",description:""}},created:function(){d.a.dispatch("user/USERS_FETCH")},computed:l()({},Object(c.c)("user",["users","errors","isLoading"])),methods:l()({},Object(c.b)("user",["USER_CREATE","USER_UPDATE","USER_DELETE","USERS_PAGINATE","USERS_SEARCH","USER_CHANGE_STATUS"]),{getUrlImage:function(t){return"https://storage.googleapis.com/cdio-cots.appspot.com/uploads/users/"+t},fetchNameCheck:function(t){return"checkbox_"+t.id},onChangeStatus:function(t,e){var s=0;!0===t.target.checked&&(s=1);var a={id:e.id,is_active:s};this.USER_CHANGE_STATUS(a)},clickPaginate:function(t){this.USERS_PAGINATE(t)},searchUp:function(){this.USERS_SEARCH(this.searchText)},newModal:function(){this.editMode=!1,this.name="",this.email="",this.phoneNumber="",this.address="",this.description="",t("#modalUser").modal("show")},closeModal:function(){this.editMode=!1,this.name="",this.email="",this.phoneNumber="",this.address="",this.description="",t("#modalUser").modal("hide")},updateModal:function(e){this.editMode=!0,this.name=e.name,this.email=e.email,this.phoneNumber=e.phone_number,this.address=e.address,this.description=e.description,this.id=e.id,t("#modalUser").modal("show")},deleteModal:function(e){this.id=e.id,t(".submit__delete__modal").modal("show")},createUser:function(){var e=this;return r()(n.a.mark(function s(){var a;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return e.loadingButton=!0,a={name:e.name,email:e.email,phone_number:e.phoneNumber,address:e.address,description:e.description},s.prev=2,s.next=5,e.USER_CREATE(a);case 5:t("#modalUser").modal("hide"),e.loadingButton=!1,e.$toast.success({color:"#51A351",title:"Success!",message:"Thêm thành viên thành công"}),s.next=15;break;case 10:s.prev=10,s.t0=s.catch(2),t("#modalUser").modal("hide"),e.loadingButton=!1,e.$toast.error({color:"#BD362F",title:"Error!",message:e.errors.email[0]});case 15:case"end":return s.stop()}},s,e,[[2,10]])}))()},updateUser:function(){var e=this;return r()(n.a.mark(function s(){var a;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return e.loadingButton=!0,a={id:e.id,updatedFields:{name:e.name,phone_number:e.phoneNumber,address:e.address,description:e.description}},s.prev=2,s.next=5,e.USER_UPDATE(a);case 5:t("#modalUser").modal("hide"),e.loadingButton=!1,e.$toast.success({color:"#51A351",title:"Success!",message:"Cập nhật thành viên thành công"}),s.next=15;break;case 10:s.prev=10,s.t0=s.catch(2),t("#modalUser").modal("hide"),e.loadingButton=!1,e.$toast.error({color:"#BD362F",title:"Error!",message:"Cập nhật thành viên thất bại"});case 15:case"end":return s.stop()}},s,e,[[2,10]])}))()},submitDelete:function(){var e=this;return r()(n.a.mark(function s(){return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return e.loadingButton=!0,s.prev=1,s.next=4,e.USER_DELETE(e.id);case 4:t(".submit__delete__modal").modal("hide"),e.loadingButton=!1,e.$toast.success({color:"#51A351",title:"Success!",message:"Xoá thành viên thành công"}),s.next=14;break;case 9:s.prev=9,s.t0=s.catch(1),t(".submit__delete__modal").modal("hide"),e.loadingButton=!1,e.$toast.error({color:"#BD362F",title:"Error!",message:"Xoá thành viên thất bại"});case 14:case"end":return s.stop()}},s,e,[[1,9]])}))()}})}}).call(e,s("7t+N"))},"v/dr":function(t,e){}});
//# sourceMappingURL=7.dbc7918360650c7e9f49.js.map