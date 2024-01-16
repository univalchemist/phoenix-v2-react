import type { Meta, StoryObj } from '@storybook/react'
import moment from 'moment'

import DateTime from './datetime'
import { IDateTimeProps } from './types'

const meta = {
  title: 'Component/DateTime',
  component: DateTime,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'text' } },
    format: { control: { type: 'text' } },
    mode: { options: ['diff', 'humanize', null], control: { type: 'radio' } },
    placeholder: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    WrapEl: { control: { type: 'element' } },
  },
  args: {
    value: moment().format('YYYY-MM-DD HH:mm:ss'),
    format: 'YYYY-MM-DD HH:mm:ss',
    mode: null,
  },
} satisfies Meta<typeof DateTime>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IDateTimeProps) => {
    return <DateTime {...props} />
  },
}
