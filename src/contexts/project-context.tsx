import React, { useCallback, useEffect, useState, useMemo } from 'react'
import randomColor from 'randomcolor'

import { IProject, ISurveyStat, IVector } from '@/types'
import { formatDateTime } from '@/utils'
import { mockProjects } from '@/utils/mock'

interface IProjectContext {
  projects: IProject[]
  currentProject: IProject | undefined
  currentVector: IVector | undefined
  surveyStats: ISurveyStat | undefined
  hiddenSurveyKeys: string[]
  onSelectProject: (_id: string) => void
  onSelectVector: (_id: IVector) => void
  onToggleSurvey: (_surveyKey: string) => void
  onUpdateProject: (_id: string, _data: Partial<IProject>) => void
}

export const ProjectContext = React.createContext<IProjectContext>(
  {} as IProjectContext,
)

export const ProjectContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | undefined>()
  const [currentVector, setCurrentVector] = useState<IVector | undefined>()
  const [hiddenSurveyKeys, setHiddenSurveyKeys] = useState<string[]>([])

  // Mock only
  useEffect(() => {
    if (!projects.length) {
      const _projects = mockProjects()
      setProjects(_projects)
      setCurrentProjectId(_projects[0].id)
    }
  }, [projects.length])

  useEffect(() => {
    if (!colors.length) {
      const randomColors = randomColor({
        count: 30,
        luminosity: 'bright',
        format: 'hex',
      })
      setColors([
        '#A4E860',
        '#B92E8A',
        '#609CE8',
        '#04839E',
        '#57C762',
        '#787CDD',
        '#FC5371',
        '#9E77ED',
        ...randomColors,
      ])
    }
  }, [colors.length])

  const currentProject = useMemo(
    () => projects.find(({ id }) => id === currentProjectId),
    [currentProjectId, projects],
  )

  const surveyStats: ISurveyStat | undefined = useMemo(() => {
    if (!currentProject) return
    const _surveyStats: ISurveyStat = {}

    currentProject.vectors.forEach(v => {
      v.surveys.forEach(s => {
        const label = formatDateTime(s.createdAt, 'DD MMM. YY')
        if (!_surveyStats[label]) _surveyStats[label] = { color: colors[0] }
        if (!_surveyStats[label][v.name]) _surveyStats[label][v.name] = 0
        _surveyStats[label][v.name] = Math.min(
          +_surveyStats[label][v.name] + s.value,
          100,
        )
      })
    })
    Object.keys(_surveyStats).forEach((date, idx) => {
      _surveyStats[date].color =
        colors[idx] || randomColor({ luminosity: 'bright', format: 'hex' })
    })

    return _surveyStats
  }, [colors, currentProject])

  const onSelectProject = useCallback(
    (_id: string) => {
      const _project = projects.find(({ id }) => id === _id)
      setCurrentProjectId(_id)
      setCurrentVector(_project?.vectors?.[0])
    },
    [projects],
  )

  const onSelectVector = useCallback((_vector: IVector) => {
    setCurrentVector(_vector)
  }, [])

  const onToggleSurvey = useCallback(
    (surveyKey: string) => {
      if (hiddenSurveyKeys.includes(surveyKey)) {
        setHiddenSurveyKeys(prev => prev.filter(s => s !== surveyKey))
      } else {
        setHiddenSurveyKeys(prev => [...prev, surveyKey])
      }
    },
    [hiddenSurveyKeys],
  )

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

  const values: IProjectContext = useMemo(
    () => ({
      projects,
      currentProject,
      currentVector,
      surveyStats,
      hiddenSurveyKeys,
      onSelectProject,
      onSelectVector,
      onToggleSurvey,
      onUpdateProject,
    }),
    [
      currentProject,
      currentVector,
      hiddenSurveyKeys,
      onSelectProject,
      onSelectVector,
      onToggleSurvey,
      onUpdateProject,
      projects,
      surveyStats,
    ],
  )

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  )
}
