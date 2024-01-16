import { useRef, useEffect, MutableRefObject } from 'react'

export const useCombinedRefs = (...refs: any[]): MutableRefObject<any> => {
  const targetRef = useRef<any>()

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}
