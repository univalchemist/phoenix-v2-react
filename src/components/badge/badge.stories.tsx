import type { Meta, StoryObj } from '@storybook/react'

import Badge from './badge'
import { IBadgeProps } from './types'

const meta = {
  title: 'Component/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    text: { control: { type: 'text' } },
    variant: {
      options: ['secondary', 'error', 'warning', 'info'],
      control: { type: 'select' },
    },
    className: { control: { type: 'text' } },
  },
  args: {
    text: 'High',
    variant: 'info',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IBadgeProps) => {
    return <Badge {...props} />
  },
}
