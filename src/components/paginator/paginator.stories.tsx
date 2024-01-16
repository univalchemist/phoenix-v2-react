import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useMemo, useState } from 'react'

import { IPaginatorProps } from './types'
import { Paginator } from './paginator'

const meta = {
  title: 'Component/Paginator',
  component: Paginator,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number' } },
    disabled: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'select' },
    },
    pageSize: {
      control: { type: 'number', min: 1 },
    },
    renderOnOnePageCount: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'select' },
    },
    siblingCount: {
      control: { type: 'number' },
    },
    totalItems: {
      control: { type: 'number' },
    },
  },
  args: {
    totalItems: 100,
  },
} satisfies Meta<typeof Paginator>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IPaginatorProps) => {
    const [pageSize, setPageSize] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => setPageSize(props.pageSize ?? 1), [props.pageSize])
    useEffect(() => setCurrentPage(props.currentPage ?? 1), [props.currentPage])

    const allData: string[] = useMemo(
      () =>
        Array.from({ length: props.totalItems }, (_, idx) => idx + 1).map(
          i => `Item ${i}`,
        ),
      [props.totalItems],
    )
    const currentPageData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * (pageSize || 10)
      const lastPageIndex = firstPageIndex + (pageSize || 10)

      return allData.slice(firstPageIndex, lastPageIndex)
    }, [allData, currentPage, pageSize])

    return (
      <div>
        {currentPageData.map(pageData => {
          return <div key={pageData}>{pageData}</div>
        })}
        <Paginator
          {...props}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    )
  },
}
