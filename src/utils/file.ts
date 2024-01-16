import { fileSizeUnits } from '@/constants'
import { FileSizeUnits, IImageSize, TImageError } from '@/types'
import { validateImageSize } from './validation'

export const filterFiles = async (
  _files: FileList | File[] | null,
  _allowedTypes?: string[],
  _size?: IImageSize,
): Promise<
  [
    {
      invalidFiles: File[]
      validFiles: File[]
    },
    TImageError | null,
  ]
> => {
  if (!_files?.length) {
    return [{ invalidFiles: [], validFiles: [] }, null]
  }

  const invalidFiles: File[] = []
  const validFiles: File[] = []
  let error: TImageError | null = null

  for (let i = 0; i < _files.length; i++) {
    if (
      !_allowedTypes ||
      _allowedTypes.includes('*.*') ||
      _allowedTypes.includes(_files[i].type)
    ) {
      const isValidSize = await validateImageSize(_files[i], _size)
      if (isValidSize) {
        validFiles.push(_files[i])
      } else {
        invalidFiles.push(_files[i])
        error = 'invalid-size'
      }
    } else {
      invalidFiles.push(_files[i])
    }
  }

  return [{ invalidFiles, validFiles }, error]
}

export const fileSizeConverter = (
  bytes: number,
  decimals = 0,
  unit: FileSizeUnits = fileSizeUnits.null,
) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i =
    unit === fileSizeUnits.null
      ? Math.floor(Math.log(bytes) / Math.log(k))
      : sizes.indexOf(unit)

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
