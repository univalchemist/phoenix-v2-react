import { HTMLAttributes } from 'react'

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string
  variant?: 'secondary' | 'error' | 'warning' | 'info'
}
