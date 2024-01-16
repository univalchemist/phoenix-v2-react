import React from 'react'

import { Container, Text } from '@/components'

interface Props {
  text: string
}

const DiagramLabel: React.FC<Props> = ({ text }) => {
  return (
    <Container
      align="center"
      justify="center"
      gap={4}
      className="diagram-label"
    >
      <Text
        font="semibold"
        size={20}
        fontWeight={600}
        lineHeight={24}
        color="--primary-dark"
      >
        {text}
      </Text>
    </Container>
  )
}

export default DiagramLabel
