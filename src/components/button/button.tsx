import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { Icon } from '../icon'
import { IButtonProps } from './types'
import './button.scss'

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      loading,
      disabled,
      iconLeft,
      iconRight,
      className,
      size = 'lg',
      variant = 'primary',
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={classNames('custom-button', className, {
          [size]: !!size,
          [variant]: !!variant,
          disabled: !!disabled,
        })}
        disabled={disabled || loading}
      >
        {!!iconLeft && <Icon name={iconLeft} />}
        {children}
        {!!iconRight && <Icon name={iconRight} />}
        {/* {loading && <Icon name="loading" />} */}
      </button>
    )
  },
)

export default Button
