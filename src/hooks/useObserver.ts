import { useRef, useLayoutEffect, RefObject } from 'react'

export const useResizeObserver = (
  ref: RefObject<Element> | undefined,
  onResize: () => void,
  disabled?: boolean,
) => {
  const observer = useRef<ResizeObserver>()
  const onResizeRef = useRef<() => void>(onResize)
  onResizeRef.current = onResize

  useLayoutEffect(() => {
    const referenceRef = ref ? ref.current : document.body

    if (!disabled && referenceRef) {
      observer.current = new ResizeObserver(() => {
        onResizeRef?.current()
      })
      observer.current.observe(referenceRef)
    }

    return () => {
      if (!disabled && referenceRef && observer.current) {
        observer.current.unobserve(referenceRef)
        observer.current.disconnect()
      }
    }
  }, [ref, disabled])
}
