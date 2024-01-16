import { useMemo } from 'react'

interface IUsePagination {
  totalItems: number
  pageSize: number
  siblingCount: number
  currentPage: number
  breakLabel?: string
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  /**
   * Create an array of certain length and set the elements within it from start value to end value.
   */
  return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
  totalItems,
  pageSize,
  siblingCount,
  currentPage,
  breakLabel = '...',
}: IUsePagination): (string | number)[] => {
  const paginationRange: (string | number)[] = useMemo(() => {
    if (currentPage === 0) return []

    let result: (string | number)[] = []

    const totalPageCount = Math.ceil(totalItems / (pageSize || 1))

    /**
     * Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2 * DOTS
     */
    const totalPageNumbers = siblingCount + 5

    /**
     * Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
     */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    )

    /**
     * We do not show dots just when there is just one page number to be inserted
     * between the extremes of sibling and the page limits i.e 1 and totalPageCount.
     * Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
     */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /**
     * Case 1:
     * If the number of pages is less than the page numbers we want to show in our paginationComponent, we return the range [1..totalPageCount]
     */
    if (totalPageNumbers >= totalPageCount) {
      result = range(1, totalPageCount)
    } else if (!shouldShowLeftDots && shouldShowRightDots) {
      /**
       * Case 2: No left dots to show, but rights dots to be shown
       */
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      result = [...leftRange, breakLabel, totalPageCount]
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      /**
       * Case 3: No right dots to show, but left dots to be shown
       */
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      )
      result = [firstPageIndex, breakLabel, ...rightRange]
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      /**
       * Case 4: Both left and right dots to be shown
       */
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      result = [
        firstPageIndex,
        breakLabel,
        ...middleRange,
        breakLabel,
        lastPageIndex,
      ]
    }

    return result
  }, [totalItems, pageSize, siblingCount, currentPage, breakLabel])

  return paginationRange
}

export default usePagination
