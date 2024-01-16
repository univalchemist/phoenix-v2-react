import { useEffect, useState } from 'react'

import { Container } from '../container'
import { Paginator } from '../paginator'
import { IWithPaginatorProps } from './types'

export const WithPaginator = <T extends object>({
  data,
  loading,
  initialPageSize,
  initialPage,
  disabled,
  WrapEl,
  EmptyDataEl,
  className,
  onPageMetaChange,
  children,
  ...rest
}: IWithPaginatorProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => setPageSize(initialPageSize ?? 1), [initialPageSize])
  useEffect(() => setCurrentPage(initialPage ?? 1), [initialPage])

  return (
    <Container col WrapEl={WrapEl} className={className}>
      {loading || data.length ? children(data) : EmptyDataEl}
      <Paginator
        {...rest}
        disabled={loading || disabled}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={(_v: number) => {
          setCurrentPage(_v)
          onPageMetaChange?.(_v, pageSize)
        }}
      />
    </Container>
  )
}

export default WithPaginator
