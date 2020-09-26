import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";
import Bugs from "../Pages/BugsPage.vue"
import Bug from "../Pages/ActiveBug.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/bugs",
    name: "Bugs",
    component: Bugs,
  },
  {
    path: "/bugs/:id",
    name: "Bug",
    component: Bug,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
