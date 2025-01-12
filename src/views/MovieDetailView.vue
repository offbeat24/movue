<template>
  <a-card :title="movie.movieNm" bordered>
    <a-descriptions bordered column="1">
      <a-descriptions-item label="감독">{{
        movie.directors[0]?.peopleNm
      }}</a-descriptions-item>
      <a-descriptions-item label="출연 배우">
        <span v-for="actor in movie.actors" :key="actor.peopleNm">
          {{ actor.peopleNm }}<span v-if="!isLastActor(actor)">, </span>
        </span>
      </a-descriptions-item>
      <a-descriptions-item label="개봉일">{{
        movie.openDt
      }}</a-descriptions-item>
      <a-descriptions-item label="장르">
        <span v-for="genre in movie.genres" :key="genre.genreNm">
          {{ genre.genreNm }}<span v-if="!isLastGenre(genre)">, </span>
        </span>
      </a-descriptions-item>
    </a-descriptions>
    <a-button type="primary" @click="addToFavorites" style="margin-top: 20px">
      Add to Favorites
    </a-button>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFavoriteStore } from "@/stores/favorites";
import { fetchMovieDetails } from "@/axios/api";

const route = useRoute();
const movie = ref({
  movieNm: "",
  directors: [],
  actors: [],
  openDt: "",
  genres: [],
});
const favoriteStore = useFavoriteStore();

const addToFavorites = () => {
  favoriteStore.addFavorite({
    id: route.params.id as string,
    title: movie.value.movieNm,
    memo: "",
  });
};

const isLastActor = (actor: never) =>
  movie.value.actors.indexOf(actor) === movie.value.actors.length - 1;
const isLastGenre = (genre: never) =>
  movie.value.genres.indexOf(genre) === movie.value.genres.length - 1;

onMounted(async () => {
  const movieCd = route.params.id as string;
  movie.value = await fetchMovieDetails(movieCd);
});
</script>
