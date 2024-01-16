import { ForwardedRef } from 'react'

export interface IAccordionProps {
  accordionRef?: ForwardedRef<HTMLDivElement>
  disabled?: boolean
  expanded?: boolean
  preExpanded?: boolean
  title: string
  width?: string | number
  isFormElement?: boolean
  shadowOnExpand?: boolean
  onToggle?: (_expanded: boolean) => void
  children: React.ReactNode
  [x: string]: any
}

export interface IAccordionControl {
  toggle: () => void
}
