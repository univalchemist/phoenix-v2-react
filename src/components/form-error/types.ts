import { HTMLAttributes } from 'react'

export interface IFormErrorProps extends HTMLAttributes<HTMLSpanElement> {
  error?: string
}
