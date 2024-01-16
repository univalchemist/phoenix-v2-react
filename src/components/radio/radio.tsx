import React from 'react'
import classNames from 'classnames'

import { Icon } from '../icon'
import { IRadioProps } from './types'
import './radio.scss'

export const Radio: React.FC<IRadioProps> = ({
  checked,
  label,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <label className={classNames('custom-radio', className)}>
      <input
        type="radio"
        className="custom-input"
        checked={checked}
        onChange={() => onChange?.()}
        disabled={disabled}
      />
      <span>
        <Icon name="blue-dot" />
        {label}
      </span>
    </label>
  )
}

export default Radio
