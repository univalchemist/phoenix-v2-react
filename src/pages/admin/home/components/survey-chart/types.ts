export interface IVectorChartPosition {
  text: string
  vectorId: string | undefined
  index: number
  total: number
  top: number
  left: number
  bottom: number
  right: number
}

export interface IVectorChartLabelProps {
  position: IVectorChartPosition
}
