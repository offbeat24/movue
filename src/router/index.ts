import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/views/HomeView.vue") },
  {
    path: "/movie/:id",
    component: () => import("@/views/MovieDetailView.vue"),
  },
  { path: "/favorites", component: () => import("@/views/FavoritesView.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
