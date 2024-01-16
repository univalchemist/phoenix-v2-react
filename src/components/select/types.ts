import { SelectHTMLAttributes } from 'react'

import { IOption, Placement, TFunc } from '@/types'

export interface ISelectProps<T = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  value?: T
  options: IOption<T>[]
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  placement?: Placement
  positioning?: 'absolute' | 'fixed'
  error?: string
  onChange?: (_item: IOption<T>) => void
  renderOption?: (
    _item: IOption<T>,
    _onClose: TFunc,
    _index?: number,
  ) => React.ReactNode
}
