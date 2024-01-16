import React, { useRef } from 'react'
import classNames from 'classnames'

import { usePopover } from '@/hooks'
import { TFunc } from '@/types'

interface Props {
  open: boolean | undefined
  trigger: 'on-click' | 'mouse-over'
  disabled: boolean
  onTrigger: TFunc
  children: React.ReactElement
}

const Trigger: React.FC<Props> = ({
  open,
  trigger,
  disabled,
  onTrigger,
  children,
}) => {
  const { setTriggerRect } = usePopover()

  const ref = useRef<HTMLElement>(null)

  const _onTrigger = (ev: React.MouseEvent<HTMLElement>) => {
    if (disabled) return

    const element = ref.current
    if (element == null) return

    const rect = element.getBoundingClientRect()
    setTriggerRect(rect)
    onTrigger?.()
    ev.preventDefault()
    ev.stopPropagation()
  }

  const childrenToTriggerPopover = React.cloneElement(children, {
    ...(trigger === 'on-click' && {
      onClick: _onTrigger,
    }),
    ...(trigger === 'mouse-over' && {
      onMouseOver: _onTrigger,
    }),
    className: classNames(children.props.className, { opened: open }),
    ref,
  })

  return childrenToTriggerPopover
}

export default Trigger
