import type { Meta, StoryObj } from '@storybook/react'

import { Placements } from '@/constants'
import { UsersSelector } from './users-selector'
import { IUsersSelectorProps } from './types'
import { mockUsers } from '@/utils/mock'

const meta = {
  title: 'Component/UsersSelector',
  component: UsersSelector,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    type: { options: ['multi', 'single'], control: { type: 'radio' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    required: { options: [true, false], control: { type: 'radio' } },
    className: { control: { type: 'text' } },
    error: { control: { type: 'text' } },
    placement: {
      options: Placements,
      control: { type: 'select' },
    },
    positioning: { options: ['absolute', 'fixed'], control: { type: 'radio' } },
  },
  args: {
    label: 'Assignee',
    placeholder: 'Select',
    value: undefined,
    type: 'multi',
    placement: 'bottom-start',
    positioning: 'fixed',
    data: mockUsers(),
  },
} satisfies Meta<typeof UsersSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  // @ts-ignore
  render: (props: IUsersSelectorProps) => {
    if (props.type === 'multi') {
      return (
        <div className="form-fields select-stories">
          <UsersSelector<'multi'>
            {...props}
            onChange={_v => console.log({ _v })}
          />
        </div>
      )
    }
    return (
      <div className="form-fields select-stories">
        <UsersSelector<'single'>
          {...props}
          onChange={_v => console.log({ _v })}
        />
      </div>
    )
  },
}
