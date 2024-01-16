import i18n, { t as _t } from 'i18next'

import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import intervalPlural from 'i18next-intervalplural-postprocessor'

import { APP_LANGUAGES, DEFAULT_LANG } from '@/constants'
import { Paths } from './types'
import enTranslation from './locales/en/common.json'

export const defaultNS = 'common'

export const resources = {
  en: {
    translation: { ...enTranslation },
  },
} as const

i18n // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANG,
    supportedLngs: Object.values(APP_LANGUAGES),
    debug: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  })

type rootLevelKeys = (typeof resources)['en']['translation']
type depthKeys = Paths<rootLevelKeys, 4> // extract keys 4 levels deep, increase upto 10 if needed

export const t = (
  key: depthKeys,
  params?: { [x: string]: any },
  defaultValue?: string,
) => _t<depthKeys>(key, { ...(params || {}), defaultValue })

export default i18n
