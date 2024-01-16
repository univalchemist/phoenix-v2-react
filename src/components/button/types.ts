import { ButtonHTMLAttributes } from 'react'
import { TIconName } from '@/components/icon'

export type TButtonSize = 'lg' | 'md' | 'sm'

export type TButtonVariant =
  | 'primary'
  | 'main'
  | 'secondary'
  | 'outline'
  | 'pure'
  | 'hybrid-success'
  | 'hybrid-error'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  iconLeft?: TIconName
  iconRight?: TIconName
  size?: TButtonSize
  variant?: TButtonVariant
}
