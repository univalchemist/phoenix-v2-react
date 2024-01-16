import React from 'react'

import { IUser } from '@/types'
import { fullName } from '@/utils'
import { Chip } from '../chip'
import { Container } from '../container'
import { Avatar } from '../avatar'
import { Text } from '../text'

interface Props {
  data: IUser[]
  id: string
  onRemove: () => void
}

const UserItem: React.FC<Props> = ({ data, id, onRemove }) => {
  const item = data.find(datum => datum.id === id)
  if (!item) return null

  return (
    <Chip onRemove={onRemove}>
      <Container gap={8} align="center">
        <Avatar size={20} imageUrl={item.profilePicture} />
        <Text font="regular" size={14} lineHeight={20} color="--primary-dark">
          {fullName(item.firstName, item.lastName)}
        </Text>
      </Container>
    </Chip>
  )
}

export default UserItem
