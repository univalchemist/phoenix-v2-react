import React, { useCallback, useEffect, useState, useMemo } from 'react'

import { ICustomer, IProject, IUser, IVectorStat } from '@/types'
import { formatDateTime } from '@/utils'
import { mockCustomers, mockProjects, mockUsers } from '@/utils/mock'

interface IAdminHomeContext {
  projects: IProject[]
  customers: ICustomer[]
  users: IUser[]
  currentProject: IProject | undefined
  surveyStats: IVectorStat | undefined
  surveyResponseStats: IVectorStat | undefined
  onSelectProject: (_id: string) => void
  onUpdateProject: (_id: string, _data: Partial<IProject>) => void
}

export const AdminHomeContext = React.createContext<IAdminHomeContext>(
  {} as IAdminHomeContext,
)

export const AdminHomeContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | undefined>()
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [users, setUsers] = useState<IUser[]>([])

  // Mock only
  useEffect(() => {
    if (!projects.length) {
      const _projects = mockProjects()
      setProjects(_projects)
      setCurrentProjectId(_projects[0].id)
    }
  }, [projects.length])

  // Mock only
  useEffect(() => {
    if (!customers.length) {
      const _customers = mockCustomers()
      setCustomers(_customers)
    }
  }, [customers.length])

  // Mock only
  useEffect(() => {
    if (!users.length) {
      const _users = mockUsers()
      setUsers(_users)
    }
  }, [users.length])

  const currentProject = useMemo(
    () => projects.find(({ id }) => id === currentProjectId),
    [currentProjectId, projects],
  )

  const surveyStats: IVectorStat | undefined = useMemo(() => {
    if (!currentProject) return
    const _surveyStats: IVectorStat = {}

    currentProject.vectors.forEach(v => {
      v.surveys.forEach(s => {
        const label = formatDateTime(s.createdAt, 'YYYY-MM-DD')
        if (!_surveyStats[label]) _surveyStats[label] = 0
        _surveyStats[label] = +_surveyStats[label] + s.value
      })
    })

    return _surveyStats
  }, [currentProject])

  const surveyResponseStats: IVectorStat | undefined = useMemo(() => {
    if (!currentProject) return
    const _surveyStats: IVectorStat = {}

    currentProject.vectors.forEach(v => {
      v.surveys.forEach(s => {
        const label = formatDateTime(s.createdAt, 'YYYY-MM-DD')
        if (!_surveyStats[label]) _surveyStats[label] = 0
        _surveyStats[label] = +_surveyStats[label] + s.respondents
      })
    })

    return _surveyStats
  }, [currentProject])

  const onSelectProject = useCallback((_id: string) => {
    setCurrentProjectId(_id)
  }, [])

  const onUpdateProject = useCallback(
    (id: string, data: Partial<IProject>) => {
      const _projects = projects.map(p => {
        if (p.id === id) {
          return { ...p, ...data }
        }
        return p
      })

      setProjects(_projects)
    },
    [projects],
  )

  const values: IAdminHomeContext = useMemo(
    () => ({
      projects,
      customers,
      users,
      currentProject,
      surveyStats,
      surveyResponseStats,
      onSelectProject,
      onUpdateProject,
    }),
    [
      currentProject,
      onSelectProject,
      onUpdateProject,
      projects,
      customers,
      users,
      surveyStats,
      surveyResponseStats,
    ],
  )

  return (
    <AdminHomeContext.Provider value={values}>
      {children}
    </AdminHomeContext.Provider>
  )
}
