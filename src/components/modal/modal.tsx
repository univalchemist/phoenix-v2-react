import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import { useWait } from '@/hooks'
import { Button } from '../button'
import { Text } from '../text'
import { Icon } from '../icon'
import { type IModalProps } from './types'
import './modal.scss'

export const Modal: React.FC<IModalProps> = ({
  isOpen,
  header,
  subTitle,
  footer,
  children,
  onOpened,
  onClosed,
  onClose,
  className,
  closeOnBackdrop = true,
  showCloseButton = true,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(!!isOpen)

  useWait(
    () => {
      setVisible(!!isOpen)
      if (isOpen) {
        onOpened?.()
      }
    },
    isOpen ? 0 : 200,
  )

  useWait(
    () => {
      setOpen(!!isOpen)
      if (!isOpen) {
        onClosed?.()
      }
    },
    isOpen ? 200 : 0,
  )

  useEffect(() => {
    if (open) {
      document.body.classList.add('scroll-lock')
    } else {
      document.body.classList.remove('scroll-lock')
    }
  }, [open])

  if (!visible) return null

  return createPortal(
    <div className={classNames('modal-wrap', className, { open })}>
      <div
        onClick={closeOnBackdrop ? onClose : undefined}
        className="overlay"
      />
      {visible && (
        <div className="modal-content">
          {(!!header || showCloseButton) && (
            <div className="modal-header">
              <div className="title-container">
                {typeof header === 'string' ? (
                  <Text
                    className="modal-title"
                    font="medium"
                    fontWeight={500}
                    color="--primary-dark"
                    size={18}
                    lineHeight={24}
                    WrapEl="h3"
                  >
                    {header}
                  </Text>
                ) : (
                  header
                )}
                {!!subTitle && (
                  <Text
                    className="modal-subtitle"
                    font="regular"
                    color="--primary-light"
                    size={14}
                    lineHeight={20}
                    fontWeight={400}
                    WrapEl="span"
                  >
                    {subTitle}
                  </Text>
                )}
              </div>
              {showCloseButton && (
                <Button
                  className="modal-close"
                  variant="pure"
                  onClick={onClose}
                >
                  <Icon name="x-close" width={24} height={24} />
                </Button>
              )}
            </div>
          )}

          <div className="modal-body custom-scrollbar">{children}</div>

          {!!footer && <div className="modal-footer">{footer}</div>}
        </div>
      )}
    </div>,
    document.getElementById('portal-root')!,
  )
}

export default Modal
