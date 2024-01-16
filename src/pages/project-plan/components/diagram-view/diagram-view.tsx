import React from 'react'

import { Container } from '@/components'
import { useProjectPlan } from '@/hooks'
import ProjectGoal from './project-goal'
import DevelopmentAreas from './development-areas'
import Goals from './goals'
import ActionList from './action-list'
import './diagram-view.scss'

interface Props {
  onAddNewVector: () => void
  onAddNewGoal: () => void
  onAddNewAction: () => void
}

const DiagramView: React.FC<Props> = ({
  onAddNewVector,
  onAddNewGoal,
  onAddNewAction,
}) => {
  const { viewMode } = useProjectPlan()
  if (viewMode !== 'diagram') return null

  return (
    <Container gap={4} className="w-100 diagram-container">
      <ProjectGoal />
      <DevelopmentAreas onAddNewVector={onAddNewVector} />
      <Goals onAddNewGoal={onAddNewGoal} />
      <ActionList onAddNewAction={onAddNewAction} />
    </Container>
  )
}

export default DiagramView
