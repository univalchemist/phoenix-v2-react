import React from 'react'

import { IUser } from '@/types'
import { Container, Text } from '@/components'
import { t } from '@/i18n'
import { fullName } from '@/utils'

interface Props {
  data: IUser[]
}

const Users: React.FC<Props> = ({ data }) => {
  if (!data.length) return null

  return (
    <Container col gap={2} className="w-100 search-result users">
      <Text
        font="medium"
        fontWeight={500}
        size={12}
        lineHeight={16}
        color="--primary-default"
        className="title"
      >
        {t('adminHomePage.users')}
      </Text>
      {data.map(datum => (
        <Container
          key={datum.id}
          align="center"
          gap={12}
          className="w-100 search-result-item"
        >
          {!!datum.profilePicture && (
            <img src={datum.profilePicture} alt="Customer image" />
          )}
          <Container col gap={4}>
            <Text
              ellipsis
              font="medium"
              fontWeight={500}
              size={14}
              lineHeight={20}
              color="--primary-dark"
              className="name"
            >
              {fullName(datum.firstName, datum.lastName)}
            </Text>
            <Text
              ellipsis
              font="regular"
              fontWeight={400}
              size={14}
              lineHeight={20}
              color="--primary-light"
              className="subtitle"
            >
              {datum.email}
            </Text>
          </Container>
        </Container>
      ))}
    </Container>
  )
}

export default Users
