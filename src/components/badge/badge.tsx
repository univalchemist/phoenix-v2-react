import React from 'react'

import { IBadgeProps } from './types'
import './badge.scss'
import classNames from 'classnames'

export const Badge: React.FC<IBadgeProps> = ({
  text,
  variant = 'secondary',
  className,
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={classNames('badge', className, {
        [variant]: !!variant,
      })}
    >
      {text}
    </span>
  )
}

export default Badge
