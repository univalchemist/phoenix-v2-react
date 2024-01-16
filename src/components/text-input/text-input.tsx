import React from 'react'
import classNames from 'classnames'

import { useToggle } from '@/hooks'
import { FormError } from '../form-error'
import { Icon } from '../icon'
import Text from '../text/text'
import { type ITextInputProps } from './types'
import './text-input.scss'

export const TextInput = React.forwardRef<HTMLInputElement, ITextInputProps>(
  (
    {
      label,
      icon,
      helper,
      error,
      disabled,
      value,
      className = '',
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [passwordVisible, togglePasswordVisibility] = useToggle(false)

    return (
      <label
        className={classNames('custom-text-input', className, {
          error: !!error,
          disabled: !!disabled,
        })}
      >
        {!!label && (
          <span className="form-label name">
            {label}
            {!!rest.required && <sup>*</sup>}
          </span>
        )}
        <span className="form-field">
          {rest.type !== 'password' ? (
            <Icon name={icon} />
          ) : (
            <Icon
              className={passwordVisible ? 'eye-green-slash' : 'eye-green'}
              onClick={() => togglePasswordVisibility()}
              fill="var(--primary-light)"
              name={passwordVisible ? 'eye-green-slash' : 'eye-green'}
            />
          )}
          <input
            {...rest}
            ref={ref}
            value={value ?? ''}
            className="custom-input"
            disabled={disabled}
            onChange={onChange}
            type={passwordVisible ? 'text' : rest.type}
          />
        </span>
        <FormError error={error} />
        {!!helper && (
          <Text
            font="medium"
            fontWeight={500}
            size={14}
            lineHeight={20}
            color="--primary-default"
          >
            {helper}
          </Text>
        )}
      </label>
    )
  },
)

export default TextInput
