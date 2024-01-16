import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Placements } from '@/constants'
import { IDatePickerProps } from './types'
import { DatePicker } from '.'

const meta = {
  title: 'Component/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    value: { control: { type: 'date' } },
    placement: {
      options: Placements,
      control: { type: 'select' },
    },
    positioning: { options: ['absolute', 'fixed'], control: { type: 'radio' } },
    maxDate: { control: { type: 'date' } },
    minDate: { control: { type: 'date' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    required: { options: [true, false], control: { type: 'radio' } },
    disabledDates: { control: { type: false } },
    className: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    format: {
      control: { type: 'text' },
    },
  },
  args: {
    label: 'From (Date)',
    placeholder: 'Select...',
    placement: 'bottom-start',
    disabled: false,
    disabledDates: [new Date('2023/08/29'), new Date('2023/09/03')],
    value: new Date(),
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IDatePickerProps) => {
    const [value, setValue] = useState<Date | undefined>()

    useEffect(() => {
      setValue(props.value)
    }, [props.value])

    return (
      <div className="date-picker-stories">
        <DatePicker
          {...props}
          value={value}
          onChange={(v: Date | undefined) => setValue(v)}
        />
      </div>
    )
  },
}
