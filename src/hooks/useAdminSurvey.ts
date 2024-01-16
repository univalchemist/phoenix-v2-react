import { useContext } from 'react'

import { AdminSurveyContext } from '@/contexts'

export const useAdminSurvey = () => useContext(AdminSurveyContext)
