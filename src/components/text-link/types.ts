import { AnchorHTMLAttributes } from 'react'

export interface ITextLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean
}
