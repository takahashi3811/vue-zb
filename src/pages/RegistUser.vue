<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseFormField from '../components/base/BaseFormField.vue'
import BaseDateInput from '../components/base/BaseDateInput.vue'
import BaseTable from '../components/base/BaseTable.vue'
import BaseHeading from '../components/base/BaseHeading.vue'
import SearchComponent from '../components/SearchComponent.vue'
import { createEmptyUser, type User } from '../models/user'
import { validateUserField, type UserField } from '../validation/userRules'

const form = reactive<User>(createEmptyUser())
const touched = reactive<Record<UserField, boolean>>({
  employeeCode: false,
  employeeName: false,
  email: false,
  password: false,
  passwordConfirm: false,
  expiredAt: false,
})
const errors = reactive<Partial<Record<UserField, string>>>({})

const setError = (field: UserField, message = '') => {
  errors[field] = message
}

const validateField = (field: UserField) => {
  setError(field, validateUserField(field, form))
}

const handleBlur = (field: UserField) => {
  touched[field] = true
  validateField(field)
}

const watchedFields: UserField[] = [
  'employeeCode',
  'employeeName',
  'email',
  'password',
  'passwordConfirm',
  'expiredAt',
]

watchedFields.forEach((field) => {
  watch(
    () => form[field],
    () => validateField(field),
    { immediate: true }
  )
})

watch(
  () => form.password,
  () => validateField('passwordConfirm')
)

const columns = [
  { key: 'employeeCode', label: '社員コード' },
  { key: 'employeeName', label: '社員名' },
  { key: 'email', label: 'メールアドレス' },
  { key: 'expiredAt', label: '有効期限' },
]

const data = reactive([
  {
    employeeCode: '',
    employeeName: '',
    email: '',
    expiredAt: '',
  },
])

const isValid = computed(() => {
  return (
    form.employeeCode &&
    form.employeeName &&
    form.email &&
    form.password.length >= 6 &&
    form.password === form.passwordConfirm &&
    form.expiredAt &&
    Object.values(errors).every((msg) => !msg)
  )
})

const handleSubmit = () => {
  if (!isValid.value) return
  alert(`登録しました：${form.employeeName}`)
}
</script>

<template>
  <section class="regist">
    <div class="regist__panel">
      <div class="regist__header">
        <BaseHeading :level="1" align="center" class="regist__title">
          ユーザー登録
        </BaseHeading>
        <div class="regist__header-button">
          <BaseButton type="button" :disabled="!isValid" @click="handleSubmit">登録</BaseButton>
        </div>
      </div>
      <h3 class="regist__description">社員情報</h3>
      <div class="regist__form">
        <div class="form-grid">
          <BaseFormField
            label="社員コード"
            for-id="employeeCode"
            required
            :error="touched.employeeCode ? errors.employeeCode : ''"
          >
            <BaseInput
              id="employeeCode"
              v-model="form.employeeCode"
              autocomplete="off"
              @blur="handleBlur('employeeCode')"
            />
          </BaseFormField>

          <BaseFormField
            label="パスワード"
            for-id="password"
            required
            :error="touched.password ? errors.password : ''"
          >
            <BaseInput
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              @blur="handleBlur('password')"
            />
          </BaseFormField>
        </div>

        <div class="form-grid">
          <BaseFormField
            label="社員名"
            for-id="employeeName"
            required
            :error="touched.employeeName ? errors.employeeName : ''"
          >
            <BaseInput
              id="employeeName"
              v-model="form.employeeName"
              autocomplete="name"
              @blur="handleBlur('employeeName')"
            />
          </BaseFormField>

          <BaseFormField
            label="パスワード確認"
            for-id="passwordConfirm"
            required
            :error="touched.passwordConfirm ? errors.passwordConfirm : ''"
          >
            <BaseInput
              id="passwordConfirm"
              v-model="form.passwordConfirm"
              type="password"
              autocomplete="confirm-password"
              @blur="handleBlur('passwordConfirm')"
            />
          </BaseFormField>
        </div>

        <div class="form-grid">
          <BaseFormField
            label="メールアドレス"
            for-id="email"
            required
            :error="touched.email ? errors.email : ''"
          >
            <BaseInput
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              @blur="handleBlur('email')"
            />
          </BaseFormField>
          <BaseFormField
            label="有効期限"
            for-id="expiredAt"
            required
            :error="touched.expiredAt ? errors.expiredAt : ''"
          >
            <BaseDateInput
              id="expiredAt"
              v-model="form.expiredAt"
              autocomplete="off"
              @blur="handleBlur('expiredAt')"
            />
          </BaseFormField>
        </div>
        <h3 class="regist__description">権限情報</h3>
        <div class="form-grid form-grid--stacked">
          <BaseFormField
            label="システムアクセス範囲"
            for-id="systemAccessRange"
            required
          >
            <SearchComponent />
          </BaseFormField>
          <BaseFormField
            label="仕訳承認レベル"
            for-id="approvalLevel"
            required
          >
            <SearchComponent />
          </BaseFormField>
        </div>
      </div>

      <!-- <SearchComponent /> -->
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

.regist__title {
  text-align: center;
  margin: 0 0 1rem 0;
  color: #111827;
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
  gap: 0.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 2rem;
}

.form-grid + .form-grid {
  margin-top: 0;
}

.form-grid--stacked :deep(.base-form-field) {
  grid-column: 1 / 2;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
