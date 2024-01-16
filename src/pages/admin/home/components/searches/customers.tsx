import React from 'react'

import { ICustomer } from '@/types'
import { Container, Text } from '@/components'
import { t } from '@/i18n'

interface Props {
  data: ICustomer[]
}

const Customers: React.FC<Props> = ({ data }) => {
  if (!data.length) return null

  return (
    <Container col gap={2} className="w-100 search-result customers">
      <Text
        font="medium"
        fontWeight={500}
        size={12}
        lineHeight={16}
        color="--primary-default"
        className="title"
      >
        {t('adminHomePage.customers')}
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
          <Text
            ellipsis
            font="medium"
            fontWeight={500}
            size={14}
            lineHeight={20}
            color="--primary-dark"
            className="name"
          >
            {datum.companyName}
          </Text>
        </Container>
      ))}
    </Container>
  )
}

export default Customers
