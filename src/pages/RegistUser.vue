<script setup>
import { reactive, computed } from 'vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseLabel from '../components/base/BaseLabel.vue'
import BaseButton from '../components/base/BaseButton.vue'

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
      <h1>ユーザー登録</h1>
      <p class="regist__description">必須項目を入力して登録ボタンを押してください。</p>

      <form class="regist__form" @submit.prevent="handleSubmit">
        <div class="form-field">
          <BaseLabel for-id="name" required>氏名</BaseLabel>
          <BaseInput id="name" v-model="form.name" placeholder="山田 太郎" autocomplete="name" />
        </div>

        <div class="form-field">
          <BaseLabel for-id="email" required>メールアドレス</BaseLabel>
          <BaseInput
            id="email"
            v-model="form.email"
            type="email"
            placeholder="taro@example.com"
            autocomplete="email"
          />
        </div>

        <div class="form-field">
          <BaseLabel for-id="password" required>パスワード</BaseLabel>
          <BaseInput
            id="password"
            v-model="form.password"
            type="password"
            placeholder="6文字以上"
            autocomplete="new-password"
          />
          <small class="hint">6文字以上で入力してください</small>
        </div>

        <BaseButton type="submit" :disabled="!isValid" full-width>登録する</BaseButton>
      </form>
    </div>
  </section>
</template>

<style scoped>
.regist {
  display: flex;
  justify-content: center;
  padding: 3.5rem 1.5rem 4rem;
}

.regist__panel {
  width: min(720px, 100%);
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #e4e7ec;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
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

.form-field {
  display: flex;
  flex-direction: column;
}

.hint {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: #64748b;
}
</style>
