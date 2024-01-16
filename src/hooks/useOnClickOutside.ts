import React, { useCallback } from 'react'
import { TFunc } from '@/types'

type AnyEvent = MouseEvent | TouchEvent

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  shouldClose: boolean | undefined,
  handler: TFunc,
): void {
  const evListener = useCallback(
    (event: AnyEvent) => {
      const el = ref?.current

      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler()
    },
    [handler, ref],
  )

  React.useEffect(() => {
    if (shouldClose) {
      document.addEventListener('mousedown', evListener)
      document.addEventListener('touchstart', evListener)
    }

    return () => {
      if (shouldClose) {
        document.removeEventListener('mousedown', evListener)
        document.removeEventListener('touchstart', evListener)
      }
    }
  }, [evListener, ref, shouldClose])
}
