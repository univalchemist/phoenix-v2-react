import { useEffect, useRef, useState } from 'react'

type ISearchFn<T> = (_text: string) => Promise<T> | T

export function useSearch<ResType = void>(
  debounce: number,
  initial?: string,
  searchFn?: ISearchFn<ResType>,
) {
  const timer = useRef<NodeJS.Timeout>()
  const [text, setText] = useState<string | undefined>()

  useEffect(() => {
    if (initial) {
      setText(initial)
    }
  }, [initial])

  useEffect(() => {
    const _debounce = text ? debounce : 0
    if (text !== null && text !== undefined) {
      timer.current = setTimeout(() => {
        searchFn?.(text)
      }, _debounce)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [text, searchFn, debounce])

  return {
    text,
    onChangeText: (val: string) => setText(val),
  }
}
