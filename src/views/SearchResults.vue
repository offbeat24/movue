<template>
  <LoadingOverlay :isLoading="isLoading" />
  <CustomModal
    :isVisible="showError"
    :message="errorMessage"
    @close="showError = false"
  />
  <div class="search">
    <div class="search-container">
      <a-input-search
        placeholder="검색어를 입력해주세요."
        size="large"
        style="max-width: 600px"
        v-model:value="query"
        @search="validateAndSearch"
      />
    </div>

    <div v-if="!isLoading && movies.length === 0" class="no-results">
      "{{ query }}"와 일치하는 결과가 없습니다.
    </div>

    <a-row gutter="16" v-else>
      <a-col v-for="movie in movies" :key="movie.id" :span="6">
        <MovieCard :movie="movie" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import CustomModal from '@/components/ValidateModal.vue';
import MovieCard from '@/components/MovieCard.vue';

const store = useMovieStore();
const query = ref('');
const isLoading = ref(false);
const showError = ref(false);
const errorMessage = ref('');

const movies = computed(() => store.getMovies);

const validateAndSearch = async () => {
  if (!query.value.trim()) {
    errorMessage.value = '한글자 이상 검색어를 입력해주세요!';
    showError.value = true;
    return;
  }

  isLoading.value = true;
  await store.searchForMovies(query.value);
  isLoading.value = false;
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #888;
  height: 300px;
  text-align: center;
}
</style>
