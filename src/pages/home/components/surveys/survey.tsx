import React from 'react'

import { Button, Container, PercentageChange, Text } from '@/components'
import { ISurveyProps } from './types'

const Survey: React.FC<ISurveyProps> = ({
  data,
  isHidden,
  category,
  onAction,
}) => {
  return (
    <Container col gap={8} className="survey-wrapper">
      <Container gap={6} align="center">
        <div className="survey-dot" style={{ backgroundColor: data.color }} />
        <Text font="regular" size={14} lineHeight={20} color="--primary-light">
          {data.key}
        </Text>
      </Container>
      <Container gap={6} align="center">
        <Text
          font="semibold"
          size={20}
          lineHeight={24}
          color="--primary-default"
        >
          {data.total}
        </Text>
        <PercentageChange value={8} />
        <div className="flex-1" />
        {category === 'previous' ? (
          <Button
            size="sm"
            variant="pure"
            className="survey-action"
            onClick={() => onAction(data.key)}
            iconLeft={isHidden ? 'eye-green-slash' : 'eye-green'}
          />
        ) : (
          <Button
            size="sm"
            variant="pure"
            className="survey-action"
            onClick={() => onAction(data.key)}
            iconLeft="edit-2-green"
          />
        )}
      </Container>
    </Container>
  )
}

export default Survey
