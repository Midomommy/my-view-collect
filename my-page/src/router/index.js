import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/src/views/HomeView.vue";
import SingleView from "/src/components/SingleView.vue";
import SignUp from "/src/components/SignUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/my-collect-list",
      name: "collectlist",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("/src/components/CollectViewList.vue"),
    },
    {
      path: "/view-list",
      name: "viewlist",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("/src/components/ViewList.vue"),
    },
    {
      path: "/view-list/:id",
      name: "single-view",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SingleView,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SignUp,
    },
  ],
});

export default router;
