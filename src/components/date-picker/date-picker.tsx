import React, { useMemo } from 'react'
import { DayPicker } from 'react-day-picker'
import classNames from 'classnames'

import { formatDateTime, isDisableDate } from '@/utils'
import { Icon } from '../icon'
import { Popover } from '../popover'
import { FormError } from '../form-error'
import { Text } from '../text'
import { PickerClasses } from './constants'
import { IDatePickerProps } from './types'
import 'react-day-picker/dist/style.css'
import './date-picker.scss'

export const DatePicker: React.FC<IDatePickerProps> = ({
  label,
  className,
  placeholder,
  placement = 'bottom-center',
  positioning,
  value,
  maxDate,
  minDate,
  disabled,
  required,
  error,
  disabledDates,
  format = 'D MMM YYYY',
  onChange,
  ...rest
}) => {
  const [displayLabel, isPlaceholder]: [string | undefined, boolean] =
    useMemo(() => {
      if (!value) return [placeholder, true]

      return [formatDateTime(value, format || 'D MMM YYYY'), false]
    }, [format, placeholder, value])

  return (
    <div
      className={classNames('custom-date-picker', className, {
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
        closeOnOutside
        className="date-picker-container"
        placement={placement}
        positioning={positioning}
        disabled={disabled}
        WrapEl="div"
        distance={10}
        button={
          <div
            className={classNames('date-picker-field', {
              placeholder: isPlaceholder,
            })}
          >
            <Icon name="calendar" width={20} height={20} />
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
          </div>
        }
      >
        {onClose => (
          <div className="date-picker-panel">
            <DayPicker
              {...rest}
              showOutsideDays
              mode="single"
              defaultMonth={value ?? new Date()}
              selected={value}
              onSelect={(val: Date | undefined) => {
                onChange?.(val)
                onClose()
              }}
              numberOfMonths={1}
              disabled={(curDate: Date) =>
                isDisableDate(curDate, disabledDates, maxDate, minDate)
              }
              className="custom-date-picker-container"
              modifiersClassNames={{ today: 'day-today' }}
              classNames={{ ...PickerClasses, ...classNames }}
              // components={{
              //   IconLeft: () => <Icon name="chevron-down" />,
              //   IconRight: () => <Icon name="chevron-right" />,
              // }}
            />
          </div>
        )}
      </Popover>
      <FormError error={error} />
    </div>
  )
}

export default DatePicker
