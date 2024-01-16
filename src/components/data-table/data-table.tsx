import { useState, useMemo, useCallback } from 'react'
import classNames from 'classnames'

import { TSortDir } from '@/types'
import { ConditionalWrapper } from '../wrapper'
import { Icon } from '../icon'
import { Container } from '../container'
import { Checkbox } from '../checkbox'
import { ISortableTableProps, TSortOption } from './types'
import './data-table.scss'

export const DataTable = <T extends object>({
  className,
  data,
  headers,
  actions,
  WrapEl = 'div',
  showCheck,
  allSelected,
  onSelectAll,
  children,
}: ISortableTableProps<T>) => {
  const [sortOptions, setSortOptions] = useState<TSortOption<T>>(
    {} as TSortOption<T>,
  )

  const sortedData = useMemo(() => {
    let _data = [...data]
    headers.forEach(header => {
      const column = header.key
      if (sortOptions[column]) {
        _data = _data.sort((a, b) => {
          const dir = sortOptions[column] === 'asc' ? 1 : -1
          return a[column] > b[column] ? dir : -dir
        })
      }
    })

    return _data
  }, [data, headers, sortOptions])

  const onSort = useCallback(
    (column: keyof T) => {
      const prevData = sortOptions ? { ...sortOptions } : ({} as TSortOption<T>)
      let dir = prevData[column]
      if (!dir) {
        dir = 'asc'
      } else if (dir === 'asc') {
        dir = 'desc'
      } else {
        dir = undefined
      }
      setSortOptions({ ...prevData, [column]: dir })
    },
    [sortOptions],
  )

  const renderSortButton = useCallback((dir: TSortDir | undefined) => {
    return (
      <>
        {
          <Icon
            name="sort-asc"
            height={7}
            width={7}
            style={{
              visibility: !dir || dir === 'desc' ? 'visible' : 'hidden',
            }}
          />
        }
        {
          <Icon
            name="sort-desc"
            height={7}
            width={7}
            style={{
              visibility: !dir || dir === 'asc' ? 'visible' : 'hidden',
            }}
          />
        }
      </>
    )
  }, [])

  return (
    <ConditionalWrapper
      className={classNames('data-table custom-scrollbar', className)}
      WrapEl={WrapEl}
    >
      <table>
        <thead>
          <tr>
            {showCheck && (
              <th>
                <Container align="center" justify="center">
                  <Checkbox checked={allSelected} onChange={onSelectAll} />
                </Container>
              </th>
            )}
            {headers.map(header => (
              <th
                key={header.key.toString()}
                className={classNames({ sortable: header.sortable })}
                onClick={() => (header.sortable ? onSort(header.key) : null)}
              >
                <Container align="center" gap={4} className="table-header">
                  {header.label}
                  {header.sortable && (
                    <Container col gap={0} align="center" justify="center">
                      {renderSortButton(sortOptions[header.key])}
                    </Container>
                  )}
                </Container>
              </th>
            ))}
            {actions?.map(action => (
              <th key={action.key}>
                <Container
                  align="center"
                  justify="flex-end"
                  gap={4}
                  className="table-header"
                >
                  {action.label}
                </Container>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children(sortedData)}</tbody>
      </table>
    </ConditionalWrapper>
  )
}

export default DataTable
