import axiosInstance from './Instance';
import { Movie } from '@/types/movie';

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get('/movie/popular', {
    params: {
      language: 'ko-KR',
      region: 'kr',
    },
  });
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query: query,
      include_adult: true,
      language: 'ko-KR',
    },
  });
  return response.data.results;
};
