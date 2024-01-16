import React, { useEffect, useMemo, useState } from 'react'

import { useAdminCustomer } from '@/hooks'
import {
  DataTable,
  ISortableTableHeader,
  Text,
  WithPaginator,
  Button,
  Container,
} from '@/components'
import { ICustomer } from '@/types'
import { t } from '@/i18n'
import { isSearchMatched } from '@/utils'

interface Props {
  search: string
  customerId: string | null
  onEdit: (_c: ICustomer) => void
  onSelect: (_c: ICustomer) => void
}

const headers: ISortableTableHeader<ICustomer>[] = [
  {
    key: 'companyName',
    label: t('adminHomePage.customerName'),
    sortable: false,
  },
  {
    key: 'projects',
    label: t('adminHomePage.projects'),
    sortable: false,
  },
  {
    key: 'industry',
    label: t('adminHomePage.industry'),
    sortable: false,
  },
  {
    key: 'representatives',
    label: t('adminHomePage.users'),
    sortable: false,
  },
]

const pageSize = 15

const Customers: React.FC<Props> = ({
  search,
  customerId,
  onEdit,
  onSelect,
}) => {
  const { customers } = useAdminCustomer()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    if (customerId) {
      const customer = customers.find(({ id }) => id === customerId)
      onSelect(customer || customers[0])
    }
  }, [customerId, customers, onSelect])

  const _searched = useMemo(
    () =>
      customers.filter(c => isSearchMatched([c.companyName, c.email], search)),
    [customers, search],
  )

  const _customers = useMemo(
    () => _searched.slice(pageSize * (page - 1), pageSize * page),
    [_searched, page],
  )

  return (
    <Container col className="w-100 customers">
      <WithPaginator
        className="customers-list"
        data={_customers}
        initialPageSize={pageSize}
        totalItems={_searched.length}
        onPageMetaChange={_page => setPage(_page)}
      >
        {_data => (
          <>
            <Text
              font="medium"
              size={18}
              lineHeight={24}
              fontWeight={500}
              color="--primary-dark"
            >
              {t('adminHomePage.customers')}
            </Text>
            <DataTable<ICustomer>
              headers={headers}
              actions={[{ key: 'action', label: t('adminHomePage.action') }]}
              data={_data}
            >
              {sortedData =>
                sortedData.map(datum => (
                  <tr key={datum.id} onClick={() => onSelect(datum)}>
                    <td>
                      <Text
                        font="medium"
                        fontWeight={500}
                        size={16}
                        lineHeight={24}
                        color="--blue-default"
                      >
                        {datum.companyName}
                      </Text>
                    </td>
                    <td>
                      <Text
                        font="regular"
                        fontWeight={400}
                        size={14}
                        lineHeight={20}
                        color="--primary-default"
                      >
                        {datum.projects}
                      </Text>
                    </td>
                    <td>
                      <Text
                        font="regular"
                        fontWeight={400}
                        size={14}
                        lineHeight={20}
                        color="--primary-default"
                      >
                        {datum.industry}
                      </Text>
                    </td>
                    <td>
                      <Text
                        font="regular"
                        fontWeight={400}
                        size={14}
                        lineHeight={20}
                        color="--primary-default"
                      >
                        {datum.representatives?.length}
                      </Text>
                    </td>
                    <td>
                      <Button
                        className="edit-customer-btn"
                        iconLeft="edit-2-green"
                        variant="pure"
                        size="sm"
                        onClick={e => {
                          e.stopPropagation()
                          e.preventDefault()
                          onEdit(datum)
                        }}
                      >
                        <Text
                          font="regular"
                          fontWeight={400}
                          size={14}
                          lineHeight={20}
                          color="--green-light"
                        >
                          {t('edit')}
                        </Text>
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </DataTable>
          </>
        )}
      </WithPaginator>
    </Container>
  )
}

export default Customers
