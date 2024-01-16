import React from 'react'

import { t } from '@/i18n'
import { Container } from '../container'
import { Text } from '../text'
import { Icon } from '../icon'
import { IPercentageChangeProps } from './types'
import './percentage-change.scss'
import classNames from 'classnames'

export const PercentageChange: React.FC<IPercentageChangeProps> = ({
  className,
  value,
}) => {
  if (!value) return null

  return (
    <Container
      align="center"
      gap={2}
      className={classNames('percentage-change-container', className)}
    >
      <Icon name={value > 0 ? 'arrow-up-green' : 'arrow-down-red'} />
      <Text
        font="regular"
        size={14}
        lineHeight={20}
        color={value > 0 ? '--green-light' : '--pink-default'}
      >
        {t('percentageWithValue', { value })}
      </Text>
    </Container>
  )
}

export default PercentageChange
