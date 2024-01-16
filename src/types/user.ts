import { IUser } from './data'

export interface ILoginResponse {
  user: IUser
  token: string
}

export interface ILoginRequest {
  email: string
  password: string
}
