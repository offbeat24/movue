<template>
  <div class="favorites">
    <a-row gutter="16">
      <a-col v-for="movie in favorites" :key="movie.id" :span="6">
        <MovieCard :movie="movie" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import MovieCard from '@/components/MovieCard.vue';

const store = useMovieStore();
const favorites = computed(() => store.getFavorites);
</script>
