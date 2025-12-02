<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseFormField from '../components/base/BaseFormField.vue'
import BaseDateInput from '../components/base/BaseDateInput.vue'
import BaseTable from '../components/base/BaseTable.vue'
import BaseHeading from '../components/base/BaseHeading.vue'
import SearchComponent from '../components/SearchComponent.vue'
import { createEmptyUser, type User } from '../models/user'
import { validateUserField, type UserField } from '../validation/userRules'
import {
  sampleDivisionData,
  type DivisionData,
  createEmptyDivision,
  generateNewDivisionId,
} from '../models/division'

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

// 部署・所属データ
const divisionData = ref<DivisionData[]>([...sampleDivisionData])
const selectedMainId = ref<number>(
  divisionData.value.find((item) => item.isMain)?.id || divisionData.value[0]?.id || 1
)

// 主所属の変更処理
const handleMainChange = (id: number) => {
  selectedMainId.value = id
  divisionData.value.forEach((item) => {
    item.isMain = item.id === id
  })
}

// テーブル行追加処理
const handleAddRow = () => {
  const newId = generateNewDivisionId(divisionData.value)
  const newRow = createEmptyDivision(newId)
  divisionData.value.push(newRow)
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
          <BaseButton type="button" variant="transaction" :disabled="!isValid" @click="handleSubmit">登録</BaseButton>
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

      <!-- 部署・所属テーブル -->
      <div class="regist__table-header">
        <h3 class="regist__description">部署・所属情報</h3>
        <BaseButton variant="event" @click="handleAddRow">行を追加</BaseButton>
      </div>
      <BaseTable variant="bordered" :full-width="true">
        <template #thead>
          <tr>
            <th>
              <input type="text" value="主所属" readonly />
            </th>
            <th>
              <input type="text" value="部署コード" readonly />
            </th>
            <th>
              <input type="text" value="部署名称" readonly />
            </th>
            <th>
              <input type="text" value="所属コード" readonly />
            </th>
            <th>
              <input type="text" value="所属名称" readonly />
            </th>
            <th>
              <input type="text" value="適用開始日" readonly />
            </th>
            <th>
              <input type="text" value="適用終了日" readonly />
            </th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="row in divisionData" :key="row.id">
            <td style="text-align: center;">
              <input
                type="radio"
                name="mainDivision"
                :value="row.id"
                :checked="selectedMainId === row.id"
                @change="handleMainChange(row.id)"
              />
            </td>
            <td>
              <input type="text" v-model="row.departmentCode" />
            </td>
            <td>
              <input type="text" v-model="row.departmentName" />
            </td>
            <td>
              <input type="text" v-model="row.divisionCode" />
            </td>
            <td>
              <input type="text" v-model="row.divisionName" />
            </td>
            <td>
              <input type="date" v-model="row.startDate" />
            </td>
            <td>
              <input type="date" v-model="row.endDate" />
            </td>
          </tr>
        </template>
      </BaseTable>
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

.regist__table-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.regist__table-header .regist__description {
  margin-bottom: 0;
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

/* テーブル内のinput要素のスタイル */
.base-table input[type="radio"] {
  cursor: pointer;
}

.base-table input[type="text"],
.base-table input[type="date"] {
  width: 100%;
  border: 1px solid #e4e7ec;
  background: #fff;
  padding: 0.5rem;
  font-size: inherit;
  color: #000;
  font-family: inherit;
  border-radius: 4px;
}

.base-table input[type="text"]:focus,
.base-table input[type="date"]:focus {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
  border-color: #2563eb;
}

/* thead内のinput要素（readonly）のスタイル */
.base-table thead input[type="text"] {
  background: #f8fafc;
  font-weight: 600;
  color: #111827;
  cursor: default;
}

.base-table thead input[type="text"]:focus {
  outline: none;
  border-color: #e4e7ec;
}
</style>
