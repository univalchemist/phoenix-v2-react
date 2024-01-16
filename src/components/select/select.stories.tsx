import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { IOption } from '@/types'
import { Placements } from '@/constants'
import { Select } from '.'
import { ISelectProps } from './types'

const meta = {
  title: 'Component/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    required: { options: [true, false], control: { type: 'radio' } },
    className: { control: { type: 'text' } },
    error: { control: { type: 'text' } },
    options: { control: { type: 'array' } },
    placement: {
      options: Placements,
      control: { type: 'select' },
    },
    positioning: { options: ['absolute', 'fixed'], control: { type: 'radio' } },
  },
  args: {
    label: 'Language',
    placeholder: 'Select...',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'sp' },
      { label: 'Italian', value: 'it' },
    ],
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<ISelectProps<string>>

export const Primary: Story = {
  render: (props: ISelectProps<string>) => {
    const [data, setData] = useState<IOption<string> | undefined>()

    return (
      <div className="form-fields select-stories">
        <Select<string>
          {...props}
          value={data?.value}
          onChange={val => setData(val)}
        />
      </div>
    )
  },
}

export const WithRenderer: Story = {
  render: (props: ISelectProps<string>) => {
    const [data, setData] = useState<IOption<string> | undefined>()

    return (
      <div className="form-fields select-stories">
        <Select<string>
          {...props}
          value={data?.value}
          onChange={val => setData(val)}
          renderOption={(option, onClose, idx) => (
            <span
              key={idx}
              className="option-item"
              onClick={() => {
                setData(option)
                onClose()
              }}
            >
              {option.label}
            </span>
          )}
        />
      </div>
    )
  },
}
