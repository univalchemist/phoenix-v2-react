import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { useAdminSurvey } from '@/hooks'
import {
  DataTable,
  ISortableTableHeader,
  Text,
  WithPaginator,
  Button,
  Container,
  TextLink,
} from '@/components'
import { IVectorSurvey } from '@/types'
import { t } from '@/i18n'
import {
  adminCustomersPath,
  formatDateTime,
  generatePath,
  getStatusLabel,
  isSearchMatched,
} from '@/utils'

interface Props {
  search: string
}

const headers: ISortableTableHeader<IVectorSurvey>[] = [
  {
    key: 'customer',
    label: t('adminSurveysPage.customer'),
    sortable: false,
  },
  {
    key: 'createdAt',
    label: t('adminSurveysPage.surveyDate'),
    sortable: false,
  },
  {
    key: 'vectors',
    label: t('adminSurveysPage.vectors'),
    sortable: false,
  },
  {
    key: 'respondents',
    label: t('adminSurveysPage.respondents'),
    sortable: false,
  },
  {
    key: 'status',
    label: t('adminSurveysPage.status'),
    sortable: false,
  },
]

const pageSize = 15

const Surveys: React.FC<Props> = ({ search }) => {
  const navigate: NavigateFunction = useNavigate()
  const { surveys } = useAdminSurvey()
  const [page, setPage] = useState<number>(1)

  const _searched = useMemo(
    () => surveys.filter(s => isSearchMatched(s.customer.companyName, search)),
    [surveys, search],
  )

  const _surveys = useMemo(
    () => _searched.slice(pageSize * (page - 1), pageSize * page),
    [_searched, page],
  )

  return (
    <Container col className="w-100 surveys">
      <WithPaginator
        className="surveys-list"
        data={_surveys}
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
              {t('adminSurveysPage.surveys')}
            </Text>
            <DataTable<IVectorSurvey>
              headers={headers}
              actions={[{ key: 'action', label: '' }]}
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
                        {datum.customer.companyName}
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
                        {formatDateTime(datum.createdAt, 'MMMM D, YYYY')}
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
                        {datum.vectors}
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
                        {datum.respondents}
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
                        className="edit-survey-btn"
                        iconRight="chevron-right"
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
                          {t('adminSurveysPage.sendReminder')}
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

export default Surveys
