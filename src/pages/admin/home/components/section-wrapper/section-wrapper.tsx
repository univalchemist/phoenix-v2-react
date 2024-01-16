import React from 'react'
import classNames from 'classnames'

import { Container, Text } from '@/components'
import './section-wrapper.scss'

interface Props {
  title: string
  subtitle?: string
  right?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const SectionWrapper: React.FC<Props> = ({
  title,
  subtitle,
  right,
  className,
  children,
}) => {
  return (
    <Container
      col
      gap={18}
      className={classNames('section-wrapper admin', className)}
    >
      <Container col>
        <Container align="center" justify="space-between">
          <Text
            font="medium"
            size={18}
            lineHeight={24}
            fontWeight={500}
            color="--primary-dark"
          >
            {title}
          </Text>
          {right}
        </Container>
        {!!subtitle && (
          <Text
            font="medium"
            size={14}
            lineHeight={20}
            fontWeight={500}
            color="--primary-light"
          >
            {subtitle}
          </Text>
        )}
      </Container>
      <div className="section-container">{children}</div>
    </Container>
  )
}

export default SectionWrapper
