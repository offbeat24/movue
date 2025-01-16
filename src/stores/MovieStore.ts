// src/stores/MovieStore.ts
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchPopularMovies, searchMovies } from '@/axios/MovieApi';
import { Movie } from '@/types/movie';

export const useMovieStore = defineStore(
  'movie',
  () => {
    const state = reactive({
      movies: [] as Movie[],
      favorites: [] as Movie[],
    });

    const getMovies = computed(() => state.movies);
    const getFavorites = computed(() => state.favorites);
    const isFavorite = (id: number) =>
      state.favorites.some((movie) => movie.id === id);

    async function loadPopularMovies() {
      try {
        const movies = await fetchPopularMovies();
        state.movies = movies;
      } catch (error) {
        console.error('Failed to fetch popular movies:', error);
      }
    }

    async function searchForMovies(query: string) {
      try {
        const movies = await searchMovies(query);
        state.movies = movies;
      } catch (error) {
        console.error('Failed to search movies:', error);
      }
    }

    function addFavorite(movie: Movie) {
      if (!isFavorite(movie.id)) {
        state.favorites.push(movie);
      }
    }

    function removeFavorite(movieId: number) {
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId);
    }

    return {
      state,

      getMovies,
      getFavorites,
      isFavorite,

      loadPopularMovies,
      searchForMovies,
      addFavorite,
      removeFavorite,
    };
  },
  {
    persist: true,
  }
);
