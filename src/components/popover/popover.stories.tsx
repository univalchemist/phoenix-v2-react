import type { Meta, StoryObj } from '@storybook/react'

import { Placements } from '@/constants'
import { Button, Container } from '@/components'
import { IPopoverProps } from './types'
import { Popover } from '.'

const meta = {
  title: 'Component/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    button: { control: { type: false } },
    className: {
      control: { type: 'text' },
    },
    distance: {
      control: { type: 'number' },
    },
    arrow: { options: [true, false], control: { type: 'radio' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    initialOpen: { options: [true, false], control: { type: 'radio' } },
    trigger: { options: [true, false], control: { type: 'radio' } },
    positioning: { options: ['absolute', 'fixed'], control: { type: 'radio' } },
    placement: {
      options: Placements,
      control: { type: 'select' },
    },
    closeOnOutside: { options: [true, false], control: { type: 'radio' } },
    onOpened: { control: false },
    onClosed: { control: false },
  },
  args: {
    button: <div />,
    arrow: true,
    disabled: false,
    initialOpen: undefined,
    trigger: 'on-click',
    positioning: 'absolute',
    children: null,
    placement: 'bottom-end',
    distance: 0,
    closeOnOutside: true,
    onOpened: () => undefined,
    onClosed: () => undefined,
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IPopoverProps) => {
    return (
      <div className="popover-stories">
        <Popover
          {...props}
          WrapEl="div"
          button={
            <Button variant="outline" iconRight="3-dots">
              More actions
            </Button>
          }
        >
          {onClose => (
            <Container col gap={12} className="menu-container">
              <div className="menu-item">
                <Button
                  variant="pure"
                  size="sm"
                  iconLeft="document-upload"
                  onClick={onClose}
                >
                  Upload
                </Button>
              </div>
              <div className="menu-item">
                <Button
                  variant="pure"
                  size="sm"
                  iconLeft="document-forward"
                  onClick={onClose}
                >
                  Forward
                </Button>
              </div>
            </Container>
          )}
        </Popover>
      </div>
    )
  },
}
