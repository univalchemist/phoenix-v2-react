import type { Meta, StoryObj } from '@storybook/react'

import { ISearchInputProps } from './types'
import { SearchInput } from '.'
import { useCallback, useState } from 'react'

const meta = {
  title: 'Component/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    debounce: { control: { type: 'number' } },
    initial: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    onSearch: { control: false },
  },
  args: {
    placeholder: 'Find Customers',
    onSearch: () => undefined,
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

const customers: string[] = ['Catalog', 'Circooles', 'Hourglass']

export const Primary: Story = {
  render: (props: ISearchInputProps) => {
    const [data, setData] = useState<string[]>(customers)

    const handleFilter = useCallback((text: string) => {
      setData(
        customers.filter(c => c.toLowerCase().includes(text.toLowerCase())),
      )
    }, [])
    return (
      <div className="search-input-stories">
        <SearchInput {...props} onSearch={handleFilter} />
        {data.map(item => (
          <p key={item}>{item}</p>
        ))}
      </div>
    )
  },
}
