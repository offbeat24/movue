<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <a-menu theme="dark" mode="horizontal" :selected-keys="[selectedKey]">
          <a-menu-item key="box-office">
            <router-link to="/">박스오피스</router-link>
          </a-menu-item>
          <a-menu-item key="favorites">
            <router-link to="/favorites">관심 영화</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 20px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";

const route = useRoute();
const selectedKey = ref(
  route.path.includes("favorites") ? "favorites" : "box-office"
);

watch(
  () => route.path,
  (newPath) => {
    selectedKey.value = newPath.includes("favorites")
      ? "favorites"
      : "box-office";
  }
);
</script>

<style>
/* GNB 스타일 추가 */
#app .ant-layout-header {
  display: flex;
  align-items: center;
}
</style>
