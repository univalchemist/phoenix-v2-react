import React from 'react'

import { Button, Container, SearchInput } from '@/components'
import { t } from '@/i18n'

import './header.scss'

interface Props {
  onAddNewCustomer: () => void
  onSearch: (_val: string) => void
}

const Header: React.FC<Props> = ({ onAddNewCustomer, onSearch }) => {
  return (
    <Container
      align="center"
      justify="space-between"
      className="customers-header"
    >
      <SearchInput
        debounce={0}
        placeholder={t('adminCustomersPage.findCustomers')}
        onSearch={onSearch}
      />
      <Button
        size="lg"
        variant="primary"
        iconLeft="add-light"
        onClick={onAddNewCustomer}
      >
        {t('adminCustomersPage.addCustomer')}
      </Button>
    </Container>
  )
}

export default Header
