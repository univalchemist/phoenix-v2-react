import { PlacesType } from 'react-tooltip'

export interface ITooltipProps {
  id?: string
  clickable?: boolean
  html?: string
  placement?: PlacesType
  offset?: number
  isOpen?: boolean
  children?: React.ReactElement
  content: React.ReactNode
}
