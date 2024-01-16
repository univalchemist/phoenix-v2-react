import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { Container } from '../container'
import { Icon } from '../icon'
import { Button } from '../button'
import { IChipProps } from './types'
import './chip.scss'

export const Chip = forwardRef<HTMLDivElement, IChipProps>(
  ({ className, maxWidth, children, onRemove }, ref) => {
    if (!children) return null

    return (
      <Container
        ref={ref}
        className={classNames('chip-container', className)}
        gap={8}
        align="center"
        justify="center"
        style={{ maxWidth }}
      >
        {children}
        <Button variant="pure" onClick={onRemove}>
          <Icon name="close-circle" />
        </Button>
      </Container>
    )
  },
)

export default Chip
