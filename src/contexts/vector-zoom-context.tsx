import React, { useCallback, useEffect, useState, useMemo } from 'react'
import randomColor from 'randomcolor'
import { v4 as uuidv4 } from 'uuid'

import { INewVectorAction, IVector, IVectorAction, IVectorStat } from '@/types'
import { mockUser, mockVectors } from '@/utils/mock'
import { formatDateTime } from '@/utils'

interface IVectorZoomContext {
  vectors: IVector[]
  currentVector: IVector | undefined
  surveyStats: IVectorStat | undefined
  colorMap: Record<string, string>
  chartActiveDot: number
  onSelectVector: (_vector: IVector) => void
  onMarkActionCompleted: (_id: string) => void
  onRemoveAction: (_id: string) => void
  onAddAction: (_params: INewVectorAction) => void
  onSetActiveDot: (_key?: string) => void
}

export const VectorZoomContext = React.createContext<IVectorZoomContext>(
  {} as IVectorZoomContext,
)

export const VectorZoomContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [vectors, setVectors] = useState<IVector[]>([])
  const [colorMap, setColorMap] = useState<Record<string, string>>({})
  const [currentVector, setCurrentVector] = useState<IVector | undefined>()
  const [chartActiveDot, setChartActiveDot] = useState<number>(-1)

  // Mock only
  useEffect(() => {
    if (!vectors.length) {
      const _vectors = mockVectors()
      setVectors(_vectors)
      setCurrentVector(_vectors[0])
    }
  }, [vectors.length])

  useEffect(() => {
    if (!currentVector) {
      setCurrentVector(vectors[0])
    }
  }, [currentVector, vectors])

  const surveyStats: IVectorStat | undefined = useMemo(() => {
    const _surveyStats: IVectorStat = {}
    if (currentVector) {
      let labels: string[] = []
      currentVector.surveys.forEach(s => {
        const label = formatDateTime(s.createdAt, 'YYYY-MM')
        labels.push(label)
        if (!_surveyStats[label]) _surveyStats[label] = 0
        _surveyStats[label] = Math.min(85, +_surveyStats[label] + s.value)
      })

      labels = [...new Set(labels)]
      const _colors = [
        '#A4E860',
        '#B92E8A',
        '#609CE8',
        '#04839E',
        '#57C762',
        '#787CDD',
        '#FC5371',
        '#9E77ED',
        ...randomColor({
          count: labels.length,
          luminosity: 'bright',
          format: 'hex',
        }),
      ]
      const _colorMap: Record<string, string> = {}
      labels.forEach((l, idx) => {
        _colorMap[l] = _colors[idx]
      })

      setColorMap(_colorMap)
    }

    return _surveyStats
  }, [currentVector])

  const onSelectVector = useCallback((_vector: IVector) => {
    setCurrentVector(_vector)
  }, [])

  const onMarkActionCompleted = useCallback(
    (_id: string) => {
      const _actionList = currentVector?.actions.map(a => {
        if (a.id === _id) {
          a.status = 'completed'
        }
        return a
      })

      setCurrentVector(prev =>
        prev ? { ...prev, actions: _actionList || [] } : undefined,
      )
    },
    [currentVector?.actions],
  )

  const onRemoveAction = useCallback(
    (_id: string) => {
      const _actionList = currentVector?.actions.filter(a => a.id !== _id)

      setCurrentVector(prev =>
        prev ? { ...prev, actions: _actionList || [] } : undefined,
      )
    },
    [currentVector?.actions],
  )

  const onAddAction = useCallback(
    (params: INewVectorAction) => {
      const _actionList: IVectorAction[] = [
        {
          id: uuidv4(),
          ...params,
          assignee: mockUser(),
          createdAt: formatDateTime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          updatedAt: formatDateTime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        },
        ...(currentVector?.actions || []),
      ]
      setCurrentVector(prev =>
        prev ? { ...prev, actions: _actionList || [] } : undefined,
      )
    },
    [currentVector?.actions],
  )

  const onSetActiveDot = useCallback(
    (key?: string) => {
      const index = Object.keys(surveyStats).findIndex(k => k === key)
      setChartActiveDot(index)
    },
    [surveyStats],
  )

  const values: IVectorZoomContext = useMemo(
    () => ({
      vectors,
      currentVector,
      surveyStats,
      colorMap,
      chartActiveDot,
      onSelectVector,
      onMarkActionCompleted,
      onRemoveAction,
      onAddAction,
      onSetActiveDot,
    }),
    [
      colorMap,
      currentVector,
      chartActiveDot,
      onMarkActionCompleted,
      onSelectVector,
      onRemoveAction,
      onAddAction,
      onSetActiveDot,
      surveyStats,
      vectors,
    ],
  )

  return (
    <VectorZoomContext.Provider value={values}>
      {children}
    </VectorZoomContext.Provider>
  )
}
