import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '.'
import { IAvatarProps } from './types'

const meta = {
  title: 'Component/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    size: { control: { type: 'number' } },
    imageUrl: { control: { type: 'text' } },
    status: { options: ['active', 'in-active'], control: { type: 'radio' } },
  },
  args: {
    size: 20,
    imageUrl: 'https://picsum.photos/200',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IAvatarProps) => {
    return (
      <div className="avatar-stories">
        <Avatar {...props} />
      </div>
    )
  },
}
