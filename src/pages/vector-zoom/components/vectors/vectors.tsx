import React from 'react'

import { useVectorZoom } from '@/hooks'
import { Container, Icon, Popover, Text } from '@/components'
import VectorItem from './vector'
import './vectors.scss'

const Vectors: React.FC = () => {
  const { vectors, currentVector, onSelectVector } = useVectorZoom()
  if (!currentVector) return null

  return (
    <Popover
      placement="bottom-start"
      WrapEl="div"
      className="vectors-wrapper"
      button={
        <Container gap={12} align="center" className="vector-item-container">
          <Text
            font="semibold"
            size={20}
            lineHeight={24}
            color="--primary-dark"
          >
            {currentVector.name}
          </Text>
          <Icon name="chevron-down" />
        </Container>
      }
    >
      {onClose => (
        <Container col className="vectors-container custom-scrollbar">
          {vectors.map(vector => (
            <VectorItem
              key={vector.id}
              className="select-item hoverable"
              vector={vector}
              onClick={() => {
                onClose()
                onSelectVector(vector)
              }}
            />
          ))}
        </Container>
      )}
    </Popover>
  )
}

export default Vectors
