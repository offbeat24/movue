import { defineStore } from "pinia";

export interface FavoriteMovie {
  id: string;
  title: string;
  memo: string;
}

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favorites: [] as FavoriteMovie[],
  }),
  actions: {
    addFavorite(movie: FavoriteMovie) {
      if (!this.favorites.find((item) => item.id === movie.id)) {
        this.favorites.push(movie);
      }
    },
    updateMemo(id: string, memo: string) {
      const movie = this.favorites.find((item) => item.id === id);
      if (movie) {
        movie.memo = memo;
      }
    },
    removeFavorite(id: string) {
      this.favorites = this.favorites.filter((item) => item.id !== id);
    },
  },
});
