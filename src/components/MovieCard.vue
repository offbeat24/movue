<template>
  <a-card :hoverable="true" class="movie-card">
    <template #cover>
      <div class="poster-container" @click="showModal">
        <img :src="posterUrl" alt="Movie Poster" />
      </div>
    </template>
    <div class="card-footer">
      <span class="movie-title">{{ movie.title }}</span>
      <a-button type="link" @click="toggleFavorite" class="favorite-btn">
        {{ isFavorite ? '★' : '☆' }}
      </a-button>
    </div>
    <a-modal
      v-model:visible="isModalVisible"
      title="상세 보기"
      @cancel="isModalVisible = false"
    >
      <p><strong>제목:</strong> {{ props.movie.title }}</p>
      <p><strong>시놉시스:</strong> {{ props.movie.overview }}</p>
      <p><strong>개봉일:</strong> {{ props.movie.release_date }}</p>
      <template #footer>
        <div class="modal-footer">
          <a-button type="link" @click="toggleFavorite" class="favorite-btn">
            {{ isFavorite ? '★' : '☆' }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { Movie } from '@/types/movie';

const props = defineProps({
  movie: {
    type: Object as () => Movie,
    required: true,
  },
});

const store = useMovieStore();
const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
};

const isFavorite = computed(() =>
  store.getFavorites.some((fav) => fav.id === props.movie.id)
);

const posterUrl = computed(() =>
  props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`
    : 'placeholder.jpg'
);

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.removeFavorite(props.movie.id);
  } else {
    store.addFavorite(props.movie);
  }
};
</script>

<style scoped>
.movie-card {
  width: 100%;
  max-width: 240px;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: space-between;
}

.poster-container {
  width: 100%;
  height: 360px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.movie-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 30px); /* 버튼과 간격 확보 */
}

.favorite-btn {
  font-size: 1.2rem;
  color: #ffb400;
  padding: 0;
}
</style>
