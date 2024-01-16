import { FileAllowedTypes, IImageSize } from '@/types'

export interface IFileUploaderProps {
  label?: string
  required?: boolean
  allowedTypes: FileAllowedTypes[]
  allowedSize?: IImageSize
  onLoad: (_file: File) => void
}

export interface IDropAreaProps {
  allowedTypes: FileAllowedTypes[]
  allowedSize: IImageSize
  error?: boolean
  file: string | null
  onFilesLoaded: (_file: File | null) => void
}

export interface IFileUploadControl {
  remove: () => void
}
