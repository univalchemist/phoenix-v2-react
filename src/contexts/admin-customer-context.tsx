import React, { useEffect, useState, useMemo } from 'react'

import { ICustomer, IProject } from '@/types'
import { mockCustomers, mockProjects } from '@/utils/mock'

interface IAdminCustomerContext {
  projects: IProject[]
  customers: ICustomer[]
}

export const AdminCustomerContext = React.createContext<IAdminCustomerContext>(
  {} as IAdminCustomerContext,
)

export const AdminCustomerContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [customers, setCustomers] = useState<ICustomer[]>([])

  // Mock only
  useEffect(() => {
    if (!projects.length) {
      const _projects = mockProjects()
      setProjects(_projects)
    }
  }, [projects.length])

  // Mock only
  useEffect(() => {
    if (!customers.length) {
      const _customers = mockCustomers()
      setCustomers(_customers)
    }
  }, [customers.length])

  const values: IAdminCustomerContext = useMemo(
    () => ({
      projects,
      customers,
    }),
    [projects, customers],
  )

  return (
    <AdminCustomerContext.Provider value={values}>
      {children}
    </AdminCustomerContext.Provider>
  )
}
