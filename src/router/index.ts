import { createRouter, createWebHistory } from "vue-router";

// 라우트에 대응하는 페이지 컴포넌트
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
