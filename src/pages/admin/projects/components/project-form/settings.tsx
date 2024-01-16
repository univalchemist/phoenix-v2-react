import React from 'react'
import { Controller } from 'react-hook-form'
import moment from 'moment'

import { Container, DatePicker, FormGroup, Radio } from '@/components'
import { t } from '@/i18n'
import { formatDateTime } from '@/utils'
import { TControl } from './types'

interface Props {
  control: TControl
}

const Settings: React.FC<Props> = ({ control }) => {
  return (
    <Container col gap={16} className="w-100">
      <div className="form-fields">
        <Controller
          control={control}
          name="surveyInterval"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormGroup
              className="w-100"
              label={t('projectForm.surveyInterval')}
              error={error?.message}
            >
              <Radio
                className="flex-1 survey-interval"
                label={t('projectForm.everyMonth')}
                checked={value === 'every-month'}
                onChange={() => onChange('every-month')}
              />
              <Radio
                className="flex-1 survey-interval"
                label={t('projectForm.2Months')}
                checked={value === '2-months'}
                onChange={() => onChange('2-months')}
              />
              <Radio
                className="flex-1 survey-interval"
                label={t('projectForm.3Months')}
                checked={value === '3-months'}
                onChange={() => onChange('3-months')}
              />
              <Radio
                className="flex-1 survey-interval"
                label={t('projectForm.days')}
                checked={value === 'days'}
                onChange={() => onChange('days')}
              />
            </FormGroup>
          )}
        />
      </div>
      <div className="form-fields">
        <Controller
          control={control}
          name="from"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label={t('projectForm.baselineDate')}
              value={value ? moment(value).toDate() : undefined}
              placeholder={t('projectForm.select')}
              placement="bottom-start"
              positioning="fixed"
              className="w-100"
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
          name="questionModeling"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormGroup
              className="w-100"
              label={t('projectForm.surveyInterval')}
              error={error?.message}
            >
              <Radio
                className="flex-1 question-modeling"
                label={t('projectForm.straight')}
                checked={value === 'straight'}
                onChange={() => onChange('straight')}
              />
              <Radio
                className="flex-1 question-modeling"
                label={t('projectForm.partlyRandom')}
                checked={value === 'partly-random'}
                onChange={() => onChange('partly-random')}
              />
              <Radio
                className="flex-1 question-modeling"
                label={t('projectForm.random')}
                checked={value === 'random'}
                onChange={() => onChange('random')}
              />
            </FormGroup>
          )}
        />
      </div>
    </Container>
  )
}

export default Settings
