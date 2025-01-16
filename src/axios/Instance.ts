import axios from 'axios';

const TMDB_BASE_URL = process.env.VUE_APP_TMDB_BASE_URL;
const TMDB_API_KEY = process.env.VUE_APP_TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export default axiosInstance;
