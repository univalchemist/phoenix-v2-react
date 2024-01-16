export const getStorageValue = <T = string>(key: string, defaultValue?: T) => {
  const value =
    window.localStorage.getItem(key) || window.sessionStorage.getItem(key)

  try {
    return value ? JSON.parse(value) : defaultValue
  } catch (error) {
    console.log('storage error: ', error)
  }
  return defaultValue
}

export const setStorageValue = <T = string>(
  key: string,
  value: T,
  persist = true,
): void => {
  const valueToStore = value instanceof Function ? value(value) : value

  try {
    const _value = JSON.stringify(valueToStore)
    if (persist) {
      window.localStorage.setItem(key, _value)
    } else {
      window.sessionStorage.setItem(key, _value)
    }
  } catch {
    console.warn(`Could not save ${key} to localStorage`)
  }
}

export const removeStorageValue = (key: string) => {
  window.localStorage.removeItem(key)
  window.sessionStorage.removeItem(key)
}
