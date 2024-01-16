import React from 'react'
import classNames from 'classnames'
import { Text } from '../text'

import { IStepperProps } from './types'
import './stepper.scss'

export const Stepper: React.FC<IStepperProps> = ({
  steps,
  currentStep,
  className,
  disabled,
  onStep,
}) => {
  const onStepHandle = (_idx: number) => {
    if (_idx > currentStep) {
      const hasRequiredStep = steps
        .slice(currentStep, _idx)
        .some(s => !s.optional)
      if (hasRequiredStep) return
      onStep?.(_idx)
    } else if (_idx < currentStep) {
      onStep?.(_idx)
    }
  }
  return (
    <div
      className={classNames('custom-stepper', className, {
        disabled: !!disabled,
      })}
    >
      <ul>
        {steps.map((step, i) => {
          return (
            <li
              className={classNames({
                done: step.index < currentStep,
                current: currentStep === step.index,
                first: step.index === steps[0].index,
                last: step.index === steps[steps.length - 1].index,
              })}
              key={i}
            >
              <div className="text">
                <Text
                  font="regular"
                  size={14}
                  lineHeight={20}
                  fontWeight={400}
                  color="--primary-default"
                >
                  {step.label}
                </Text>
              </div>
              <div
                className="icon-wrapper"
                onClick={() => onStepHandle(step.index)}
              >
                <div className="indicator" />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Stepper
