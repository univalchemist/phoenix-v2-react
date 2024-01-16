import React from 'react'
import { Outlet } from 'react-router-dom'

import { FullScreenLoader } from '@/components'
import { AdminAuthContextProvider } from '@/contexts'
import { useAuth } from '@/hooks'

const AdminTokenWrapper: React.FC = () => {
  const { authenticating, me } = useAuth()

  if (authenticating && !me) {
    return <FullScreenLoader loading />
  }

  return <Outlet />
}

export default () => (
  <AdminAuthContextProvider>
    <AdminTokenWrapper />
  </AdminAuthContextProvider>
)
