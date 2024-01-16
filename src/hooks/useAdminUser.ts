import { useContext } from 'react'

import { AdminUserContext } from '@/contexts'

export const useAdminUser = () => useContext(AdminUserContext)
