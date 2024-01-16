import React from 'react'

import { Placement, TFunc } from '@/types'

export interface IPopoverProps {
  className?: string
  arrow?: boolean
  disabled?: boolean
  initialOpen?: boolean
  button: React.ReactElement
  placement?: Placement
  positioning?: 'absolute' | 'fixed'
  closeOnOutside?: boolean
  distance?: number
  trigger?: 'on-click' | 'mouse-over'
  WrapEl?: React.ElementType
  children: React.ReactNode | ((_onClose: TFunc) => React.ReactNode)
  onOpened?: TFunc
  onClosed?: TFunc
}
