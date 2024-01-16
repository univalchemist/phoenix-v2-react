import React, { useMemo, useState } from 'react'

import { Rect, Placement, TFunc } from '@/types'

const defaultRect: Rect = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
}

interface IPopoverContext {
  onClose: TFunc
  placement: Placement
  triggerRect: Rect
  closeOnOutside: boolean
  setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>
  distance: number
}

export const PopoverContext = React.createContext<IPopoverContext>({
  onClose: () => {
    throw new Error('PopoverContext setIsShow should be used under provider')
  },
  placement: 'bottom-center',
  closeOnOutside: true,
  triggerRect: defaultRect,
  setTriggerRect: () => {
    throw new Error(
      'PopoverContext setTriggerRect should be used under provider',
    )
  },
  distance: 12,
})

export const PopoverContextProvider: React.FC<{
  onClose: TFunc
  placement?: Placement
  closeOnOutside?: boolean
  distance: number
  children: React.ReactNode
}> = ({
  onClose,
  children,
  placement = 'bottom-center',
  closeOnOutside,
  distance,
}) => {
  const [triggerRect, setTriggerRect] = useState(defaultRect)

  const values = useMemo(
    () => ({
      placement,
      onClose,
      triggerRect,
      setTriggerRect,
      closeOnOutside: !!closeOnOutside,
      distance,
    }),
    [placement, onClose, triggerRect, closeOnOutside, distance],
  )

  return (
    <PopoverContext.Provider value={values}>{children}</PopoverContext.Provider>
  )
}
