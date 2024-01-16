import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Container } from '@/components'
import { useProjectPlan } from '@/hooks'
import './circle-view.scss'

interface Props {
  onAddNewVector: () => void
  onAddNewGoal: () => void
  onAddNewAction: () => void
}

ChartJS.register(ArcElement, Tooltip, Legend)

const CircleView: React.FC<Props> = () => {
  const { viewMode } = useProjectPlan()
  if (viewMode !== 'diagram') return null

  return (
    <Container gap={4} className="w-100 circle-container">
      <div>Circle view</div>
    </Container>
  )
}

export default CircleView
