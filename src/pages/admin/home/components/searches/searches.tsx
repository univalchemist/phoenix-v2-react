import React, { useMemo, useState } from 'react'
import classNames from 'classnames'

import { t } from '@/i18n'
import { useAdminHome } from '@/hooks'
import { Container, SearchInput } from '@/components'
import { ICustomer, IProject, IUser } from '@/types'
import { isSearchMatched } from '@/utils'
import Customers from './customers'
import Projects from './projects'
import Users from './users'
import './searches.scss'

const Searches: React.FC = () => {
  const { projects, customers, users } = useAdminHome()
  const [search, setSearch] = useState<string>('')
  const [focused, setFocused] = useState<boolean>(false)

  const [_projects, _customers, _users] = useMemo(() => {
    const _p: IProject[] = projects.filter(p =>
      isSearchMatched(p.title, search),
    )
    const _c: ICustomer[] = customers.filter(c =>
      isSearchMatched([c.email, c.companyName], search),
    )

    const _u: IUser[] = users.filter(u =>
      isSearchMatched([u.email, u.firstName, u.lastName], search),
    )

    return [_p, _c, _u]
  }, [customers, projects, search, users])

  return (
    <Container col className="searches-wrapper">
      <SearchInput
        debounce={0}
        placeholder={t('searchHere')}
        onSearch={setSearch}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Container
        col
        className={classNames('w-100 search-result-wrapper', { open: focused })}
      >
        <Container
          col
          gap={16}
          className="w-100 search-result-container custom-scrollbar"
        >
          <Customers data={_customers} />
          <Projects data={_projects} />
          <Users data={_users} />
        </Container>
      </Container>
    </Container>
  )
}

export default Searches
