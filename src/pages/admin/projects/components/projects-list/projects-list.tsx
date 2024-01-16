import React, { useMemo, useState } from 'react'
import { faker } from '@faker-js/faker'

import { useAdminProject } from '@/hooks'
import {
  DataTable,
  ISortableTableHeader,
  Text,
  WithPaginator,
  Button,
  Container,
} from '@/components'
import { IProject } from '@/types'
import { t } from '@/i18n'
import { isSearchMatched } from '@/utils'

interface Props {
  search: string
  onEdit: (_p: IProject) => void
  onSelect: (_p: IProject) => void
}

const headers: ISortableTableHeader<IProject>[] = [
  {
    key: 'title',
    label: t('adminProjectsPage.projectName'),
    sortable: false,
  },
  {
    key: 'customer',
    label: t('adminProjectsPage.customer'),
    sortable: false,
  },
  {
    // @ts-ignore
    key: 'lastSurvey',
    label: t('adminProjectsPage.lastSurvey'),
    sortable: false,
  },
  {
    // @ts-ignore
    key: 'survey',
    label: t('adminProjectsPage.survey'),
    sortable: false,
  },
]

const pageSize = 15

const Projects: React.FC<Props> = ({ search, onEdit, onSelect }) => {
  const { projects } = useAdminProject()
  const [page, setPage] = useState<number>(1)

  const _searched = useMemo(
    () =>
      projects.filter(p =>
        isSearchMatched([p.title, p.customer.companyName], search),
      ),
    [projects, search],
  )

  const _projects = useMemo(
    () => _searched.slice(pageSize * (page - 1), pageSize * page),
    [_searched, page],
  )

  return (
    <Container col className="w-100 projects">
      <WithPaginator
        className="projects-list"
        data={_projects}
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
              {t('adminHomePage.projects')}
            </Text>
            <DataTable<IProject>
              headers={headers}
              actions={[{ key: 'action', label: '' }]}
              data={_data}
            >
              {sortedData =>
                sortedData.map(datum => (
                  <tr key={datum.id} onClick={() => onSelect(datum)}>
                    <td>
                      <Text
                        font="regular"
                        fontWeight={400}
                        size={14}
                        lineHeight={20}
                        color="--primary-default"
                      >
                        {datum.title}
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
                        November 7, 2021
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
                        {faker.number.int({ min: 50, max: 88 })}
                      </Text>
                    </td>
                    <td>
                      <Button
                        className="edit-project-btn"
                        iconRight="chevron-right"
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
                          {t('open')}
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

export default Projects
