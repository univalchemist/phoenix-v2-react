import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginRequest, ILoginResponse } from '@/types/user'

export const authApi = createApi({
  reducerPath: 'authLogin',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.dev.com/v1/',
  }),
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: body => ({
        url: 'auth/',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
