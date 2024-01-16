import React, { useCallback, useEffect, useState, useMemo } from 'react'
import i18n from 'i18next'

import { getStorageValue, setStorageValue } from '@/utils'
import { TLang } from '@/types'
import { APP_LANGUAGES, DEFAULT_LANG, LANG_KEY } from '@/constants'

interface IAppContext {
  language: TLang
  onChangeLanguage: (_lng: TLang) => void
}

export const AppContext = React.createContext<IAppContext>({
  language: DEFAULT_LANG,
  onChangeLanguage: () => null,
})

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<TLang>(APP_LANGUAGES.EN)

  useEffect(() => {
    const lng = getStorageValue<TLang>(LANG_KEY, DEFAULT_LANG)
    i18n.changeLanguage(lng)
    setLang(lng)
    document.documentElement.lang = lng
  }, [])

  const onChangeLanguage = useCallback((lng: TLang) => {
    i18n.changeLanguage(lng)
    setLang(lng)
    setStorageValue<TLang>(LANG_KEY, lng)
    window.location.reload()
  }, [])

  const values: IAppContext = useMemo(
    () => ({
      language: lang,
      onChangeLanguage,
    }),
    [lang, onChangeLanguage],
  )

  return (
    <AppContext.Provider key={lang} value={values}>
      {children}
    </AppContext.Provider>
  )
}
