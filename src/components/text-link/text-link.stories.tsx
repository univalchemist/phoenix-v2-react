import type { Meta, StoryObj } from '@storybook/react'

import { TextLink } from '.'
import { ITextLinkProps } from './types'

const meta = {
  title: 'Component/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  argTypes: {
    children: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    href: { control: { type: 'text' } },
  },
  args: {
    children: 'Forgot password?',
  },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ITextLinkProps) => {
    return <TextLink {...props}>{props.children}</TextLink>
  },
}
