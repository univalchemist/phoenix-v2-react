import { useContext } from 'react'

import { ProjectContext } from '@/contexts'

export const useProject = () => useContext(ProjectContext)
