import React, { useCallback, useEffect } from 'react'
import moment from 'moment'

import {
  Button,
  Container,
  Form,
  Modal,
  Select,
  TextInput,
  DatePicker,
  UsersSelector,
} from '@/components'
import { t } from '@/i18n'
import { useHookForm } from '@/hooks'
import { formatDateTime, vectorActionSchema } from '@/utils'
import { mockUsers } from '@/utils/mock'
import { IOption, TPriority, TActionStatus, INewVectorAction } from '@/types'
import './action-modal.scss'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdd: (_params: INewVectorAction) => void
}

const users = mockUsers()

const priorityOptions: IOption<TPriority>[] = [
  {
    label: t('crucial'),
    value: 'crucial',
  },
  {
    label: t('high'),
    value: 'high',
  },
  {
    label: t('medium'),
    value: 'medium',
  },
  {
    label: t('low'),
    value: 'low',
  },
]

const statusOptions: IOption<TActionStatus>[] = [
  {
    label: t('completed'),
    value: 'completed',
  },
  {
    label: t('pending'),
    value: 'pending',
  },
  {
    label: t('inProgress'),
    value: 'in-progress',
  },
  {
    label: t('notStarted'),
    value: 'not-started',
  },
  {
    label: t('onHold'),
    value: 'on-hold',
  },
  {
    label: t('overdue'),
    value: 'overdue',
  },
]

const ActionModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const {
    Controller,
    handler: {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    },
  } = useHookForm(vectorActionSchema)

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const onSave = useCallback(
    () =>
      handleSubmit(val => {
        onAdd(val)
        onClose()
      }),
    [handleSubmit, onAdd, onClose],
  )

  return (
    <Modal
      className="new-action-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      header={t('vectorZoomPage.addActionItem')}
      footer={
        <>
          <Button
            variant="outline"
            className="vector-action-btn"
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="main"
            className="vector-action-btn"
            onClick={onSave()}
          >
            {t('save')}
          </Button>
        </>
      }
    >
      <Form>
        <Container col gap={15}>
          <div className="form-fields">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={t('actionForm.actionItem')}
                  placeholder={t('actionForm.actionNamePlaceholder')}
                  error={errors.name?.message}
                  className="w-100"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="form-fields">
            <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <Select<TPriority>
                  label={t('actionForm.priority')}
                  value={value}
                  placeholder={t('actionForm.priorityPlaceholder')}
                  className="w-50"
                  placement="bottom-start"
                  positioning="fixed"
                  onChange={_option => onChange(_option.value)}
                  options={priorityOptions}
                  error={errors.priority?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="due"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label={t('actionForm.dueDate')}
                  value={value ? moment(value).toDate() : undefined}
                  placeholder={t('actionForm.dueDatePlaceholder')}
                  placement="bottom-end"
                  positioning="fixed"
                  className="w-50"
                  onChange={_value =>
                    onChange(_value ? formatDateTime(_value, 'D MMM YYYY') : '')
                  }
                  error={errors.due?.message}
                />
              )}
            />
          </div>
          <div className="form-fields">
            <Controller
              control={control}
              name="assignee"
              render={({ field: { onChange, value } }) => (
                <UsersSelector<'single'>
                  label={t('actionForm.assignee')}
                  value={value}
                  type="single"
                  placeholder={t('actionForm.assigneePlaceholder')}
                  className="w-100"
                  placement="bottom-start"
                  positioning="fixed"
                  onChange={_value => onChange(_value)}
                  data={users}
                  error={errors.assignee?.message}
                />
              )}
            />
          </div>
          <div className="form-fields">
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <Select<TActionStatus>
                  label={t('actionForm.statusOnItem')}
                  value={value}
                  placeholder={t('actionForm.statusOnItemPlaceholder')}
                  className="w-100"
                  placement="bottom-start"
                  positioning="fixed"
                  onChange={_option => onChange(_option.value)}
                  options={statusOptions}
                  error={errors.status?.message}
                />
              )}
            />
          </div>
        </Container>
      </Form>
    </Modal>
  )
}

export default ActionModal
