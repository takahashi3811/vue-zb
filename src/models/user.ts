export interface User {
  employeeCode: string
  employeeName: string
  email: string
  password: string
  passwordConfirm: string
  expiredAt: string
}

export const createEmptyUser = (): User => ({
  employeeCode: '',
  employeeName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  expiredAt: '',
})

