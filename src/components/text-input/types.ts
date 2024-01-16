import { InputHTMLAttributes } from 'react'

import { TIconName } from '@/components/icon'

export interface ITextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  icon?: TIconName
  helper?: string
  error?: string
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void
}
