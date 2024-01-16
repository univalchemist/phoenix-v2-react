import React from 'react'
import { useLocation, Navigate, Location, Outlet } from 'react-router-dom'

import { adminHomePath, signInPath } from '@/utils'
import { useAdminAuth } from '@/hooks'

export const AdminAuthWrapper: React.FC = () => {
  const { me, authenticating } = useAdminAuth()
  const location: Location = useLocation()

  if (authenticating) {
    return null
  }

  if (!me) {
    return (
      <Navigate
        to={signInPath}
        state={{ from: location || adminHomePath }}
        replace
      />
    )
  }

  return <Outlet />
}

export default AdminAuthWrapper
