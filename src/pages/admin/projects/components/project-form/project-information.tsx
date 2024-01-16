import React from 'react'
import { Controller } from 'react-hook-form'
import moment from 'moment'
import classNames from 'classnames'

import { formatDateTime } from '@/utils'
import {
  Container,
  DatePicker,
  FormGroup,
  Radio,
  RichTextEditor,
  TextInput,
} from '@/components'
import { t } from '@/i18n'

import { TControl } from './types'

interface Props {
  control: TControl
  linkedToStrategic: boolean
  onChangeLinked: (_val: boolean) => void
}

const ProjectInformation: React.FC<Props> = ({
  control,
  linkedToStrategic,
  onChangeLinked,
}) => {
  return (
    <Container col gap={16}>
      <div className="form-fields">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              required
              label={t('projectForm.projectName')}
              placeholder={t('projectForm.enterProjectName')}
              error={error?.message}
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
          name="from"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label={t('projectForm.fromDate')}
              value={value ? moment(value).toDate() : undefined}
              placeholder={t('projectForm.select')}
              placement="bottom-start"
              positioning="fixed"
              className="w-50"
              onChange={_value =>
                onChange(_value ? formatDateTime(_value, 'D MMM YYYY') : '')
              }
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="to"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label={t('projectForm.toDate')}
              value={value ? moment(value).toDate() : undefined}
              placeholder={t('projectForm.select')}
              placement="bottom-end"
              positioning="fixed"
              className="w-50"
              onChange={_value =>
                onChange(_value ? formatDateTime(_value, 'D MMM YYYY') : '')
              }
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="form-fields">
        <Controller
          control={control}
          name="purpose"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              required
              label={t('projectForm.projectPurpose')}
              placeholder={t('projectForm.typeHere')}
              error={error?.message}
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
          name="goal"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              required
              label={t('projectForm.projectGoal')}
              placeholder={t('projectForm.typeHere')}
              error={error?.message}
              className="w-100"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="form-fields">
        <FormGroup gap={6} label={t('projectForm.projectStrategicGoal')}>
          <Radio
            className="linked-to-strategic"
            label={t('common.yes')}
            checked={linkedToStrategic}
            onChange={() => onChangeLinked(true)}
          />
          <Radio
            className="linked-to-strategic"
            label={t('common.no')}
            checked={!linkedToStrategic}
            onChange={() => onChangeLinked(false)}
          />
        </FormGroup>
      </div>
      <Container
        col
        gap={16}
        className={classNames('conditional-container', {
          visible: linkedToStrategic,
        })}
      >
        <div className="form-fields">
          <Controller
            control={control}
            name="goalLinked"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <RichTextEditor
                label={t('projectForm.projectStrategicGoal')}
                placeholder={t('projectForm.typeHere')}
                error={error?.message}
                className="w-100"
                initialValue={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="form-fields">
          <Controller
            control={control}
            name="challenge"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <RichTextEditor
                label={t('projectForm.projectChallenge')}
                placeholder={t('projectForm.typeHere')}
                error={error?.message}
                className="w-100"
                initialValue={value}
                onChange={onChange}
              />
            )}
          />
        </div>
      </Container>
    </Container>
  )
}

export default ProjectInformation
