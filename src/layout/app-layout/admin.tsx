import React from 'react'
import classNames from 'classnames'

import { Container } from '@/components'
import { AdminAppNav } from '../app-nav'
import { AdminAppHeader } from '../app-header'
import './app-layout.scss'

interface Props {
  headerEl?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export const AdminAppLayout: React.FC<Props> = ({
  headerEl,
  className,
  children,
}) => {
  return (
    <Container className="app-root">
      <AdminAppNav />
      <Container col className="flex-1">
        <AdminAppHeader>{headerEl}</AdminAppHeader>
        <div
          className={classNames('content-wrapper custom-scrollbar', className)}
        >
          {children}
        </div>
      </Container>
    </Container>
  )
}
