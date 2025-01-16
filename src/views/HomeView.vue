<template>
  <LoadingOverlay :isLoading="isLoading" />
  <div class="home">
    <a-row gutter="[16, 16]">
      <a-col v-for="movie in movies" :key="movie.id" :span="6">
        <MovieCard :movie="movie" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import MovieCard from '@/components/MovieCard.vue';

const store = useMovieStore();
const isLoading = ref(true);

const loadMovies = async () => {
  await store.loadPopularMovies();
  isLoading.value = false;
};

onMounted(loadMovies);

const movies = computed(() => store.getMovies);
</script>
