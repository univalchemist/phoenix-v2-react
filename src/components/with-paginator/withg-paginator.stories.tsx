import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { faker } from '@faker-js/faker'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { IWithPaginatorProps } from './types'
import { WithPaginator } from '.'
import { Container } from '../container'

interface IDatum {
  id: string
  name: string
  lastModified: string
}

const meta = {
  title: 'Component/WithPaginator',
  component: WithPaginator,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: { type: 'array', min: 1 },
    },
    initialPage: {
      control: { type: 'number', min: 1 },
    },
    initialPageSize: { control: { type: 'number' } },
    loading: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'select' },
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
    WrapEl: { control: { type: 'text' } },
    EmptyDataEl: { control: { type: false } },
  },
  args: {
    data: [],
    totalItems: 100,
    initialPage: 1,
    initialPageSize: 10,
  },
} satisfies Meta<typeof WithPaginator>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  // @ts-ignore
  render: (props: IWithPaginatorProps<IDatum>) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)

    useEffect(() => setLoading(!!props.loading), [props.loading])

    const data: IDatum[] = useMemo(() => {
      const createData = () => ({
        id: uuidv4(),
        name: faker.company.name(),
        lastModified: moment()
          .subtract(faker.number.int({ min: 0, max: 15 }), 'days')
          .add(faker.number.int({ min: 0, max: 10 }), 'hours')
          .format('MMMM D, YYYY'),
      })

      return faker.helpers.multiple(createData, { count: props.totalItems })
    }, [props.totalItems])

    const onPageMetaChange = useCallback((_page: number, _size: number) => {
      setPage(_page)
      setPageSize(_size)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }, [])

    const pageData: IDatum[] = useMemo(() => {
      const firstPageIndex = (page - 1) * (pageSize || 10)
      const lastPageIndex = firstPageIndex + (pageSize || 10)

      return data.slice(firstPageIndex, lastPageIndex)
    }, [data, page, pageSize])

    return (
      <Container col gap={20} className="with-paginator-story">
        <WithPaginator<IDatum>
          {...props}
          data={pageData}
          loading={loading}
          onPageMetaChange={onPageMetaChange}
        >
          {pagedData =>
            pagedData.map(datum => (
              <Container
                key={datum.id}
                className="with-paginator-story-item"
                gap={12}
              >
                <span>{datum.id}</span>
                <span>{datum.name}</span>
                <span>{datum.lastModified}</span>
              </Container>
            ))
          }
        </WithPaginator>
      </Container>
    )
  },
}
