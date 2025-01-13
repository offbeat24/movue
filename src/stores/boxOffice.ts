import { defineStore } from "pinia";

export const useBoxOfficeStore = defineStore("boxOffice", {
  state: () => ({
    selectedDate: "",
  }),
  actions: {
    setDate(date: string) {
      this.selectedDate = date;
    },
  },
  persist: true,
});
