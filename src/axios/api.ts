import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

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
