<script setup>
import { ref } from 'vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';
import BaseModal from './base/BaseModal.vue';

// テキスト入力の値
const searchValue = ref('');

// モーダルの表示状態
const isModalOpen = ref(false);

// 検索ボタンクリック時の処理
const handleSearch = () => {
  // ポップアップを表示
  isModalOpen.value = true;
};
</script>

<template>
  <div class="search-component">
    <!-- テキスト入力、虫眼鏡ボタン、非活性inputを横並び -->
    <BaseInput
      v-model="searchValue"
      type="text"
      placeholder=""
      class="search-component__input"
    />
    <BaseButton
      class="search-component__button"
      @click="handleSearch"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="search-icon"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </BaseButton>
    <BaseInput
      :model-value="''"
      disabled
      placeholder="非活性入力"
      class="search-component__disabled-input"
    />
  </div>

  <!-- ポップアップ -->
  <BaseModal v-model="isModalOpen" title="検索" size="medium">
    <div class="search-modal-content">
      <p>検索キーワード: <strong>{{ searchValue || '(未入力)' }}</strong></p>
      <p class="search-modal-hint">検索機能の実装はこちらで行ってください。</p>
    </div>
    <template #footer>
      <BaseButton variant="secondary" @click="isModalOpen = false">閉じる</BaseButton>
      <BaseButton variant="primary" @click="isModalOpen = false">検索</BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped>
.search-component {
  display: flex;
  align-items: stretch;
  width: 100%;
}

.search-component__input {
  flex: 1;
}

.search-component__input :deep(.base-input) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-component__button {
  width: 3rem;
  height: 3rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-width: 3rem;
  flex-shrink: 0;
  border-radius: 0;
  margin-left: -1px;
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: currentColor;
}

.search-component__disabled-input {
  flex: 3;
  margin-left: -1px;
}

.search-component__disabled-input :deep(.base-input) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.search-modal-content {
  padding: 1rem 0;
}

.search-modal-hint {
  margin-top: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}
</style>

