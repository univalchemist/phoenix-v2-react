import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormGroup } from '.'
import { IFormGroupProps } from './types'
import { Radio } from '../radio'

const meta = {
  title: 'Component/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    className: { defaultValue: 'w-100', control: { type: 'text' } },
    col: { options: [true, false], control: { type: 'radio' } },
    gap: { control: { type: 'number', min: 0 } },
    error: { control: { type: 'text' } },
    required: { options: [true, false], control: { type: 'radio' } },
  },
  args: {
    label: 'Is the project linked to a strategic objective in the business?',
    gap: 24,
  },
} satisfies Meta<typeof FormGroup>

export default meta
type Story = StoryObj<IFormGroupProps>

export const Primary: Story = {
  render: (props: IFormGroupProps) => {
    const [value, setValue] = useState<boolean>(false)

    return (
      <div className="form-fields">
        <FormGroup {...props}>
          <Radio label="Yes" checked={value} onChange={() => setValue(true)} />
          <Radio label="No" checked={!value} onChange={() => setValue(false)} />
        </FormGroup>
      </div>
    )
  },
}
