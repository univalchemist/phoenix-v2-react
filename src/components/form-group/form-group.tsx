import React from 'react'
import classNames from 'classnames'

import { Container } from '../container'
import { FormError } from '../form-error'
import { IFormGroupProps } from './types'

export const FormGroup: React.FC<IFormGroupProps> = ({
  label,
  required,
  className,
  error,
  children,
  ...rest
}) => {
  return (
    <Container col className={classNames('form-group', className)}>
      {!!label && (
        <span className="form-label name">
          {label}
          {!!required && <sup>*</sup>}
        </span>
      )}
      <Container {...rest}>{children}</Container>
      <FormError error={error} />
    </Container>
  )
}

export default FormGroup
