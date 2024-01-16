import { useContext } from 'react'

import { AdminProjectContext } from '@/contexts'

export const useAdminProject = () => useContext(AdminProjectContext)
