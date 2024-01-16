import React from 'react'

import { t } from '@/i18n'
import { useVectorZoom } from '@/hooks'
import { Container, Text } from '@/components'
import { formatDateTime, getStatusLabel } from '@/utils'
import Vectors from '../vectors/vectors'

export const Header: React.FC = () => {
  const { currentVector } = useVectorZoom()

  if (!currentVector) return null

  return (
    <Container col gap={8} className="w-100 vector-zoom-header">
      <Vectors />
      <Container gap={24} align="center">
        <Container align="center" gap={4}>
          <Text font="medium" size={12} color="--primary-light">
            {t('vectorZoomPage.project')}
          </Text>
          <Text font="regular" size={12} color="--blue-default">
            Employee Satisfaction
          </Text>
        </Container>
        <Container align="center" gap={4}>
          <Text font="medium" size={12} color="--primary-light">
            {t('vectorZoomPage.createdOn')}
          </Text>
          <Text font="regular" size={12} color="--primary-default">
            {formatDateTime(currentVector.createdAt, 'MMM. DD, 2023')}
          </Text>
        </Container>
        <Container align="center" gap={4}>
          <Text font="medium" size={12} color="--primary-light">
            {t('vectorZoomPage.status')}
          </Text>
          <Text font="regular" size={12} color="--green-light">
            {getStatusLabel(currentVector.status)}
          </Text>
        </Container>
      </Container>
    </Container>
  )
}

export default Header
