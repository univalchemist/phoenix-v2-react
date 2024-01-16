import { InputHTMLAttributes } from 'react'

export interface ISearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  initial?: string
  debounce?: number
  className?: string
  placeholder?: string
  onSearch: (_text: string) => void
}
