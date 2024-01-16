import React, { useCallback, useEffect, useMemo } from 'react'
import {
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from 'react-router-dom'

import { ISignInPayload, IUser, TFunc } from '@/types'
import { AUTH_TOKEN_KEY, KEEP_SIGNIN_KEY } from '@/constants'
import {
  getStorageValue,
  removeStorageValue,
  adminSingInPath,
  adminHomePath,
} from '@/utils'
import { meMock } from '@/utils/mock'

interface IAdminAuthContext {
  authenticating?: boolean
  me: Maybe<IUser>
  onSignIn: (_payload: ISignInPayload) => Promise<void>
  onSignOut: TFunc
}

export const AdminAuthContext = React.createContext<IAdminAuthContext>(
  {} as IAdminAuthContext,
)

export const AdminAuthContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }: { children: React.ReactNode }) => {
  const navigate: NavigateFunction = useNavigate()
  const { pathname, search }: Location = useLocation()

  //authenticate
  // @ts-ignore
  const authenticate = useCallback(
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_skipTokenLogin?: boolean) => {
      try {
        //check token
        const token = getStorageValue(AUTH_TOKEN_KEY)
        if (!token) throw 'token not found'

        //token login
        // if (!skipTokenLogin) {
        //   const accessToken = (await tokenLogin()).data?.tokenLogin?.accessToken
        //   if (!accessToken) throw 'token login failed'
        //   const keepSignin = !!getStorageValue(KEEP_SIGNIN_KEY)
        //   setStorageValue(AUTH_TOKEN_KEY, accessToken, keepSignin)
        // }

        //fetch me
        // const me = (await fetchMe()).data?.me?.data
        // if (!me) throw 'fetch me failed'

        //navigate
        const fromPath = `${pathname}${search ? search : ''}` || adminHomePath
        const to = fromPath.includes(adminSingInPath) ? adminHomePath : fromPath
        navigate(to, { replace: true })
        // return me
      } catch (error) {
        navigate(adminSingInPath, { replace: true })
      }
    },
    [navigate, pathname, search],
  )

  //authenticate on mount
  useEffect(() => {
    // authenticate()
  }, [authenticate])

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const onSignIn = useCallback(async (_payload: ISignInPayload) => {
    // const { data: res } = await login({
    //   variables: payload,
    //   onError: console.log,
    // })
    // const accessToken = res?.login?.accessToken
    // if (accessToken) {
    //   setStorageValue(AUTH_TOKEN_KEY, accessToken, !!payload.keepSignin)
    //   setStorageValue(KEEP_SIGNIN_KEY, !!payload.keepSignin)
    //   authenticate(true) //authenticate but, skip token login
    // } else {
    //   console.log('error', res?.login?.errorCode)
    //   throw res?.login?.errorCode
    // }
  }, [])

  const onSignOut = useCallback(() => {
    removeStorageValue(AUTH_TOKEN_KEY)
    removeStorageValue(KEEP_SIGNIN_KEY)
    navigate(adminSingInPath, { replace: true })
  }, [navigate])

  const values = useMemo(
    () => ({
      authenticating: false,
      me: meMock,
      onSignIn,
      onSignOut,
    }),
    [onSignIn, onSignOut],
  )

  return (
    <AdminAuthContext.Provider value={values}>
      {children}
    </AdminAuthContext.Provider>
  )
}
