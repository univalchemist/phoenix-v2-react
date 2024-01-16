import { useEffect, useRef } from 'react'
import { TFunc } from '@/types'

export const useWait = (task: TFunc, ms: number) => {
  const timeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeout.current = setTimeout(task, ms)

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [task, ms])
}
