import Vue from "vue";
import VueRouter from "vue-router";

import view from "./modules/view";
import mgmt from "./modules/mgmt";

import LayoutView from "../views/view/Layout/index.vue";
import LayoutMgmt from "../views/mgmt/Layout/index.vue";

Vue.use(VueRouter);

let baseRoutes = [
  {
    path: "/",
    redirect: { name: "ViewHomeindex" }
  },
  {
    path: "/view",
    name: "ViewHome",
    component: LayoutView,
    children: [...view]
  },
  {
    path: "/mgmt",
    name: "MgmtHome",
    component: LayoutMgmt,
    children: [...mgmt]
  },

  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: baseRoutes
});
console.log(router);

export default router;
