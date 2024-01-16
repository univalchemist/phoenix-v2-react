import { useMemo } from 'react'
import classNames from 'classnames'

import { ArgumentType } from '@/types'

import { Popover } from '../popover'
import { Container } from '../container'
import { Icon } from '../icon'
import { FormError } from '../form-error'
import { Text } from '../text'
import { ISelectProps } from './types'
import './select.scss'

export const Select = <T extends ArgumentType>({
  value,
  options,
  disabled,
  onChange,
  className,
  placeholder,
  label,
  error,
  required,
  placement,
  positioning,
  renderOption,
}: ISelectProps<T>) => {
  const [displayLabel, isPlaceholder]: [string | undefined, boolean] =
    useMemo(() => {
      if (value === null || value === undefined) return [placeholder, true]
      const selected = options.find(op => op.value === value)

      return [selected?.label ?? placeholder, !selected?.label]
    }, [options, placeholder, value])

  return (
    <div
      className={classNames('custom-select', className, {
        disabled: !!disabled,
        error: !!error,
      })}
    >
      {!!label && (
        <span className="form-label name">
          {label}
          {!!required && <sup>*</sup>}
        </span>
      )}
      <Popover
        className="select-container"
        WrapEl="div"
        disabled={disabled}
        distance={10}
        placement={placement}
        positioning={positioning}
        button={
          <div
            className={classNames('select-field', {
              placeholder: isPlaceholder,
            })}
          >
            <Text
              ellipsis
              className="flex-1"
              font="medium"
              size={14}
              lineHeight={20}
              fontWeight={isPlaceholder ? 400 : 500}
              color={isPlaceholder ? '--primary-light' : '--primary-default'}
            >
              {displayLabel}
            </Text>
            <Icon name="chevron-down" width={16} height={16} />
          </div>
        }
      >
        {onClose => (
          <Container col className="options-container custom-scrollbar">
            {options.map((option, idx) => {
              if (renderOption) {
                return renderOption(option, onClose, idx)
              }
              return (
                <Text
                  key={idx}
                  className={classNames('option-item hoverable', {
                    active: option.value === value,
                  })}
                  font="regular"
                  size={14}
                  lineHeight={20}
                  color="--primary-dark"
                  onClick={() => {
                    onChange?.(option)
                    onClose()
                  }}
                >
                  {option.label}
                </Text>
              )
            })}
          </Container>
        )}
      </Popover>
      <FormError error={error} />
    </div>
  )
}

export default Select
