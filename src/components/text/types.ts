import { HTMLAttributes } from 'react'

export type TFontFamily =
  | 'extra-bold'
  | 'black'
  | 'bold'
  | 'italic'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semibold'
  | 'thin'
  | 'text-bold'
  | 'text-italic'
  | 'text-light'
  | 'text-medium'
  | 'text-regular'
  | 'text-semibold'

export interface ITextProps extends HTMLAttributes<HTMLElement> {
  font?: TFontFamily
  color?: string
  size?: number
  lineHeight?: number
  fontWeight?: string | number
  ellipsis?: boolean
  noWrap?: boolean
  WrapEl?: React.ElementType<any>
}
