import { IContainerProps } from '../container'

export interface IFormGroupProps extends IContainerProps {
  label?: string
  required?: boolean
  error?: string
}
