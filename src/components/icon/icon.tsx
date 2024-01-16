import React from 'react'
import classNames from 'classnames'

import icons from './icons'
import { type IIconProps } from './types'
import './icon.scss'

export const Icon: React.FC<IIconProps> = ({ name, className, ...rest }) => {
  if (!name) return null

  const IconEl = icons[name] as React.ElementType
  if (!IconEl) return null

  return (
    <span
      className={classNames(`icon-container ic-${name}`, {
        className,
      })}
    >
      <IconEl {...rest} />
    </span>
  )
}

export default Icon
