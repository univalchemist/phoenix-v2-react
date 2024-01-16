import React from 'react'
import { Controller } from 'react-hook-form'

import { Container, Select, TextInput, UsersSelector } from '@/components'
import { t } from '@/i18n'
import { IOption } from '@/types'
import { mockUsers } from '@/utils/mock'

import { TControl } from './types'

interface Props {
  control: TControl
}

const languageOptions: IOption<string>[] = [
  {
    label: 'English',
    value: 'English',
  },
  {
    label: 'Swenska',
    value: 'Swenska',
  },
]

const users = mockUsers()

const General: React.FC<Props> = ({ control }) => {
  return (
    <Container col gap={16}>
      <div className="form-fields">
        <Controller
          control={control}
          name="companyName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              required
              label={t('userSettings.companyName')}
              placeholder={t('userSettings.name')}
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
          name="language"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select<string>
              required
              label={t('userSettings.language')}
              placeholder={t('userSettings.select')}
              value={value}
              className="w-100"
              placement="bottom-start"
              positioning="fixed"
              onChange={_option => onChange(_option.value)}
              options={languageOptions}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="form-fields">
        <Controller
          control={control}
          name="surveySenders"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <UsersSelector<'multi'>
              label={t('userSettings.surveySenders')}
              value={value}
              type="multi"
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
    </Container>
  )
}

export default General
