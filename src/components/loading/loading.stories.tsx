import type { Meta, StoryObj } from '@storybook/react'

import { Loading } from '.'
import { ILoadingProps } from './types'

const meta = {
  title: 'Component/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    blur: { options: [true, false], control: { type: 'radio' } },
    loading: { options: [true, false], control: { type: 'radio' } },
  },
  args: {
    loading: true,
  },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ILoadingProps) => (
    <div className="loading-story">
      <span>Background Text</span>
      <Loading {...props} />
    </div>
  ),
}
