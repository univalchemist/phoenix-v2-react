import { Placement } from '@/types'

export const fileSizeUnits = {
  Bytes: 'Bytes',
  KB: 'KB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB',
  PB: 'PB',
  EB: 'EB',
  ZB: 'ZB',
  YB: 'YB',
  null: 'null',
} as const

export const fileTypeMap = {
  'image/png': 'PNG',
  'image/gif': 'JPG',
  'image/jpeg': 'GIF',
} as const

export const Placements: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'top-center',
  'bottom',
  'bottom-start',
  'bottom-end',
  'bottom-center',
  'right',
  'right-start',
  'right-end',
  'right-center',
  'left',
  'left-start',
  'left-end',
  'left-center',
]
