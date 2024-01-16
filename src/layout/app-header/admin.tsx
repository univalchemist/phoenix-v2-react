import React from 'react'

import { Container } from '@/components'
import './app-header.scss'

interface Props {
  children?: React.ReactNode
}

export const AdminAppHeader: React.FC<Props> = ({ children }) => {
  return (
    <header className="app-header admin">
      <Container gap={16} align="center" className="nav-wrap">
        <Container align="center" className="header-children">
          {children}
        </Container>
      </Container>
    </header>
  )
}

export default AdminAppHeader
