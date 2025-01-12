<template>
  <div>
    <h1>박스오피스 메인 페이지</h1>
    <a-date-picker
      @change="onDateChange"
      placeholder="날짜를 선택하세요"
      style="margin-bottom: 20px"
    />
    <a-table
      :columns="columns"
      :data-source="movies"
      row-key="movieCd"
      bordered
    >
      <template #movieNm="{ text, record }">
        <a @click.prevent="navigateToDetail(record.movieCd)">{{ text }}</a>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchDailyBoxOffice } from "@/axios/api";

const movies = ref([]);
const router = useRouter();

const navigateToDetail = (movieCd: string) => {
  router.push(`/movie/${movieCd}`);
};

const onDateChange = async (date: string) => {
  if (!date) return;

  const formattedDate = date.format("YYYYMMDD");
  const result = await fetchDailyBoxOffice(formattedDate);

  movies.value = result.map((item: never) => ({
    ...item,
    key: item.movieCd,
  }));
};

const columns = [
  {
    title: "순위",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "영화명",
    dataIndex: "movieNm",
    key: "movieNm",
    slots: { customRender: "movieNm" }, // 템플릿 슬롯 이름 지정
  },
  {
    title: "개봉일",
    dataIndex: "openDt",
    key: "openDt",
  },
  {
    title: "관객 수",
    dataIndex: "audiCnt",
    key: "audiCnt",
  },
];
</script>
