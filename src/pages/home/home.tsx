import React, { useState } from 'react'

import { ProjectContextProvider } from '@/contexts'
import { CustomerAppLayout } from '@/layout'
import ProjectForm from '@/pages/admin/projects/components/project-form/project-form'
import Header from './components/header/header'
import VectorChart from './components/vector-chart/vector-chart'
import Surveys from './components/surveys/surveys'
import './home.scss'

export const HomePage: React.FC = () => {
  const [modal, setModal] = useState<'project' | 'survey' | undefined>()

  return (
    <ProjectContextProvider>
      <CustomerAppLayout
        className="home-content customer"
        headerEl={<Header onCreateNewProject={() => setModal('project')} />}
      >
        <VectorChart />
        <div className="surveys-container custom-scrollbar">
          <Surveys category="previous" />
          {/* <Surveys category="upcoming" /> */}
        </div>
      </CustomerAppLayout>
      <ProjectForm
        isOpen={modal === 'project'}
        onClose={() => setModal(undefined)}
      />
    </ProjectContextProvider>
  )
}

export default HomePage
