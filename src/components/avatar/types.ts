import { TFunc } from '@/types'

export interface IAvatarProps {
  className?: string
  size?: number
  imageUrl?: string
  initials?: Maybe<string>[]
  status?: 'active' | 'in-active'
  onClick?: TFunc
}
