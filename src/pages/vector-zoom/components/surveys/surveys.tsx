import React from 'react'

import { useVectorZoom } from '@/hooks'
import {
  Container,
  DataTable,
  DateTime,
  Text,
  ISortableTableHeader,
} from '@/components'
import { IVectorSurvey } from '@/types'
import { t } from '@/i18n'
import { formatDateTime } from '@/utils'
import Comment from './comment'

import './surveys.scss'

const headers: ISortableTableHeader<IVectorSurvey>[] = [
  {
    key: 'createdAt',
    label: t('vectorZoomPage.survey'),
    sortable: false,
  },
  {
    key: 'respondents',
    label: t('vectorZoomPage.respondents'),
    sortable: false,
  },
  {
    key: 'value',
    label: t('vectorZoomPage.score'),
    sortable: false,
  },
  {
    key: 'comments',
    label: t('vectorZoomPage.comments'),
    sortable: false,
  },
]

const Surveys: React.FC = () => {
  const { currentVector, colorMap, onSetActiveDot } = useVectorZoom()

  return (
    <div className="surveys-container custom-scrollbar">
      <DataTable<IVectorSurvey>
        headers={headers}
        data={currentVector?.surveys || []}
      >
        {sortedData =>
          sortedData.map(datum => (
            <tr
              key={datum.id}
              onMouseEnter={() =>
                onSetActiveDot(formatDateTime(datum.createdAt, 'YYYY-MM'))
              }
              onMouseLeave={() => onSetActiveDot()}
            >
              <td>
                <Container align="center" gap={12}>
                  <div
                    className="dot"
                    style={{
                      backgroundColor:
                        colorMap[formatDateTime(datum.createdAt, 'YYYY-MM')],
                    }}
                  />
                  <Text font="medium" size={16} color="--blue-default">
                    <DateTime value={datum.createdAt} format="MMM DD, YYYY" />
                  </Text>
                </Container>
              </td>
              <td>
                <Text
                  font="regular"
                  size={14}
                  lineHeight={20}
                  color="--primary-default"
                >
                  {datum.respondents}
                </Text>
              </td>
              <td>
                <Text
                  font="regular"
                  size={14}
                  lineHeight={20}
                  color="--primary-default"
                >
                  {datum.value}
                </Text>
              </td>
              <td>
                <Comment survey={datum} />
              </td>
            </tr>
          ))
        }
      </DataTable>
    </div>
  )
}

export default Surveys
