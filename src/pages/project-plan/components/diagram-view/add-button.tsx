import React from 'react'

import { Button, Container, Text } from '@/components'
import { TFunc } from '@/types'

interface Props {
  text: string
  onClick: TFunc
}

const AddButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <Container align="center" justify="center" className="diagram-add-button">
      <Button variant="pure" iconLeft="add-o-green" onClick={onClick}>
        <Text
          font="medium"
          size={16}
          fontWeight={500}
          lineHeight={20}
          color="--green-light"
        >
          {text}
        </Text>
      </Button>
    </Container>
  )
}

export default AddButton
