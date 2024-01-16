import React from 'react'

import { IVector } from '@/types'
import { mockVectors } from '@/utils/mock'
import {
  Button,
  Container,
  DataTable,
  ISortableTableHeader,
  Icon,
  Text,
} from '@/components'
import { t } from '@/i18n'

interface Props {
  onSelectVector: (_v: IVector | undefined, _m: 'vector' | 'questions') => void
}

const vectors: IVector[] = mockVectors()

const headers: ISortableTableHeader<IVector>[] = [
  {
    key: 'name',
    label: t('projectForm.vector'),
    sortable: false,
  },
  {
    // @ts-ignore
    key: 'questionStatus',
    label: t('projectForm.questionStatus'),
    sortable: false,
  },
  {
    key: 'surveys',
    label: t('projectForm.questions'),
    sortable: false,
  },
]

const VectorsList: React.FC<Props> = ({ onSelectVector }) => {
  return (
    <Container col className="w-100 project-vectors-container">
      <DataTable<IVector>
        headers={headers}
        data={vectors}
        actions={[{ key: 'delete', label: t('delete') }]}
      >
        {sortedData =>
          sortedData.map(datum => (
            <tr
              key={datum.id}
              onClick={() => {
                onSelectVector(datum, 'vector')
              }}
            >
              <td>
                <Text
                  font="regular"
                  fontWeight={400}
                  size={14}
                  lineHeight={20}
                  color="--primary-default"
                >
                  {datum.name}
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
                  Generating
                </Text>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="secondary"
                  className="questions-button"
                  onClick={ev => {
                    ev.preventDefault()
                    ev.stopPropagation()
                    onSelectVector(datum, 'questions')
                  }}
                >
                  <Text
                    font="regular"
                    fontWeight={400}
                    size={14}
                    lineHeight={20}
                    color="--primary-default"
                  >
                    {datum.surveys.length}
                  </Text>
                  <div className="q-icon-wrapper">
                    <Icon name="chevron-right" />
                  </div>
                </Button>
              </td>
              <td>
                <Button
                  className="delete-vector-btn"
                  iconLeft="trash-dark"
                  variant="pure"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                />
              </td>
            </tr>
          ))
        }
      </DataTable>
      <Container className="w-100 new-vector-btn-container">
        <Button
          variant="hybrid-success"
          size="md"
          className="new-vector-button"
          iconLeft="add-green"
          onClick={() => onSelectVector(undefined, 'vector')}
        >
          {t('projectForm.addVector')}
        </Button>
      </Container>
    </Container>
  )
}

export default VectorsList
