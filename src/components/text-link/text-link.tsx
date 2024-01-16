import React from 'react'
import classNames from 'classnames'

import { type ITextLinkProps } from './types'
import './text-link.scss'

export const TextLink: React.FC<ITextLinkProps> = ({
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <a
      {...rest}
      className={classNames('text-link', className)}
      href={!disabled ? rest.href : undefined}
      onClick={!disabled && !rest.href ? rest.onClick : undefined}
    >
      {children}
    </a>
  )
}

export default TextLink
