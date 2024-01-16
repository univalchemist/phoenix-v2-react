import { useContext } from 'react'

import { AdminAuthContext } from '@/contexts'

export const useAdminAuth = () => useContext(AdminAuthContext)
