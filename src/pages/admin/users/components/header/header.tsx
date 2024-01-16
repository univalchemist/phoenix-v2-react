import React from 'react'

import { Button, Container, SearchInput } from '@/components'
import { t } from '@/i18n'

import './header.scss'

interface Props {
  onSearch: (_val: string) => void
}

const Header: React.FC<Props> = ({ onSearch }) => {
  return (
    <Container
      align="center"
      justify="space-between"
      className="w-100 projects-header"
    >
      <SearchInput
        debounce={0}
        placeholder={t('adminUsersPage.findUser')}
        onSearch={onSearch}
      />
      <Container align="center" gap={16}>
        <Button size="lg" variant="outline">
          {t('adminUsersPage.importUsers')}
        </Button>
        <Button size="lg" variant="primary" iconLeft="add-light">
          {t('adminUsersPage.newUser')}
        </Button>
      </Container>
    </Container>
  )
}

export default Header
