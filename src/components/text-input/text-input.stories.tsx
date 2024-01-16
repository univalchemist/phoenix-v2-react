import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from '.'
import { ITextInputProps } from './types'

const meta = {
  title: 'Component/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    label: { defaultValue: 'Name:', control: { type: 'text' } },
    icon: { control: { type: 'text' } },
    className: { defaultValue: 'w-100', control: { type: 'text' } },
    helper: { control: { type: 'text' } },
    error: { control: { type: 'text' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    required: { options: [true, false], control: { type: 'radio' } },
    placeholder: { control: { type: 'text' } },
    onChange: { control: false },
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ITextInputProps) => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="form-fields">
        <TextInput
          {...props}
          value={value}
          onChange={_e => setValue(_e.currentTarget.value)}
        />
      </div>
    )
  },
}

export const Password: Story = {
  render: (props: ITextInputProps) => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="form-fields">
        <TextInput
          {...props}
          type="password"
          value={value}
          onChange={_e => setValue(_e.currentTarget.value)}
        />
      </div>
    )
  },
}
