import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '.'
import { ITextAreaProps } from './types'

const meta = {
  title: 'Component/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    label: { defaultValue: 'Message', control: { type: 'text' } },
    required: {
      control: { type: 'radio' },
      options: [true, false],
    },
    rows: { control: { type: 'number' } },
    placeholder: { control: { type: 'text' } },
    error: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ITextAreaProps) => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="form-fields">
        <TextArea
          {...props}
          value={value}
          onChange={_e => setValue(_e.currentTarget.value)}
        />
      </div>
    )
  },
}
