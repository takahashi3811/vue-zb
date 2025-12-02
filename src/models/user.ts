export interface User {
  userCode: string
  userName: string
  email: string
  password: string
  passwordConfirm: string
  expiredAt: string
}

export const createEmptyUser = (): User => ({
  userCode: '',
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  expiredAt: '',
})

