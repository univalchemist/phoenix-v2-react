import type { Meta, StoryObj } from '@storybook/react'

import { Container } from '.'
import { IContainerProps } from './types'

const meta = {
  title: 'Component/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    WrapEl: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    col: { options: [true, false], control: { type: 'radio' } },
    reversed: { options: [true, false], control: { type: 'radio' } },
    align: {
      options: [
        'baseline',
        'center',
        'end',
        'flex-end',
        'flex-start',
        'inherit',
        'initial',
        'normal',
        'revert',
        'self-end',
        'self-start',
        'start',
        'stretch',
        'unset',
      ],
      control: { type: 'radio' },
    },
    justify: {
      options: [
        'center',
        'end',
        'flex-end',
        'flex-start',
        'inherit',
        'initial',
        'left',
        'normal',
        'revert',
        'right',
        'space-around',
        'space-between',
        'space-evenly',
        'start',
        'stretch',
        'unset',
      ],
      control: { type: 'radio' },
    },
    gap: { control: { type: 'number', min: 0 } },
  },
  args: {
    WrapEl: 'div',
    children: (
      <>
        <div className="container-story-item">1</div>
        <div className="container-story-item">2</div>
      </>
    ),
    gap: 10,
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IContainerProps) => {
    return (
      <div className="container-stories">
        <Container {...props} />
      </div>
    )
  },
}
