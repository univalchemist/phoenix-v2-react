import React, { useCallback, useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  INewVector,
  INewVectorAction,
  IVector,
  IVectorAction,
  IVectorGoal,
  TProjectPlanViewMode,
} from '@/types'
import { mockUser, mockVectorGoal } from '@/utils/mock'
import { useProject } from '@/hooks'
import moment from 'moment'

interface IProjectPlanContext {
  currentVector: IVector | undefined
  currentGoal: IVectorGoal | undefined
  viewMode: TProjectPlanViewMode
  onSelectVector: (_v: IVector) => void
  onSelectGoal: (_v: IVectorGoal) => void
  onChangeViewMode: (_mode: TProjectPlanViewMode) => void
  onAddVector: (_data: INewVector) => void
  onAddGoal: () => void
  onAddAction: (_data: INewVectorAction) => void
}

export const ProjectPlanContext = React.createContext<IProjectPlanContext>(
  {} as IProjectPlanContext,
)

export const ProjectPlanContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { currentProject, onUpdateProject } = useProject()
  const [currentVector, setCurrentVector] = useState<IVector | undefined>()
  const [currentGoal, setCurrentGoal] = useState<IVectorGoal | undefined>()
  const [viewMode, setViewMode] = useState<TProjectPlanViewMode>('diagram')

  const onSelectVector = useCallback((_vector: IVector) => {
    setCurrentVector(_vector)
  }, [])

  const onSelectGoal = useCallback((_goal: IVectorGoal) => {
    setCurrentGoal(_goal)
  }, [])

  const onChangeViewMode = useCallback((_mode: TProjectPlanViewMode) => {
    setViewMode(_mode)
  }, [])

  const onAddVector = useCallback(
    (data: INewVector) => {
      if (currentProject) {
        const _vector: IVector = {
          ...data,
          id: uuidv4(),
          surveys: [],
          value: 0,
          status: 'pending',
          actions: [],
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

        onUpdateProject(currentProject?.id, {
          vectors: [...currentProject.vectors, _vector],
        })
      }
    },
    [currentProject, onUpdateProject],
  )

  const onAddGoal = useCallback(() => {
    if (currentProject && currentVector) {
      const _goal: IVectorGoal = mockVectorGoal()

      const _vectors = currentProject.vectors.map(v => {
        if (v.id === currentVector.id) {
          v.goal = _goal
        }
        return v
      })

      onUpdateProject(currentProject?.id, {
        vectors: _vectors,
      })
    }
  }, [currentProject, currentVector, onUpdateProject])

  const onAddAction = useCallback(
    (_data: INewVectorAction) => {
      if (currentProject && currentVector) {
        const _action: IVectorAction = {
          ..._data,
          id: uuidv4(),
          assignee: mockUser(),
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

        const _vectors = currentProject.vectors.map(v => {
          if (v.id === currentVector.id) {
            v.actions = [...v.actions, _action]
          }
          return v
        })

        onUpdateProject(currentProject?.id, {
          vectors: _vectors,
        })
      }
    },
    [currentProject, currentVector, onUpdateProject],
  )

  const values: IProjectPlanContext = useMemo(
    () => ({
      currentVector,
      currentGoal,
      viewMode,
      onSelectVector,
      onSelectGoal,
      onChangeViewMode,
      onAddVector,
      onAddGoal,
      onAddAction,
    }),
    [
      currentVector,
      currentGoal,
      viewMode,
      onSelectVector,
      onSelectGoal,
      onChangeViewMode,
      onAddVector,
      onAddGoal,
      onAddAction,
    ],
  )

  return (
    <ProjectPlanContext.Provider value={values}>
      {children}
    </ProjectPlanContext.Provider>
  )
}
