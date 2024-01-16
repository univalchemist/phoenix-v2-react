import React from 'react'
import classNames from 'classnames'

import { Container, Text } from '@/components'
import './section-wrapper.scss'

interface Props {
  title: string
  className?: string
  children: React.ReactNode
}

const SectionWrapper: React.FC<Props> = ({ title, className, children }) => {
  return (
    <Container
      col
      className={classNames('section-wrapper customer', className)}
    >
      <Text font="regular" size={12} lineHeight={20} color="--primary-light">
        {title}
      </Text>
      <div className="section-container">{children}</div>
    </Container>
  )
}

export default SectionWrapper
