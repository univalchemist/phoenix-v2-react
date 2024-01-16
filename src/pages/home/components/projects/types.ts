import { IProject } from '@/types'

export interface IProjectItemProps {
  className?: string
  project?: IProject
  onClick?: () => void
}
