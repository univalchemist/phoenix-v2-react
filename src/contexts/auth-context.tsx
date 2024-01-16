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
  signInPath,
  publicPath,
  homePath,
} from '@/utils'
import { meMock } from '@/utils/mock'

interface IAuthContext {
  authenticating?: boolean
  me: Maybe<IUser>
  onSignIn: (_payload: ISignInPayload) => Promise<void>
  onSignOut: TFunc
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const navigate: NavigateFunction = useNavigate()
  const { pathname, search }: Location = useLocation()

  //authenticate
  // @ts-ignore
  const authenticate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_skipTokenLogin?: boolean) => {
      if (publicPath.includes(pathname)) return

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
        const fromPath = `${pathname}${search ? search : ''}` || homePath
        const to = fromPath.includes(signInPath) ? homePath : fromPath
        navigate(to, { replace: true })
        // return me
      } catch (error) {
        navigate(signInPath, { replace: true })
      }
    },
    [navigate, pathname, search],
  )

  //authenticate on mount
  useEffect(() => {
    // authenticate()
  }, [authenticate])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    navigate(signInPath, { replace: true })
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

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
