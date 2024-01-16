import React from 'react'

import { useAdminHome } from '@/hooks'
import SurveyChart from './survey-chart'

const SurveyResponseChart: React.FC = () => {
  const { surveyResponseStats } = useAdminHome()

  return <SurveyChart statsData={surveyResponseStats} />
}

export default SurveyResponseChart
