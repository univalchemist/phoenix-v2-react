import React from 'react'

import { Container } from '@/components'

interface Props {
  children: React.ReactNode
}

const ElementsWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Container
      col
      reversed
      gap={4}
      className="elements-wrapper custom-scrollbar"
    >
      {children}
    </Container>
  )
}

export default ElementsWrapper
