import React, { useEffect, useState, useMemo } from 'react'

import { IVectorSurvey } from '@/types'
import { mockProjectVectorSurveys } from '@/utils/mock'

interface IAdminSurveyContext {
  surveys: IVectorSurvey[]
}

export const AdminSurveyContext = React.createContext<IAdminSurveyContext>(
  {} as IAdminSurveyContext,
)

export const AdminSurveyContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [surveys, setSurveys] = useState<IVectorSurvey[]>([])

  // Mock only
  useEffect(() => {
    if (!surveys.length) {
      const _surveys = mockProjectVectorSurveys(100)
      setSurveys(_surveys)
    }
  }, [surveys.length])

  const values: IAdminSurveyContext = useMemo(
    () => ({
      surveys,
    }),
    [surveys],
  )

  return (
    <AdminSurveyContext.Provider value={values}>
      {children}
    </AdminSurveyContext.Provider>
  )
}
