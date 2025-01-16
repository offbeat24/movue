import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Search from '@/views/SearchResults.vue';
import Favorites from '@/views/FavoriteMovies.vue';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/search', component: Search, name: 'search' },
  { path: '/favorites', component: Favorites, name: 'favorites' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
