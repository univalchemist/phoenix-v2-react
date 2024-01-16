import { useContext } from 'react'

import { ProjectPlanContext } from '@/contexts'

export const useProjectPlan = () => useContext(ProjectPlanContext)
