import { TFunc } from '@/types'

export interface IPaginatorProps {
  /** (Optional) Define maximum pages to show. Default: `10` */
  pageSize?: number

  /** (Optional) Define whether pagination is disabled or not. Default `false` */
  disabled?: boolean

  /** Define total number of data available from the source. */
  totalItems: number

  /** (Optional) Define current page. Default `1` */
  currentPage?: number

  /** (Optional) Define min number of page buttons to be shown on each side of the current page button. Default: `2` */
  siblingCount?: number

  /** (Optional) Define whether pagination has top border or not. Default `false` */
  hasBorder?: boolean

  /** (Optional) Custom class name */
  className?: string

  /** (Optional) Define whether render Pagination when it is only 1 page. Default `false` */
  renderOnOnePageCount?: boolean

  /** (Optional) Define Next Page Button. Default: `chevron_small_right_m` Icon button */
  nextPageButton?: (_onClick: TFunc) => React.ReactNode

  /** (Optional) Define Previous Page Button. Default: `chevron_small_left_m` Icon button */
  prevPageButton?: (_onClick: TFunc) => React.ReactNode

  /** (Optional) Callback function invoked with the updated page value when the page is changed. */
  onPageChange?: (_page: number) => void
}

export interface IPageJumpButtonProps {
  visible?: boolean
  disabled: boolean
  toNext?: boolean
  defaultBtn?: (_onClick: TFunc) => React.ReactNode
  onClick: TFunc
}

export interface IPageButtonsProps {
  range: (string | number)[]
  currentPage: number
  disabled: boolean
  onPageChange?: (_page: number) => void
}

export interface IPageSelectorProps {
  defaultPageSize: number
  disabled: boolean
  maxPage?: number | string
  onSelectPageSize: (_pageSize: number) => void
  onSelectPage?: (_page: number) => void
}
