import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",

  linkActiveClass: "active",

  routes: [
    {
      path: "/admin/",
      component: () => import("@/components/admin/MainLayout"),
      beforeEnter: checkAdmin,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/views/admin/Dashboard")
        },
        {
          path: "role",
          name: "Role",
          component: () => import("@/views/admin/role/Role")
        },
        {
          path: "decentralization",
          name: "Decentralization",
          component: () => import("@/views/admin/user/Decentralization")
        },
        {
          path: "user",
          name: "User",
          component: () => import("@/views/admin/user/User")
        },
        {
          path: "partner",
          name: "Partner",
          component: () => import("@/views/admin/user/Partner")
        },
        {
          path: "location",
          name: "Location",
          component: () => import("@/views/admin/location/Location")
        },
        {
          path: "post",
          name: "Post",
          component: () => import("@/views/admin/post/Post")
        },
        {
          path: "rating",
          name: "Rating",
          component: () => import("@/views/admin/rating/Rating")
        },
        {
          path: "comment",
          name: "Comment",
          component: () => import("@/views/admin/comment/Comment")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/components/ui/UserLayout"),
      beforeEnter: checkBlock,
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/views/user/HomeView"),
          beforeEnter: checkInfo
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("@/views/user/Profile"),
          beforeEnter: checkAuth
        },
        {
          path: "tour-management",
          name: "Tour Management",
          component: () => import("@/views/partner/TourManagement"),
          beforeEnter: checkPartner
        },
        {
          path: "tour-management/create",
          name: "Create Tour",
          component: () => import("@/views/partner/CreateTour"),
          beforeEnter: checkPartner
        },
        {
          path: "tour-management/edit/:tourId",
          name: "Edit Tour",
          component: () => import("@/views/partner/EditTour"),
          beforeEnter: checkPartner
        },
        {
          path: "tour-order",
          name: "Tour Order",
          component: () => import("@/views/partner/TourOrder"),
          beforeEnter: checkPartner
        },
        {
          path: "tour-detail/:tourId",
          name: "Tour Detail",
          component: () => import("@/views/user/TourDetail"),
          beforeEnter: checkInfo
        },
        {
          path: "search",
          name: "Search Page",
          component: () => import("@/views/user/SearchView"),
          beforeEnter: checkInfo
        },
        {
          path: "location-detail/:locationId",
          name: "Location Detail",
          component: () => import("@/views/user/LocationDetail"),
          beforeEnter: checkInfo
        },
        {
          path: "company-detail/:companyId",
          name: "Company Detail",
          component: () => import("@/views/user/CompanyDetail"),
          beforeEnter: checkInfo
        },
        {
          path: "all-tour",
          name: "All Tour",
          component: () => import("@/views/user/AllTourView"),
          beforeEnter: checkInfo
        },
        {
          path: "all-company",
          name: "All Company",
          component: () => import("@/views/user/AllCompanyView"),
          beforeEnter: checkInfo
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "block",
      name: "Block Page",
      component: () => import("@/components/BlockPage")
    }
  ]
});

async function checkInfo(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");
  next();
}

async function checkBlock(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");

  if (store.getters["authentication/isAuthenticated"]) {
    if (store.getters["authentication/currentUser"].is_active === 0) {
      next({
        name: "Block Page"
      });
    }
  }
  next();
}

async function checkAuth(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");

  if (store.getters["authentication/isAuthenticated"]) {
    next();
  } else {
    next({
      name: "Home"
    });
  }
}

async function checkPartner(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");

  if (store.getters["authentication/isAuthenticated"]) {
    if (store.getters["authentication/currentUser"].role_id === 2) {
      next();
    } else {
      next({
        name: "Home"
      });
    }
  } else {
    next({
      name: "Home"
    });
  }
}

async function checkAdmin(to, from, next) {
  await store.dispatch("authentication/CHECK_AUTH");

  if (store.getters["authentication/isAuthenticated"]) {
    if (store.getters["authentication/currentUser"].role_id === 1) {
      next();
    } else {
      next({
        name: "Home"
      });
    }
  } else {
    next({
      name: "Home"
    });
  }
}
