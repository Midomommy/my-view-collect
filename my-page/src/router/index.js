import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleView from "/src/components/SingleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/view-list",
      name: "viewlist",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("/src/components/ViewList.vue"),
      children: [
        {
          path: ":id",
          name: "single-view",
          // component: () => import("/src/components/SingleView.vue"),
          component: SingleView,
        },
      ],
    },
  ],
});

export default router;
