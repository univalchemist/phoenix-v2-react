import React, { useEffect, useState, useMemo } from 'react'

import { IProject } from '@/types'
import { mockProjects } from '@/utils/mock'

interface IAdminProjectContext {
  projects: IProject[]
}

export const AdminProjectContext = React.createContext<IAdminProjectContext>(
  {} as IAdminProjectContext,
)

export const AdminProjectContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [projects, setProjects] = useState<IProject[]>([])

  // Mock only
  useEffect(() => {
    if (!projects.length) {
      const _projects = mockProjects()
      setProjects(_projects)
    }
  }, [projects.length])

  const values: IAdminProjectContext = useMemo(
    () => ({
      projects,
    }),
    [projects],
  )

  return (
    <AdminProjectContext.Provider value={values}>
      {children}
    </AdminProjectContext.Provider>
  )
}
