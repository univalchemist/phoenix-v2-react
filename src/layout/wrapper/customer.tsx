import React from 'react'
import { Outlet } from 'react-router-dom'

import { FullScreenLoader } from '@/components'
import { AuthContextProvider } from '@/contexts'
import { useAuth } from '@/hooks'

const CustomerTokenWrapper: React.FC = () => {
  const { authenticating, me } = useAuth()

  if (authenticating && !me) {
    return <FullScreenLoader loading />
  }

  return <Outlet />
}

export default () => (
  <AuthContextProvider>
    <CustomerTokenWrapper />
  </AuthContextProvider>
)
