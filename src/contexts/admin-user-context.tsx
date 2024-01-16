import React, { useEffect, useState, useMemo } from 'react'

import { IUser } from '@/types'
import { mockUsers } from '@/utils/mock'

interface IAdminUserContext {
  users: IUser[]
}

export const AdminUserContext = React.createContext<IAdminUserContext>(
  {} as IAdminUserContext,
)

export const AdminUserContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([])

  // Mock only
  useEffect(() => {
    if (!users.length) {
      const _users = mockUsers(100)
      setUsers(_users)
    }
  }, [users.length])

  const values: IAdminUserContext = useMemo(
    () => ({
      users,
    }),
    [users],
  )

  return (
    <AdminUserContext.Provider value={values}>
      {children}
    </AdminUserContext.Provider>
  )
}
