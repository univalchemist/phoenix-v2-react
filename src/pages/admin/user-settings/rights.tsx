import React from 'react'
import { Controller } from 'react-hook-form'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import { Container, DatePicker, Select, UsersSelector } from '@/components'
import { t } from '@/i18n'
import { formatDateTime } from '@/utils'
import { mockUsers } from '@/utils/mock'

import { TControl } from './types'
import { IOption } from '@/types'
import { faker } from '@faker-js/faker'

interface Props {
  control: TControl
}

const users = mockUsers()

const options: IOption<string>[] = [0, 1, 2, 3, 4].map(() => ({
  label: faker.lorem.sentence(4),
  value: uuid(),
}))

const Rights: React.FC<Props> = ({ control }) => {
  return (
    <Container col gap={16}>
      <div className="form-fields">
        <Controller
          control={control}
          name="customerNumber"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label={t('userSettings.customerNumber')}
              value={value ? moment(value).toDate() : undefined}
              placeholder={t('userSettings.select')}
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
          name="owner"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <UsersSelector<'single'>
              label={t('userSettings.owner')}
              value={value}
              type="single"
              placeholder={t('searchSelect')}
              className="w-100"
              placement="bottom-start"
              positioning="fixed"
              onChange={_value => onChange(_value)}
              data={users}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="form-fields">
        <Controller
          control={control}
          name="calculationModel"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select<string>
              label={t('userSettings.calculationModel')}
              placeholder={t('userSettings.select')}
              value={value}
              className="w-100"
              placement="bottom-start"
              positioning="fixed"
              onChange={_option => onChange(_option.value)}
              options={options}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="form-fields">
        <Controller
          control={control}
          name="businessTemplate"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select<string>
              label={t('userSettings.businessTemplate')}
              placeholder={t('userSettings.select')}
              value={value}
              className="w-100"
              placement="bottom-start"
              positioning="fixed"
              onChange={_option => onChange(_option.value)}
              options={options}
              error={error?.message}
            />
          )}
        />
      </div>
    </Container>
  )
}

export default Rights
