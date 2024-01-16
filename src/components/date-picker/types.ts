import { DayPickerBase as CalendarProps } from 'react-day-picker'

import { Placement } from '@/types'

export interface IDatePickerProps extends CalendarProps {
  label?: string
  placeholder?: string
  value?: Date | undefined
  placement?: Placement
  positioning?: 'absolute' | 'fixed'
  maxDate?: Date
  minDate?: Date
  disabled?: boolean
  required?: boolean
  disabledDates?: Date[]
  error?: string
  format?: string
  onChange?: (_value: Date | undefined) => void
}
