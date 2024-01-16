import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopy(timeout = 3000) {
  const [copied, setCopied] = useState<boolean>(false)
  const timer = useRef<NodeJS.Timeout>()

  const copy = useCallback(
    (text: string) => {
      if ('clipboard' in navigator) {
        navigator.clipboard.writeText(text)
      } else {
        document.execCommand('copy', true, text)
      }
      setCopied(true)
      timer.current = setTimeout(() => {
        setCopied(false)
      }, timeout)
    },
    [timeout],
  )

  useEffect(
    () => () => {
      if (timer.current) [clearTimeout(timer.current)]
    },
    [],
  )
  return {
    copied,
    copy,
  }
}
