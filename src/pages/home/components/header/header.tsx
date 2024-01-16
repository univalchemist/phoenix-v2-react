import React from 'react'

import { Container, Button } from '@/components'
import { t } from '@/i18n'
import Projects from '../projects/projects'

interface Props {
  onCreateNewProject: () => void
}

export const Header: React.FC<Props> = ({ onCreateNewProject }) => {
  return (
    <Container align="center" className="w-100 home-header">
      <Projects />
      <div className="flex-1" />
      <Container align="center" gap={16}>
        <Button size="lg" variant="outline">
          {t('homePage.deployNewSurvey')}
        </Button>
        <Button
          size="lg"
          variant="primary"
          iconLeft="add-light"
          onClick={onCreateNewProject}
        >
          {t('homePage.startNewProject')}
        </Button>
      </Container>
    </Container>
  )
}

export default Header
