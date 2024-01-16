import { TLang } from '@/types'

export const LANG_KEY = '@lang'

export const DEFAULT_LANG = 'en'

export const APP_LANGUAGES: Record<'EN', TLang> = {
  EN: 'en',
}

export const APP_CURRENCIES = ['USD', 'EUR', 'GBP'] as const

export const AUTH_TOKEN_KEY = '@a_token'
export const KEEP_SIGNIN_KEY = '@keep'

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const ENDPOINT = IS_DEV ? 'backend-dev.com' : 'backend-dev.com'

export const GRAPHQL_ENDPOINT = `${
  IS_DEV ? 'https' : 'https'
}://${ENDPOINT}/v1/api`

export const WEBSOCKET_ENDPOINT = `${IS_DEV ? 'wss' : 'wss'}://${ENDPOINT}`

export * from './misc'
