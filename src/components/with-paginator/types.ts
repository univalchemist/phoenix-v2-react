import { IPaginatorProps } from '../paginator'

export interface IWithPaginatorProps<T>
  extends Omit<
    IPaginatorProps,
    'pageSize' | 'currentPage' | 'onPageSizeChange'
  > {
  /** Define data to show with paginator. */
  data: T[]

  /** (Optional) Define whether data is loading or not. Default: `false` */
  loading?: boolean

  /** (Optional) Define initial page. Default `1` */
  initialPage?: number

  /** (Optional) Define maximum pages to show. Default: `10` */
  initialPageSize?: number

  /** (Optional) Define HTML element for wrapper */
  WrapEl?: React.ElementType

  /** (Optional) Define a component showing when there is no data */
  EmptyDataEl?: React.ReactNode

  /** (Optional) Callback function invoked with the updated meta like page number or page size. */
  onPageMetaChange?: (_page: number, _size: number) => void

  /** Element which renders paged data. e.g. table  */
  children: (_pageData: T[]) => React.ReactNode
}
