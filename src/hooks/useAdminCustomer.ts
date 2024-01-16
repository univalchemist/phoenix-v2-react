import { useContext } from 'react'

import { AdminCustomerContext } from '@/contexts'

export const useAdminCustomer = () => useContext(AdminCustomerContext)
