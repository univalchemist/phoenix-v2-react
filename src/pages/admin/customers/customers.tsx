import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AdminCustomerContextProvider } from '@/contexts'
import { AdminAppLayout } from '@/layout'
import { ICustomer, ICustomerForm } from '@/types'
import Header from './components/header/header'
import CustomersList from './components/customers-list/customers-list'
import CustomerDetail from './components/customer-detail/customer-detail'
import CustomerForm from './components/customer-form/customer-form'
import './customers.scss'

export const AdminCustomersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const [customer, setCustomer] = useState<ICustomer | undefined>()
  const [modal, setModal] = useState<'detail' | 'form' | null>(null)

  const onSave = useCallback((_data: ICustomerForm, _id?: string) => {
    console.log({ _data, _id })
  }, [])

  const onClose = useCallback(() => {
    setSearchParams(undefined)
    setModal(null)
    setTimeout(() => {
      setCustomer(undefined)
    }, 500)
  }, [setSearchParams])

  return (
    <AdminCustomerContextProvider>
      <AdminAppLayout
        className="customers-content admin"
        headerEl={
          <Header
            onAddNewCustomer={() => setModal('form')}
            onSearch={setSearch}
          />
        }
      >
        <CustomersList
          search={search}
          customerId={searchParams.get('id')}
          onEdit={c => {
            setCustomer(c)
            setModal('form')
          }}
          onSelect={c => {
            setCustomer(c)
            setModal('detail')
          }}
        />
        <CustomerDetail
          isOpen={modal === 'detail'}
          customer={customer}
          onClose={onClose}
        />
        <CustomerForm
          isOpen={modal === 'form'}
          data={customer}
          onSave={onSave}
          onClose={onClose}
        />
      </AdminAppLayout>
    </AdminCustomerContextProvider>
  )
}

export default AdminCustomersPage
