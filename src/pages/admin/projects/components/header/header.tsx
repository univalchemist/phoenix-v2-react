import React from 'react'

import { Button, Container, SearchInput } from '@/components'
import { t } from '@/i18n'

import './header.scss'

interface Props {
  onSearch: (_val: string) => void
  onAddNew: () => void
}

const Header: React.FC<Props> = ({ onSearch, onAddNew }) => {
  return (
    <Container
      align="center"
      justify="space-between"
      className="w-100 projects-header"
    >
      <SearchInput
        debounce={0}
        placeholder={t('adminProjectsPage.findProjects')}
        onSearch={onSearch}
      />
      <Button
        size="lg"
        variant="primary"
        iconLeft="add-light"
        onClick={onAddNew}
      >
        {t('adminProjectsPage.newProject')}
      </Button>
    </Container>
  )
}

export default Header
