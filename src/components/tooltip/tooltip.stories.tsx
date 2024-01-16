import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { Tooltip } from '.'
import { ITooltipProps } from './types'

const meta = {
  title: 'Component/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    id: { control: { type: 'text' } },
    clickable: { options: [true, false], control: { type: 'radio' } },
    html: { control: { type: 'text' } },
    placement: {
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      control: { type: 'radio' },
    },
    offset: { control: { type: 'text' } },
    isOpen: { options: [true, false, undefined], control: { type: 'radio' } },
    content: { control: { type: false } },
  },
  args: {
    placement: 'top',
    content: <span className="tooltip-story-content">Select all</span>,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ITooltipProps) => {
    return (
      <div className="tooltip-stories">
        <Tooltip {...props}>
          <Button variant="outline">Hover me</Button>
        </Tooltip>
      </div>
    )
  },
}
