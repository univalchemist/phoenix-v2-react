import { SelectHTMLAttributes } from 'react'
import { IUser, Placement } from '@/types'

export interface IUsersSelectorProps<T extends 'multi' | 'single'>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  data: IUser[]
  type?: 'multi' | 'single'
  value?: T extends 'multi' ? string[] : string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  placement?: Placement
  positioning?: 'absolute' | 'fixed'
  error?: string
  onChange: (
    _value: (T extends 'multi' ? string[] : string) | undefined,
  ) => void
}
