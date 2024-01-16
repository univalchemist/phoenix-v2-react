import React, { useMemo, useState } from 'react'
import classNames from 'classnames'

import { useAdminUser } from '@/hooks'
import {
  DataTable,
  ISortableTableHeader,
  Text,
  WithPaginator,
  Button,
  Container,
} from '@/components'
import { IUser } from '@/types'
import { t } from '@/i18n'
import {
  formatDateTime,
  fullName,
  getStatusLabel,
  isSearchMatched,
} from '@/utils'

interface Props {
  search: string
  onClick: (_user: IUser) => void
}

const headers: ISortableTableHeader<IUser>[] = [
  {
    key: 'firstName',
    label: t('adminUsersPage.name'),
    sortable: false,
  },
  {
    key: 'customer',
    label: t('adminUsersPage.customer'),
    sortable: false,
  },
  {
    key: 'createdAt',
    label: t('adminUsersPage.createdDate'),
    sortable: false,
  },
  {
    key: 'status',
    label: t('adminUsersPage.status'),
    sortable: false,
  },
]

const pageSize = 15

const Users: React.FC<Props> = ({ search, onClick }) => {
  const { users } = useAdminUser()
  const [page, setPage] = useState<number>(1)

  const _searched = useMemo(
    () => users.filter(s => isSearchMatched([s.firstName, s.lastName], search)),
    [users, search],
  )

  const _users = useMemo(
    () => _searched.slice(pageSize * (page - 1), pageSize * page),
    [_searched, page],
  )

  return (
    <Container col className="w-100 users">
      <WithPaginator
        className="users-list"
        data={_users}
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
              {t('adminUsersPage.users')}
            </Text>
            <DataTable<IUser>
              headers={headers}
              actions={[{ key: 'action', label: t('adminUsersPage.action') }]}
              data={_data}
            >
              {sortedData =>
                sortedData.map(datum => (
                  <tr key={datum.id} onClick={() => onClick(datum)}>
                    <td>
                      <Text
                        font="medium"
                        fontWeight={500}
                        size={16}
                        lineHeight={20}
                        color="--blue-default"
                      >
                        {fullName(datum.firstName, datum.lastName)}
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
                        {datum.customer.companyName}
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
                        {formatDateTime(datum.createdAt, 'MMMM D, YYYY')}
                      </Text>
                    </td>
                    <td>
                      <Container align="center" gap={8}>
                        <div
                          className={classNames('status-dot', datum.status)}
                        />
                        <Text
                          font="regular"
                          fontWeight={400}
                          size={14}
                          lineHeight={20}
                          color="--primary-default"
                        >
                          {getStatusLabel(datum.status)}
                        </Text>
                      </Container>
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
          </>
        )}
      </WithPaginator>
    </Container>
  )
}

export default Users
