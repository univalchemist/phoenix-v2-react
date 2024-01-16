import React from 'react'

import { useAdminHome } from '@/hooks'
import SurveyChart from './survey-chart'

const SurveyDayChart: React.FC = () => {
  const { surveyStats } = useAdminHome()

  return <SurveyChart statsData={surveyStats} />
}

export default SurveyDayChart
