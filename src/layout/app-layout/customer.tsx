import React from 'react'
import classNames from 'classnames'

import { Container } from '@/components'
import { CustomerAppNav } from '../app-nav'
import { CustomerAppHeader } from '../app-header'
import './app-layout.scss'

interface Props {
  headerEl?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export const CustomerAppLayout: React.FC<Props> = ({
  headerEl,
  className,
  children,
}) => {
  return (
    <Container className="app-root">
      <CustomerAppNav />
      <Container col className="flex-1">
        <CustomerAppHeader>{headerEl}</CustomerAppHeader>
        <div
          className={classNames('content-wrapper custom-scrollbar', className)}
        >
          {children}
        </div>
      </Container>
    </Container>
  )
}
