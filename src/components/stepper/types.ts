export interface IStep {
  index: number
  label: string
  optional?: boolean
}

export interface IStepperProps {
  steps: IStep[]
  currentStep: number
  className?: string
  disabled?: boolean
  onStep?: (_idx: number) => void
}
