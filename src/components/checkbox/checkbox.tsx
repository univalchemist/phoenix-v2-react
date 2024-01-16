import React from 'react'
import classNames from 'classnames'

import { Icon } from '../icon'
import { ICheckboxProps } from './types'
import './checkbox.scss'

export const Checkbox: React.FC<ICheckboxProps> = ({
  checked,
  label,
  onChange,
  disabled,
  className = 'w-100',
  ...rest
}) => {
  return (
    <label
      className={classNames('custom-checkbox', className, {
        disabled: !!disabled,
      })}
    >
      <input
        type="checkbox"
        className="custom-input"
        checked={checked}
        onChange={() => onChange?.(!checked)}
        disabled={disabled}
        {...rest}
      />
      <span>
        <Icon name="check" width={14} height={14} />
        {label}
      </span>
    </label>
  )
}

export default Checkbox
