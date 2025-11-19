<script setup>
import { reactive, computed } from 'vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseLabel from '../components/base/BaseLabel.vue'
import BaseButton from '../components/base/BaseButton.vue'
import SearchComponent from '../components/SearchComponent.vue'
import BaseTable from '../components/base/BaseTable.vue'
import BaseDateInput from '../components/base/BaseDateInput.vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const isValid = computed(() => {
  return form.name && form.email && form.password.length >= 6
})

const handleSubmit = () => {
  if (!isValid.value) return
  alert(`登録しました：${form.name}`)
}
</script>

<template>
  <section class="regist">
    <div class="regist__panel">
      <div class="regist__header">
        <h1>ユーザー登録</h1>
        <div class="regist__header-button">
          <BaseButton type="button" :disabled="!isValid" @click="handleSubmit">登録する</BaseButton>
        </div>
      </div>
      <div class="regist__form">
        <div class="form-grid">
          <div class="form-field">
            <BaseLabel for-id="name" required>社員コード</BaseLabel>
            <BaseInput id="name" v-model="form.name" placeholder="1234567890" autocomplete="name" />
          </div>

          <div class="form-field">
            <BaseLabel for-id="password" required>パスワード</BaseLabel>
            <BaseInput
              id="password"
              v-model="form.password"
              type="text"
              autocomplete="new-password"
            />
          </div>
        </div>
        <div class="form-grid">
            <div class="form-field">
            <BaseLabel for-id="name" required>社員名</BaseLabel>
            <BaseInput id="name" v-model="form.name" placeholder="山田 太郎" autocomplete="name" />
          </div>
          <div class="form-field">
            <BaseLabel for-id="password" required>パスワード</BaseLabel>
            <BaseInput
              id="password"
              v-model="form.password"
              type="text"
              autocomplete="new-password"
            />
          </div>
        </div>
        <div class="form-grid">
            <div class="form-field">
            <BaseLabel for-id="email" required>メールアドレス</BaseLabel>
            <BaseInput id="email" v-model="form.email" type="email" placeholder="taro@example.com" autocomplete="email" />
          </div>
          <div class="form-field">
            <BaseLabel for-id="date" required>有効期限</BaseLabel>
            <BaseDateInput id="date" v-model="form.date" placeholder="2025-01-01" autocomplete="date" />
          </div>
        </div>
      </div>
      <SearchComponent />
      <BaseTable :data="data" :columns="columns" />
    </div>
  </section>
</template>

<style scoped>
.regist {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2.5rem 1rem;
}

.regist__panel {
  width: 90%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #e4e7ec;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
  
}
.regist__header {
  margin-bottom: 1.5rem;
}

.regist__panel h1 {
  text-align: center;
  margin: 0 0 1rem 0;
}

.regist__header-button {
  display: flex;
  justify-content: flex-end;
}

.regist__description {
  color: #475467;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.regist__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field--full {
  grid-column: 1 / -1;
}

.hint {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: #64748b;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-field--full {
    grid-column: auto;
  }
}
</style>
