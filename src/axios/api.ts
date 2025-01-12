import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL; // 환경 변수에서 가져오기
const API_KEY = process.env.VUE_APP_API_KEY; // 여기에 API 키를 입력하세요.

export const fetchDailyBoxOffice = async (date: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/boxoffice/searchDailyBoxOfficeList.json`,
    {
      params: {
        key: API_KEY,
        targetDt: date,
      },
    }
  );
  console.log(response.data.boxOfficeResult.dailyBoxOfficeList);
  return response.data.boxOfficeResult.dailyBoxOfficeList;
};

export const fetchMovieDetails = async (movieCd: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/movie/searchMovieInfo.json`,
    {
      params: {
        key: API_KEY,
        movieCd,
      },
    }
  );
  return response.data.movieInfoResult.movieInfo;
};
