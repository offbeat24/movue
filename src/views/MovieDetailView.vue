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
  </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchMovieDetails } from "@/axios/api";

const route = useRoute();
const movie = ref({
  movieNm: "",
  directors: [],
  actors: [],
  openDt: "",
  genres: [],
});

// 마지막 요소인지 체크 (UI 개선)
const isLastActor = (actor: never) =>
  movie.value.actors.indexOf(actor) === movie.value.actors.length - 1;
const isLastGenre = (genre: never) =>
  movie.value.genres.indexOf(genre) === movie.value.genres.length - 1;

onMounted(async () => {
  const movieCd = route.params.id as string;
  movie.value = await fetchMovieDetails(movieCd);
});
</script>
