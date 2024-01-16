import type { Meta, StoryObj } from '@storybook/react'

import PercentageChange from './percentage-change'
import { IPercentageChangeProps } from './types'

const meta = {
  title: 'Component/PercentageChange',
  component: PercentageChange,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number' } },
    className: { control: { type: 'text' } },
  },
  args: {
    value: 7.9,
  },
} satisfies Meta<typeof PercentageChange>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IPercentageChangeProps) => {
    return <PercentageChange {...props} />
  },
}
