import React from 'react'

export interface IModalProps {
  isOpen?: boolean
  header?: React.ReactNode
  subTitle?: React.ReactNode
  footer?: React.ReactNode
  showCloseButton?: boolean
  children: React.ReactNode
  closeOnBackdrop?: boolean
  className?: string
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
}
