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
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { fetchDailyBoxOffice } from "@/axios/api";

const movies = ref([]);

// 테이블 컬럼 정의
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

const onDateChange = async (date: string) => {
  if (!date) return;

  const formattedDate = date.format("YYYYMMDD");
  const result = await fetchDailyBoxOffice(formattedDate);
  movies.value = result.map((item: never) => ({
    ...item,
    key: item.movieCd,
  }));
};
</script>
