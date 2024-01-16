import { useCallback, useState } from 'react'

export const useToggle = (
  initial?: boolean,
): [boolean, (_val?: boolean) => void] => {
  const [value, setValue] = useState<boolean>(!!initial)

  const toggle = useCallback((nextVal?: boolean) => {
    if (nextVal !== undefined) {
      setValue(nextVal)
    } else {
      setValue(prev => !prev)
    }
  }, [])

  return [value, toggle]
}
