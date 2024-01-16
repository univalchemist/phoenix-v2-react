import type { Meta, StoryObj } from '@storybook/react'

import { IButtonProps } from './types'
import { Button } from '.'

const meta = {
  title: 'Component/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    iconLeft: { control: { type: 'text' } },
    iconRight: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    loading: { options: [true, false], control: { type: 'select' } },
    disabled: { options: [true, false], control: { type: 'select' } },
    size: { options: ['lg', 'md', 'sm'], control: { type: 'select' } },
    variant: {
      options: [
        'primary',
        'outline',
        'pure',
        'hybrid-success',
        'hybrid-error',
        'secondary',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    className: 'main-btn',
    size: 'lg',
    variant: 'primary',
    children: 'Sample button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IButtonProps) => {
    return (
      <div className="btn-box">
        <Button {...props}>{props.children}</Button>
      </div>
    )
  },
}

export const Examples: Story = {
  render: () => {
    return (
      <div className="btn-box">
        <Button iconLeft="document-upload" size="lg" variant="outline">
          Upload
        </Button>
        <Button size="lg" variant="main">
          Save Changes
        </Button>
        <Button iconLeft="add-light" size="lg" variant="primary">
          New Folder
        </Button>
        <Button iconLeft="download" size="md" variant="hybrid-success">
          Download
        </Button>
        <Button iconLeft="trash-red" size="md" variant="hybrid-error">
          Delete
        </Button>
        <Button iconRight="chevron-right" size="md" variant="secondary">
          Open
        </Button>
        <Button iconRight="arrow-right" size="md" variant="pure">
          Next
        </Button>
        <Button iconLeft="close-circle" size="sm" variant="pure">
          Clear all
        </Button>
      </div>
    )
  },
}
