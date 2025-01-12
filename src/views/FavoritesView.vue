<template>
  <div>
    <h1>관심 영화 목록</h1>
    <a-list bordered :data-source="favorites" row-key="id">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.title" />
          <template #actions>
            <a-input-textarea
              v-model="item.memo"
              @blur="updateMemo(item.id, item.memo)"
              placeholder="메모를 입력하세요"
              rows="2"
            />
            <a-button
              danger
              @click="removeFavorite(item.id)"
              style="margin-top: 10px"
            >
              삭제
            </a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import { useFavoriteStore } from "@/stores/favorites";

const favoriteStore = useFavoriteStore();

const favorites = favoriteStore.favorites;

const updateMemo = (id: string, memo: string) => {
  favoriteStore.updateMemo(id, memo);
};

const removeFavorite = (id: string) => {
  favoriteStore.removeFavorite(id);
};
</script>
