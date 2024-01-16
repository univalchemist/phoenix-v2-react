import React, { useState } from 'react'

import { useVectorZoom } from '@/hooks'
import {
  Container,
  Text,
  Button,
  DataTable,
  ISortableTableHeader,
  Badge,
  DateTime,
  Avatar,
} from '@/components'
import { t } from '@/i18n'
import { IVectorAction } from '@/types'
import { fullName, getPriorityLabel, getStatusLabel } from '@/utils'
import ActionModal from '../action-modal/action-modal'
import Action from './action'
import './action-list.scss'

const headers: ISortableTableHeader<IVectorAction>[] = [
  {
    key: 'name',
    label: t('vectorZoomPage.action'),
    sortable: false,
  },
  {
    key: 'priority',
    label: t('vectorZoomPage.priority'),
    sortable: false,
  },
  {
    key: 'due',
    label: t('vectorZoomPage.due'),
    sortable: false,
  },
  {
    key: 'assignee',
    label: t('vectorZoomPage.assignedTo'),
    sortable: false,
  },
  {
    key: 'status',
    label: t('vectorZoomPage.actionStatus'),
    sortable: false,
  },
]

const ActionList: React.FC = () => {
  const { currentVector, onMarkActionCompleted, onRemoveAction, onAddAction } =
    useVectorZoom()

  const [openNewModal, setOpenNewModal] = useState<boolean>(false)

  return (
    <Container col gap={16} className="flex-1 action-list-wrapper">
      <Container align="center" justify="space-between">
        <Text font="medium" size={18} lineHeight={24} color="--primary-dark">
          {t('vectorZoomPage.actionList')}
        </Text>
        <Button
          size="md"
          variant="hybrid-success"
          iconLeft="add-green"
          onClick={() => setOpenNewModal(true)}
        >
          {t('vectorZoomPage.addActionItem')}
        </Button>
      </Container>
      <div className="flex-1 action-list-container">
        <DataTable<IVectorAction>
          headers={headers}
          actions={[{ key: 'action', label: t('vectorZoomPage.action') }]}
          data={currentVector?.actions || []}
        >
          {sortedData =>
            sortedData.map(datum => (
              <tr key={datum.id}>
                <td>
                  <Text
                    font="regular"
                    size={14}
                    lineHeight={20}
                    color="--primary-default"
                  >
                    {datum.name}
                  </Text>
                </td>
                <td>
                  <Badge
                    text={getPriorityLabel(datum.priority)}
                    variant={
                      datum.priority === 'high'
                        ? 'error'
                        : datum.priority === 'medium'
                        ? 'info'
                        : datum.priority === 'low'
                        ? 'secondary'
                        : 'warning'
                    }
                  />
                </td>
                <td>
                  <Text
                    font="regular"
                    size={14}
                    lineHeight={20}
                    color="--primary-default"
                  >
                    <DateTime value={datum.createdAt} format="MMM DD" />
                  </Text>
                </td>
                <td>
                  <Container align="center" gap={8}>
                    <Avatar
                      size={24}
                      imageUrl={datum.assignee.profilePicture}
                    />
                    <Text
                      ellipsis
                      font="regular"
                      size={14}
                      lineHeight={20}
                      color="--primary-default"
                    >
                      {fullName(
                        datum.assignee.firstName,
                        datum.assignee.lastName,
                      )}
                    </Text>
                  </Container>
                </td>
                <td>
                  <Text
                    font="regular"
                    size={14}
                    lineHeight={20}
                    color={
                      datum.status === 'in-progress'
                        ? '--blue-default'
                        : datum.status === 'overdue'
                        ? '--pink-default'
                        : datum.status === 'on-hold'
                        ? '--yellow-default'
                        : datum.status === 'completed'
                        ? '--green-light'
                        : '--primary-light'
                    }
                  >
                    {getStatusLabel(datum.status)}
                  </Text>
                </td>
                <td>
                  <Container reversed>
                    <Action
                      action={datum}
                      onMarkCompleted={onMarkActionCompleted}
                      onRemove={onRemoveAction}
                    />
                  </Container>
                </td>
              </tr>
            ))
          }
        </DataTable>
      </div>
      <ActionModal
        isOpen={openNewModal}
        onClose={() => setOpenNewModal(false)}
        onAdd={onAddAction}
      />
    </Container>
  )
}

export default ActionList
