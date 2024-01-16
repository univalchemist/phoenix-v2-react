import React from 'react'

import { type IFormErrorProps } from './types'
import './form-error.scss'

export const FormError: React.FC<IFormErrorProps> = ({ error, ...rest }) => {
  if (!error) return null
  return (
    <span className="form-error warning" {...rest}>
      {error}
    </span>
  )
}
