import api from "./api"

export type AuthParams  = {
  email: string;
  password: string;
}

const AuthService = {
  sign_in: ({ email, password}: AuthParams) => {
    return api.post('/auth/sign_in', {
      email,
      password
    }).then((response) => response.data)
  },
  sign_out: () => {
    return api.delete('/auth/sign_out').then((response) => response.data)
  }
}

export { AuthService }