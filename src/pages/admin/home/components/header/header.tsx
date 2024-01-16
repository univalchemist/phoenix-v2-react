import React from 'react'

import { Container, Button } from '@/components'
import { t } from '@/i18n'
import Searches from '../searches/searches'

interface Props {
  onCreateNewCustomer: () => void
  onCreateNewProject: () => void
}

export const Header: React.FC<Props> = ({
  onCreateNewCustomer,
  onCreateNewProject,
}) => {
  return (
    <Container align="center" className="w-100 home-header">
      <Searches />
      <div className="flex-1" />
      <Container align="center" gap={16}>
        <Button
          size="lg"
          variant="outline"
          iconLeft="add-dark"
          onClick={onCreateNewCustomer}
        >
          {t('adminHomePage.addCustomer')}
        </Button>
        <Button
          size="lg"
          variant="primary"
          iconLeft="add-light"
          onClick={onCreateNewProject}
        >
          {t('adminHomePage.newProject')}
        </Button>
      </Container>
    </Container>
  )
}

export default Header
