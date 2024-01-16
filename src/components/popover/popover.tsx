import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { PopoverContextProvider } from '@/contexts'

import { ConditionalWrapper } from '../wrapper'
import Trigger from './trigger'
import Content from './content'
import { IPopoverProps } from './types'
import './popover.scss'

export const Popover: React.FC<IPopoverProps> = ({
  className,
  arrow = false,
  disabled,
  initialOpen,
  button,
  placement,
  positioning = 'absolute',
  closeOnOutside = true,
  distance = 0,
  trigger = 'on-click',
  WrapEl,
  onOpened,
  onClosed,
  children,
}) => {
  const [open, setOpen] = useState<boolean | undefined>()

  useEffect(() => {
    if (initialOpen !== undefined) {
      setOpen(initialOpen)
    }
  }, [initialOpen])

  useEffect(() => {
    if (open === undefined) return

    if (open) {
      onOpened?.()
    } else {
      onClosed?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <PopoverContextProvider
      closeOnOutside={closeOnOutside}
      onClose={() => setOpen(false)}
      placement={placement}
      distance={distance}
    >
      <ConditionalWrapper
        className={classNames('popover-container', className, { open: !!open })}
        WrapEl={WrapEl}
        {...(WrapEl
          ? {
              onMouseLeave: () =>
                trigger === 'mouse-over' ? setOpen(false) : null,
            }
          : {})}
      >
        <Trigger
          open={open}
          trigger={trigger}
          disabled={!!disabled}
          onTrigger={() => setOpen(!open)}
        >
          {button}
        </Trigger>
        {open && (
          <Content positioning={positioning} arrow={arrow}>
            {typeof children === 'function'
              ? children(() => setOpen(false))
              : children}
          </Content>
        )}
      </ConditionalWrapper>
    </PopoverContextProvider>
  )
}
