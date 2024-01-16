import { IUser } from '@/types'
import { meMock } from '@/utils/mock'

export interface AuthState {
  user?: IUser
  token?: string
  isAuthenticated: boolean
}

export const initialState: AuthState = {
  user: meMock,
  token: '',
  isAuthenticated: true,
}
