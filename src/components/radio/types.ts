import { TFunc } from '@/types'

export interface IRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean
  label?: React.ReactNode
  disabled?: boolean
  className?: string
  onChange?: TFunc
}
