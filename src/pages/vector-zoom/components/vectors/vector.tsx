import React from 'react'
import { Trans } from 'react-i18next'
import classNames from 'classnames'

import { Container, DateTime, Text } from '@/components'
import { IVectorsProps } from './types'
import './vectors.scss'

const VectorItem: React.FC<IVectorsProps> = ({
  className,
  vector,
  onClick,
}) => {
  return (
    <Container
      col
      gap={6}
      className={classNames('vector-item', className)}
      onClick={onClick}
    >
      <Text
        font="semibold"
        size={20}
        lineHeight={24}
        color="--primary-dark"
        className="vector-title"
      >
        {vector?.name}
      </Text>
      <Container gap={10} align="center" justify="space-between">
        <Trans
          i18nKey="homePage.createdOn"
          components={{
            text: (
              <Text
                font="medium"
                size={12}
                lineHeight={16}
                color="--primary-light"
              />
            ),
            datetime: (
              <DateTime value={vector?.createdAt} format="MMM. DD, YYYY" />
            ),
          }}
        />
      </Container>
    </Container>
  )
}

export default VectorItem
