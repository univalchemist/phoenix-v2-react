import type { Meta, StoryObj } from '@storybook/react'

import { Stepper } from '.'
import { IStepperProps } from './types'
import { useCallback, useEffect, useState } from 'react'
import { Container } from '../container'
import { Button } from '../button'

const meta = {
  title: 'Component/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    steps: { control: { type: 'array' } },
    currentStep: { control: { type: 'number' } },
    className: { control: { type: 'text' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
  },
  args: {
    steps: [
      {
        index: 0,
        label: 'Step 1',
        optional: false,
      },
      {
        index: 1,
        label: 'Step 2',
        optional: false,
      },
      {
        index: 2,
        label: 'Step 3',
        optional: false,
      },
      {
        index: 3,
        label: 'Step 4',
        optional: false,
      },
      {
        index: 4,
        label: 'Step 5',
        optional: false,
      },
    ],
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<IStepperProps>

export const Primary: Story = {
  render: (props: IStepperProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    useEffect(() => {
      setCurrentStep(props.currentStep ?? 0)
    }, [props.currentStep])

    const onNext = useCallback(() => {
      const _next = currentStep + 1
      setCurrentStep(_next % (props.steps.length || 1))
    }, [currentStep, props.steps.length])

    return (
      <Container col align="center" gap={24} className="stepper-stories">
        <Stepper
          {...props}
          currentStep={currentStep}
          onStep={(_idx: number) => setCurrentStep(_idx)}
        />
        <Button variant="main" size="md" onClick={onNext}>
          Next
        </Button>
      </Container>
    )
  },
}
