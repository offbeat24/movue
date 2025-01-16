<template>
  <a-layout-header class="header">
    <div class="logo">
      <router-link to="/">Movue</router-link>
    </div>
    <a-menu mode="horizontal" theme="dark" :selected-keys="[activeMenu]">
      <a-menu-item key="home">
        <router-link to="/">인기 영화</router-link>
      </a-menu-item>
      <a-menu-item key="search">
        <router-link to="/search">검색</router-link>
      </a-menu-item>
      <a-menu-item key="favorites">
        <router-link to="/favorites">관심 영화</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';

const route = useRoute();

const selectedKey = ref(
  route.path.includes('favorites')
    ? 'favorites'
    : route.path.includes('search')
    ? 'search'
    : 'home'
);

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('favorites')) {
      selectedKey.value = 'favorites';
    } else if (newPath.includes('search')) {
      selectedKey.value = 'search';
    } else {
      selectedKey.value = 'home';
    }
  }
);
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
