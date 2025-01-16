<template>
  <div class="loading-overlay" v-if="props.isLoading">
    <a-spin size="large" tip="Loading..." />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  isLoading: {
    type: Boolean,
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}
</style>
