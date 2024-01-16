import React from 'react'

import { Container } from '@/components'
import { NotificationProvider } from '@/contexts'
import Notifications from './components/notifications'
import './app-header.scss'

interface Props {
  children?: React.ReactNode
}

export const CustomerAppHeader: React.FC<Props> = ({ children }) => {
  return (
    <header className="app-header customer">
      <Container gap={16} align="center" className="nav-wrap">
        <Container align="center" className="header-children">
          {children}
        </Container>
        <div className="toolbar">
          <NotificationProvider>
            <Notifications />
          </NotificationProvider>
        </div>
      </Container>
    </header>
  )
}

export default CustomerAppHeader
