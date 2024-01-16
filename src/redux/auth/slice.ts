import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'
import { authApi } from './service'

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logout: (state, _payload: PayloadAction<any>) => {
      state.user = undefined
      state.token = ''
      state.isAuthenticated = false
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user
        state.token = payload.token
        state.isAuthenticated = true
      },
    )
  },
})

export const { logout } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
