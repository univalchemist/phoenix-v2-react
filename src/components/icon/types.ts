import icons from './icons'

export type TIconName = keyof typeof icons

export interface IIconProps extends React.SVGProps<SVGSVGElement> {
  name?: TIconName
}
