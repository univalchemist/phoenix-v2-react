import { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { Breadcrumbs } from '.'
import { IBreadcrumb, IBreadcrumbsProps } from './types'

const meta = {
  title: 'Component/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    breadcrumbs: { control: { type: 'array' } },
  },
  args: {
    breadcrumbs: [
      {
        value: 'project-info',
        label: 'Project Information',
      },
      {
        value: 'project-type',
        label: 'Project Type & Vector',
      },
      {
        value: 'settings',
        label: 'Settings',
      },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IBreadcrumbsProps) => {
    const [items, setItems] = useState<IBreadcrumb[]>(props.breadcrumbs)

    const onClick = useCallback(
      (value: string) => {
        const index = items.findIndex(it => it.value === value)
        if (index > -1) {
          setItems(items.slice(0, index + 1))
        }
      },
      [items],
    )

    return (
      <div className="breadcrumbs-stories">
        <Breadcrumbs {...props} breadcrumbs={items} onClick={onClick} />
        <Button variant="outline" onClick={() => setItems(props.breadcrumbs)}>
          Reset
        </Button>
      </div>
    )
  },
}
