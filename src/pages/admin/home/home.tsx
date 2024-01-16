import React, { useState } from 'react'

import { t } from '@/i18n'
import { AdminHomeContextProvider } from '@/contexts'
import { AdminAppLayout } from '@/layout'
import { Container } from '@/components'
import ProjectForm from '@/pages/admin/projects/components/project-form/project-form'
import CustomerForm from '@/pages/admin/customers/components/customer-form/customer-form'
import Header from './components/header/header'
import SectionWrapper from './components/section-wrapper/section-wrapper'
import SurveyDayChart from './components/survey-chart/survey-day-chart'
import SurveyResponseChart from './components/survey-chart/survey-response-chart'
import Customers from './components/customers/customers'
import './home.scss'

export const AdminHomePage: React.FC = () => {
  const [modal, setModal] = useState<'project' | 'customer' | undefined>()

  return (
    <AdminHomeContextProvider>
      <AdminAppLayout
        className="home-content admin"
        headerEl={
          <Header
            onCreateNewCustomer={() => setModal('customer')}
            onCreateNewProject={() => setModal('project')}
          />
        }
      >
        <Container col gap={24} className="w-100 content-container">
          <Container gap={24} className="w-100">
            <SectionWrapper
              title={t('adminHomePage.surveysPerDay')}
              className="chart-wrapper flex-1"
            >
              <SurveyDayChart />
            </SectionWrapper>
            <SectionWrapper
              title={t('adminHomePage.surveyResponsesPerDay')}
              subtitle={t('adminHomePage.surveyResponsesPerDayDesc')}
              className="chart-wrapper flex-1"
            >
              <SurveyResponseChart />
            </SectionWrapper>
          </Container>
          <Customers />
        </Container>
      </AdminAppLayout>
      <ProjectForm
        isOpen={modal === 'project'}
        onClose={() => setModal(undefined)}
      />
      <CustomerForm
        isOpen={modal === 'customer'}
        onClose={() => setModal(undefined)}
      />
    </AdminHomeContextProvider>
  )
}

export default AdminHomePage
