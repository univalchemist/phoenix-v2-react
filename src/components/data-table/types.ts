import { TSortDir } from '@/types'

export type TSortOption<T> = Record<keyof T, TSortDir | undefined>

export interface ISortableTableHeader<T extends object> {
  key: keyof T
  label: string
  sortable?: boolean
}

export interface ISortableTableAction {
  key: string
  label: string
}

export interface ISortableTableProps<T extends object> {
  className?: string
  data: T[]
  headers: ISortableTableHeader<T>[]
  actions?: ISortableTableAction[]
  showCheck?: boolean
  allSelected?: boolean
  onSelectAll?: (_val: boolean) => void
  WrapEl?: React.ElementType
  children: (_data: T[]) => React.ReactNode
}
