import React, { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'
import classNames from 'classnames'

import { usePagination } from '@/hooks'

import PageJumpButton from './page-jump-button'
import PageButtons from './page-buttons'
import { IPaginatorProps } from './types'
import './paginator.scss'

export const Paginator: React.FC<IPaginatorProps> = ({
  currentPage = 1,
  disabled = false,
  pageSize = 10,
  renderOnOnePageCount = false,
  siblingCount = 2,
  totalItems,
  className,
  hasBorder = false,
  nextPageButton,
  prevPageButton,
  onPageChange,
}) => {
  const [perPage, setPerPage] = useState(1)

  useEffect(() => setPerPage(pageSize), [pageSize])

  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    pageSize: perPage,
  })

  const totalPages = useMemo(
    () => Math.ceil(totalItems / (perPage || 1)),
    [perPage, totalItems],
  )

  const lastPage = useMemo(
    () =>
      paginationRange.length > 1
        ? paginationRange[paginationRange.length - 1]
        : totalPages,
    [paginationRange, totalPages],
  )
  const onNext = useCallback(() => {
    if (onPageChange) onPageChange(Math.min(currentPage + 1, totalPages))
  }, [currentPage, onPageChange, totalPages])

  const onPrevious = useCallback(() => {
    if (onPageChange) onPageChange(Math.max(currentPage - 1, 1))
  }, [currentPage, onPageChange])

  if (!paginationRange.length) return null
  if (paginationRange.length < 2 && !renderOnOnePageCount) return null

  return (
    <div
      className={classNames('pagination-container', {
        'no-border': !hasBorder,
        [className || '']: !!className,
      })}
    >
      <PageJumpButton
        toNext={false}
        visible={currentPage > 1}
        disabled={currentPage === 1 || disabled}
        defaultBtn={prevPageButton}
        onClick={onPrevious}
      />
      <ul>
        <PageButtons
          range={paginationRange}
          currentPage={currentPage}
          disabled={disabled}
          onPageChange={onPageChange}
        />
      </ul>
      <PageJumpButton
        toNext
        visible={currentPage < +lastPage}
        disabled={disabled}
        defaultBtn={nextPageButton}
        onClick={onNext}
      />
    </div>
  )
}

export default Paginator
