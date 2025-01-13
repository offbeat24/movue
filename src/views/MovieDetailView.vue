<template>
  <a-card :title="movie.movieNm" bordered>
    <a-descriptions bordered :column="1">
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
    <form @submit.prevent="onSubmit">
      <Field
        name="memo"
        rules="required"
        as="a-textarea"
        placeholder="메모를 입력하세요"
        :rows="3"
      />
      <ErrorMessage name="memo" as="span" style="color: red" />
      <br />
      <a-button type="primary" html-type="submit" style="margin-top: 10px">
        관심영화로 등록하기
      </a-button>
    </form>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFavoriteStore } from "@/stores/favorites";
import { fetchMovieDetails } from "@/axios/api";
import { defineRule, useForm, Field, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";

defineRule("required", required);
const route = useRoute();
const router = useRouter();
const movie = ref({
  movieNm: "",
  directors: [],
  actors: [],
  openDt: "",
  genres: [],
});
const favoriteStore = useFavoriteStore();
const { handleSubmit } = useForm();

const onSubmit = handleSubmit((values) => {
  favoriteStore.addFavorite({
    id: route.params.id as string,
    title: movie.value.movieNm,
    memo: values.memo,
  });

  alert("관심 영화에 등록되었습니다.");

  // 관심 영화 목록으로 리다이렉션
  router.push("/favorites");
});

const isLastActor = (actor: never) =>
  movie.value.actors.indexOf(actor) === movie.value.actors.length - 1;
const isLastGenre = (genre: never) =>
  movie.value.genres.indexOf(genre) === movie.value.genres.length - 1;

onMounted(async () => {
  const movieCd = route.params.id as string;
  movie.value = await fetchMovieDetails(movieCd);
});
</script>
