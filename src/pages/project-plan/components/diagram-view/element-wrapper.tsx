import React from 'react'
import classNames from 'classnames'

import { Container } from '@/components'

interface Props {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

const ElementWrapper: React.FC<Props> = ({ className, children, onClick }) => {
  return (
    <Container
      col
      align="center"
      justify="center"
      gap={4}
      className={classNames('element-wrapper', className)}
      onClick={onClick}
    >
      {children}
    </Container>
  )
}

export default ElementWrapper
