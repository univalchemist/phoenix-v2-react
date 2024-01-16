import React, { useState } from 'react'

import { AdminUserContextProvider } from '@/contexts'
import { AdminAppLayout } from '@/layout'
import { IUser } from '@/types'
import Header from './components/header/header'
import UsersList from './components/users-list/users-list'
import UserDetail from './components/user-detail/user-detail'
import './users.scss'

export const AdminUsersPage: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [user, setUser] = useState<IUser | undefined>()

  return (
    <AdminUserContextProvider>
      <AdminAppLayout
        className="users-content admin"
        headerEl={<Header onSearch={setSearch} />}
      >
        <UsersList search={search} onClick={u => setUser(u)} />
        <UserDetail user={user} onClose={() => setUser(undefined)} />
      </AdminAppLayout>
    </AdminUserContextProvider>
  )
}

export default AdminUsersPage
