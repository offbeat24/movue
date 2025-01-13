<template>
  <div>
    <h1>박스오피스 메인 페이지</h1>
    <h2>선택한 날짜: {{ formattedSelectedDate }}</h2>
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
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useBoxOfficeStore } from "@/stores/boxOffice";
import { fetchDailyBoxOffice } from "@/axios/api";
import dayjs from "dayjs";

const movies = ref([]);
const boxOfficeStore = useBoxOfficeStore();

const selectedDate = ref(
  boxOfficeStore.selectedDate
    ? dayjs(boxOfficeStore.selectedDate).toDate()
    : new Date()
);
const formattedSelectedDate = ref(
  dayjs(selectedDate.value).format("YYYY.MM.DD")
);
watch(selectedDate, async (newDate) => {
  if (newDate) {
    const formattedDate = dayjs(newDate).format("YYYYMMDD");
    formattedSelectedDate.value = dayjs(newDate).format("YYYY.MM.DD");
    boxOfficeStore.setDate(formattedDate);

    const result = await fetchDailyBoxOffice(formattedDate);
    movies.value = result.map((item: never) => ({
      ...item,
      key: item.movieCd,
    }));
  }
});

const router = useRouter();

const navigateToDetail = (movieCd: string) => {
  router.push(`/movie/${movieCd}`);
};

const onDateChange = (pickedDate: Date | null) => {
  if (!pickedDate) return;
  selectedDate.value = pickedDate; // 선택된 날짜를 업데이트
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
    slots: { customRender: "movieNm" },
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

onMounted(() => {
  if (selectedDate.value) {
    const formattedDate = dayjs(selectedDate.value).format("YYYYMMDD");
    fetchDailyBoxOffice(formattedDate).then((result) => {
      movies.value = result.map((item: never) => ({
        ...item,
        key: item.movieCd,
      }));
    });
  }
});
</script>
