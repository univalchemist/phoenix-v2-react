import { useCallback, useEffect, useRef } from 'react'

const focusableQuery = ':is(input, button, [tab-index]'

export const useFocusTrapping = () => {
  const refTrigger = useRef<HTMLElement | null>(
    document.activeElement as HTMLElement,
  )
  const ref = useRef<HTMLElement>(null)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const el = ref.current
    if (el == null) return
    const focusables: HTMLElement[] = [
      ...el.querySelectorAll<HTMLElement>(focusableQuery),
    ]

    switch (e.key) {
      case 'Tab':
        // check if it is the last focusable
        const lastFocusable = focusables[focusables.length - 1]
        if (document.activeElement === lastFocusable) {
          focusables[0]?.focus()

          e.preventDefault()
        }
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    const trigger = refTrigger.current
    if (el == null) return

    const focusables: HTMLElement[] = [
      ...el.querySelectorAll<HTMLElement>(focusableQuery),
    ]
    focusables[0]?.focus()

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)

      const currentActiveElement = document.activeElement
      if (currentActiveElement === document.body) {
        trigger?.focus()
      }
    }
  }, [onKeyDown])

  return ref
}
