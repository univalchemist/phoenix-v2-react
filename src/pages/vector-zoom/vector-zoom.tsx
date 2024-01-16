import React from 'react'

import { t } from '@/i18n'
import { VectorZoomContextProvider } from '@/contexts'
import { Container } from '@/components'
import { CustomerAppLayout } from '@/layout'
import Header from './components/header/header'
import SectionWrapper from './components/section-wrapper/section-wrapper'
import SurveyChart from './components/survey-chart/survey-chart'
import Surveys from './components/surveys/surveys'
import ActionList from './components/action-list/action-list'

import './vector-zoom.scss'

export const VectorZoomPage: React.FC = () => {
  return (
    <VectorZoomContextProvider>
      <CustomerAppLayout
        className="vector-zoom-content flex-1"
        headerEl={<Header />}
      >
        <Container col gap={6} className="w-100">
          <Container gap={24} className="w-100">
            <SectionWrapper title={t('vectorZoomPage.surveysPerDay')}>
              <SurveyChart />
            </SectionWrapper>
            <SectionWrapper
              title={t('vectorZoomPage.surveys')}
              className="flex-1"
            >
              <Surveys />
            </SectionWrapper>
          </Container>

          <SectionWrapper
            title={t('vectorZoomPage.actionList')}
            className="flex-1 w-100 actions"
          >
            <ActionList />
          </SectionWrapper>
        </Container>
      </CustomerAppLayout>
    </VectorZoomContextProvider>
  )
}

export default VectorZoomPage
