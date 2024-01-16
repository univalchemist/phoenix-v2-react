import type { Meta, StoryObj } from '@storybook/react'

import { useCopy } from '@/hooks'
import icons from './icons'
import { IIconProps, TIconName } from './types'
import { Icon } from '.'

const meta = {
  title: 'Component/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: 'text' } },
  },
  args: {
    name: 'home',
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IIconProps) => {
    return <Icon {...props} />
  },
}

export const Examples: Story = {
  render: () => {
    const { copy } = useCopy()

    const onClickIcon = (icon: string) => {
      const text = `<Icon name="${icon}" />`
      copy(text)
    }
    return (
      <div className="icons-list">
        {Object.entries(icons).map(([icon]) => (
          <div
            key={icon}
            className="icon-item"
            title={icon}
            onClick={() => onClickIcon(icon)}
          >
            <Icon name={icon as TIconName} key={icon} />
          </div>
        ))}
      </div>
    )
  },
}
