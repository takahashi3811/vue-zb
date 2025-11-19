<script setup>
import BaseButton from '../components/base/BaseButton.vue'
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">ようこそ</p>
      <h1>社員管理システムへようこそ</h1>
      <p class="hero__description">
        下のボタンから社員登録画面へ移動し、フォーム用のベースコンポーネントをお試しください。
      </p>
      <RouterLink to="/regist-user">
        <BaseButton full-width>社員登録へ</BaseButton>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2.5rem 1rem;
}

.hero__content {
  max-width: 720px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.hero__eyebrow {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.hero__description {
  color: #475467;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

:deep(a) {
  text-decoration: none;
}
</style>

