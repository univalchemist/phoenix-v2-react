import React, { useMemo, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { useAdminHome } from '@/hooks'
import {
  DataTable,
  ISortableTableHeader,
  Text,
  WithPaginator,
  Button,
  SearchInput,
  TextLink,
} from '@/components'
import { ICustomer } from '@/types'
import { t } from '@/i18n'
import { adminCustomersPath, generatePath, isSearchMatched } from '@/utils'
import SectionWrapper from '../section-wrapper/section-wrapper'

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

const pageSize = 6

const Customers: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  const { customers } = useAdminHome()
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

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
    <SectionWrapper
      title={t('adminHomePage.lastOpenedCustomers')}
      right={
        <SearchInput
          debounce={0}
          className="customers-filter"
          placeholder={t('searchHere')}
          onSearch={setSearch}
        />
      }
      className="w-100 customers"
    >
      <WithPaginator
        className="customers-list"
        data={_customers}
        initialPageSize={pageSize}
        totalItems={_searched.length}
        onPageMetaChange={_page => setPage(_page)}
      >
        {_data => (
          <DataTable<ICustomer>
            headers={headers}
            actions={[{ key: 'action', label: t('adminHomePage.action') }]}
            data={_data}
          >
            {sortedData =>
              sortedData.map(datum => (
                <tr key={datum.id}>
                  <td>
                    <TextLink
                      onClick={() =>
                        navigate(
                          generatePath(adminCustomersPath, {}, [
                            { id: datum.id },
                          ]),
                        )
                      }
                    >
                      {datum.companyName}
                    </TextLink>
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
        )}
      </WithPaginator>
    </SectionWrapper>
  )
}

export default Customers
