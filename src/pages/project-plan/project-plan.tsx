import React, { useState } from 'react'

import { ProjectContextProvider, ProjectPlanContextProvider } from '@/contexts'
import { CustomerAppLayout } from '@/layout'
import Header from './components/header/header'
import DiagramView from './components/diagram-view/diagram-view'
import Modals from './components/modals/modals'

import './project-plan.scss'

export const ProjectPlanPage: React.FC = () => {
  const [modal, setModal] = useState<'vector' | 'goal' | 'action' | null>(null)

  return (
    <ProjectContextProvider>
      <ProjectPlanContextProvider>
        <CustomerAppLayout
          className="project-plan-content"
          headerEl={<Header />}
        >
          <DiagramView
            onAddNewVector={() => setModal('vector')}
            onAddNewGoal={() => setModal('goal')}
            onAddNewAction={() => setModal('action')}
          />
          <Modals modal={modal} onClose={() => setModal(null)} />
        </CustomerAppLayout>
      </ProjectPlanContextProvider>
    </ProjectContextProvider>
  )
}

export default ProjectPlanPage
