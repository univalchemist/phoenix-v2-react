import React, { useState } from 'react'
import classNames from 'classnames'

import { IVector, IVectorSurvey } from '@/types'
import {
  Button,
  Container,
  DataTable,
  ISortableTableHeader,
  Popover,
  TextInput,
} from '@/components'
import { t } from '@/i18n'

interface Props {
  vector: IVector | undefined
  onBackToVectors: () => void
}

const headers: ISortableTableHeader<IVectorSurvey>[] = [
  {
    key: 'question',
    label: t('projectForm.questions'),
    sortable: false,
  },
]

const QuestionsList: React.FC<Props> = ({ vector, onBackToVectors }) => {
  return (
    <Container col gap={8} className="w-100">
      <Button
        variant="pure"
        size="md"
        iconLeft="arrow-left"
        className="back-to-vectors"
        onClick={onBackToVectors}
      >
        {vector?.name}
      </Button>
      <DataTable<IVectorSurvey>
        className="questions-list"
        headers={headers}
        data={vector?.surveys || []}
        actions={[
          { key: 'edit', label: '' },
          { key: 'option', label: '' },
        ]}
      >
        {sortedData =>
          sortedData.map(datum => <QuestionItem key={datum.id} data={datum} />)
        }
      </DataTable>
    </Container>
  )
}

const QuestionItem: React.FC<{ data: IVectorSurvey }> = ({ data }) => {
  const [editable, setEditable] = useState<boolean>(false)

  const [value, setValue] = useState<string | undefined>(data.question)

  return (
    <tr className={classNames({ 'non-hoverable': editable })}>
      <td>
        <TextInput
          className={classNames('question-content', { editable })}
          readOnly={!editable}
          value={value || ''}
          onChange={ev => setValue(ev.target.value)}
        />
      </td>
      {editable && (
        <td colSpan={2}>
          <Container align="center" gap={16}>
            <Button
              variant="pure"
              size="sm"
              className="question-action-btn"
              iconLeft="close-circle-light"
              onClick={() => {
                setValue(data.question)
                setEditable(false)
              }}
            />
            <Button
              variant="pure"
              size="sm"
              className="question-action-btn"
              iconLeft="tick-circle"
              onClick={() => {
                setEditable(false)
              }}
            />
          </Container>
        </td>
      )}
      {!editable && (
        <>
          <td>
            <Button
              variant="pure"
              size="sm"
              className="question-action-btn"
              iconLeft="edit-2"
              onClick={() => setEditable(true)}
            />
          </td>
          <td>
            <Popover
              arrow
              placement="bottom-end"
              WrapEl="div"
              className="question-action"
              button={<Button size="sm" variant="pure" iconRight="3-dots" />}
            >
              {onClose => (
                <Container col gap={2} className="action-menu-container">
                  <div className="menu-item hoverable">
                    <Button
                      variant="pure"
                      size="lg"
                      iconLeft="exchange"
                      onClick={onClose}
                    >
                      {t('projectForm.replace')}
                    </Button>
                  </div>
                  <div className="menu-item hoverable">
                    <Button
                      variant="pure"
                      size="lg"
                      iconLeft="refresh"
                      onClick={() => {
                        onClose()
                      }}
                    >
                      {t('projectForm.regenerate')}
                    </Button>
                  </div>
                  <div className="menu-item hoverable">
                    <Button
                      variant="pure"
                      size="lg"
                      iconLeft="trash-dark"
                      onClick={() => {
                        onClose()
                      }}
                    >
                      {t('delete')}
                    </Button>
                  </div>
                </Container>
              )}
            </Popover>
          </td>
        </>
      )}
    </tr>
  )
}

export default QuestionsList
