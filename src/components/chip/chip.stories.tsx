import { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { Container } from '../container'
import { Avatar } from '../avatar'
import { Chip } from '.'
import { IChipProps } from './types'

const chips: any[] = [
  {
    id: 1,
    name: 'Tailor',
    image: 'https://picsum.photos/200',
  },
  {
    id: 2,
    name: 'Carlos',
    image: 'https://picsum.photos/200',
  },
  {
    id: 3,
    name: 'Tom MutTomer Jakobovich',
    image: 'https://picsum.photos/200',
  },
]

const meta = {
  title: 'Component/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    maxWidth: { control: { type: 'number' } },
  },
  args: {
    maxWidth: undefined,
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IChipProps) => {
    const [items, setItems] = useState<any[]>(chips)

    const onRemove = useCallback(
      (index: number) => {
        const _items = items.filter((_, idx) => idx !== index)
        setItems(_items)
      },
      [items],
    )

    return (
      <div className="chip-stories">
        <Container gap={8} align="center">
          {items.map((item, idx) => (
            <Chip key={idx} {...props} onRemove={() => onRemove(idx)}>
              <Avatar imageUrl={item.image} />
              <span>{item.name}</span>
            </Chip>
          ))}
        </Container>

        <Button variant="outline" onClick={() => setItems(chips)}>
          Reset
        </Button>
      </div>
    )
  },
}
