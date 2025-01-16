<template>
  <a-modal
    :visible="isVisible"
    @cancel="closeModal"
    @ok="closeModal"
    title="Validation Error"
  >
    <p>{{ message }}</p>
  </a-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
  isVisible: Boolean,
  message: String,
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
