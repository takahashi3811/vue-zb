import type { User } from '../models/user'

export type UserField = keyof User

type Rule = {
  required?: boolean
  length?: number
  minLength?: number
  pattern?: RegExp
  sameAs?: UserField
  message?: string
}

export const userValidationRules: Record<UserField, Rule[]> = {
  employeeCode: [
    { required: true, message: '社員コードを入力してください' },
    { length: 6, message: '社員コードは6文字で入力してください' },
  ],
  employeeName: [{ required: true, message: '社員名を入力してください' }],
  email: [
    { required: true, message: 'メールアドレスを入力してください' },
    {
      pattern: /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/,
      message: 'メールアドレスの形式が正しくありません',
    },
  ],
  password: [
    { required: true, message: 'パスワードを入力してください' },
    { minLength: 6, message: 'パスワードは6文字以上で入力してください' },
  ],
  passwordConfirm: [
    { required: true, message: '確認用パスワードを入力してください' },
    { sameAs: 'password', message: 'パスワードが一致しません' },
  ],
  expiredAt: [{ required: true, message: '有効期限を入力してください' }],
}

export const validateUserField = (field: UserField, user: User): string => {
  const rules = userValidationRules[field]
  for (const rule of rules) {
    const value = user[field]
    if (rule.required && !value) {
      return rule.message ?? '必須項目です'
    }
    if (typeof rule.length === 'number' && value.length !== rule.length) {
      return rule.message ?? `${rule.length}文字で入力してください`
    }
    if (typeof rule.minLength === 'number' && value.length < rule.minLength) {
      return rule.message ?? `${rule.minLength}文字以上で入力してください`
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message ?? '形式が正しくありません'
    }
    if (rule.sameAs && value !== user[rule.sameAs]) {
      return rule.message ?? '値が一致しません'
    }
  }
  return ''
}

