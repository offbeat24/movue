<template>
  <div>
    <h1>관심 영화 목록</h1>
    <a-list
      bordered
      :data-source="favorites"
      row-key="id"
      style="background: #fff"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <!-- 영화 제목 -->
            <div style="font-size: 16px; font-weight: bold">
              {{ item.title }}
            </div>
            <!-- 메모 내용 또는 텍스트 에리어 -->
            <div>
              <template v-if="editingId === item.id">
                <form @submit.prevent="saveMemo(item.id)">
                  <Field
                    name="memo"
                    rules="required"
                    as="a-textarea"
                    v-model="editMemo"
                    :rows="3"
                    placeholder="메모를 입력하세요"
                    style="margin-bottom: 10px"
                  />
                  <ErrorMessage name="memo" as="span" style="color: red" />
                  <div style="display: flex; gap: 10px; margin-top: 10px">
                    <a-button type="primary" html-type="submit"
                      >저장하기</a-button
                    >
                    <a-button @click="cancelEditing">취소</a-button>
                  </div>
                </form>
              </template>
              <template v-else>
                {{ item.memo || "메모가 없습니다." }}
              </template>
            </div>
            <!-- 버튼 그룹 -->
            <div v-if="editingId !== item.id" style="display: flex; gap: 10px">
              <a-button @click="startEditing(item.id, item.memo)"
                >수정하기</a-button
              >
              <a-button danger @click="removeFavorite(item.id)">삭제</a-button>
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useFavoriteStore } from "@/stores/favorites";
import { defineRule, useForm, Field, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";

// Vee-Validate 규칙 정의
defineRule("required", required);

// Pinia 스토어 가져오기
const favoriteStore = useFavoriteStore();
const favorites = computed(() => favoriteStore.favorites); // 반응형 리스트

// 상태 관리
const editingId = ref<string | null>(null); // 수정 중인 영화 ID
const editMemo = ref(""); // 텍스트 에리어의 메모 내용

// Vee-Validate 폼 설정
const { handleSubmit, resetForm } = useForm();

// 수정 시작
const startEditing = (id: string, memo: string) => {
  editingId.value = id; // 수정 중인 ID 설정
  editMemo.value = memo; // 기존 메모 로드
};

// 수정 취소
const cancelEditing = () => {
  editingId.value = null; // 수정 모드 해제
  editMemo.value = ""; // 텍스트 에리어 초기화
  resetForm(); // 폼 상태 초기화
};

// 메모 저장
const saveMemo = handleSubmit((values: { memo: string }) => {
  if (editingId.value) {
    favoriteStore.updateMemo(editingId.value, values.memo); // Pinia 상태 업데이트
    editingId.value = null; // 수정 모드 해제
    editMemo.value = ""; // 텍스트 에리어 초기화
  }
});

// 영화 삭제
const removeFavorite = (id: string) => {
  favoriteStore.removeFavorite(id); // Pinia 상태에서 삭제
};
</script>
