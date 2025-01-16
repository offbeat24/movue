<template>
  <a-layout>
    <NavigationBar />
    <router-view />
  </a-layout>
</template>

<script lang="ts" setup>
import NavigationBar from '@/components/NavigationBar.vue';
</script>
