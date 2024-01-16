import React from 'react'
import { useLocation, Navigate, Location, Outlet } from 'react-router-dom'

import { homePath, signInPath } from '@/utils/index'
import { useAuth } from '@/hooks'

export const CustomerAuthWrapper: React.FC = () => {
  const { me, authenticating } = useAuth()
  const location: Location = useLocation()

  if (authenticating) {
    return null
  }

  if (!me) {
    return (
      <Navigate
        to={signInPath}
        state={{ from: location || homePath }}
        replace
      />
    )
  }

  return <Outlet />
}

export default CustomerAuthWrapper
