import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import MovieDetailView from "@/views/MovieDetailView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/movie/:id", component: MovieDetailView },
  { path: "/favorites", component: FavoritesView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
