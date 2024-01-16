import React from 'react'
import classNames from 'classnames'

import { FormError } from '../form-error'
import { ITextAreaProps } from './types'
import './types'

export const TextArea: React.FC<ITextAreaProps> = ({
  label,
  error,
  className,
  rows = 3,
  onChange,
  ...rest
}) => {
  return (
    <label
      className={classNames('custom-textarea', className, {
        error: !!error,
      })}
    >
      {!!label && (
        <span className="form-label name">
          {label}
          {!!rest.required && <sup>*</sup>}
        </span>
      )}
      <span className="form-field">
        <textarea
          {...rest}
          rows={rows}
          className="custom-input"
          onChange={onChange}
        />
      </span>
      <FormError error={error} />
    </label>
  )
}

export default TextArea
