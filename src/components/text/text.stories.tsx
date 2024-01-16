import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '.'
import { ITextProps } from './types'

const meta = {
  title: 'Component/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    font: { control: { type: 'text' } },
    color: { control: { type: 'text' } },
    size: { control: { type: 'number' } },
    lineHeight: { control: { type: 'number' } },
    fontWeight: { control: { type: 'text' } },
    ellipsis: { options: [true, false], control: { type: 'radio' } },
    noWrap: { options: [true, false], control: { type: 'radio' } },
    className: { control: { type: 'text' } },
    WrapEl: { control: { type: 'text' } },
  },
  args: {
    color: '--primary-dark',
    size: 16,
    ellipsis: false,
    WrapEl: 'span',
    children: 'Sample text',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ITextProps) => {
    return (
      <div className="text-stories">
        <Text {...props} />
      </div>
    )
  },
}
