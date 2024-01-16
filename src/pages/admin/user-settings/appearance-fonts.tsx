import React from 'react'
import { Controller } from 'react-hook-form'

import { Container, Text, Checkbox, Select } from '@/components'
import { t } from '@/i18n'
import { IOption } from '@/types'

import { TControl } from './types'

interface Props {
  control: TControl
}

const fontOptions: IOption<string>[] = [
  {
    label: 'EloquiaDisplay ExtraBold',
    value: 'EloquiaDisplay ExtraBold',
  },
  {
    label: 'EloquiaDisplay Black',
    value: 'EloquiaDisplay Black',
  },
  {
    label: 'EloquiaDisplay Bold',
    value: 'EloquiaDisplay Bold',
  },
  {
    label: 'EloquiaDisplay Italic',
    value: 'EloquiaDisplay Italic',
  },
  {
    label: 'EloquiaDisplay Light',
    value: 'EloquiaDisplay Light',
  },
  {
    label: 'EloquiaDisplay Medium',
    value: 'EloquiaDisplay Medium',
  },
  {
    label: 'EloquiaDisplay Regular',
    value: 'EloquiaDisplay Regular',
  },
  {
    label: 'EloquiaDisplay SemiBold',
    value: 'EloquiaDisplay SemiBold',
  },
  {
    label: 'EloquiaDisplay Thin',
    value: 'EloquiaDisplay Thin',
  },
]

const AppearanceFonts: React.FC<Props> = ({ control }) => {
  return (
    <Container col gap={16} className="w-100">
      <Container col gap={6} className="w-100">
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('userSettings.fontHeadline')}
        </Text>
        <div className="form-fields">
          <Controller
            control={control}
            name="fontHeadline"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select<string>
                label={t('userSettings.thisFontIsUsedInHeader')}
                placeholder={t('userSettings.select')}
                value={value}
                className="w-100"
                placement="bottom-start"
                positioning="fixed"
                onChange={_option => onChange(_option.value)}
                options={fontOptions}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className="form-fields">
          <Controller
            control={control}
            name="upperCaseHeader"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onChange={onChange}
                label={t('userSettings.displayUppercaseHeaders')}
              />
            )}
          />
        </div>
      </Container>
      <Container col gap={6} className="w-100">
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('userSettings.fontStandard')}
        </Text>
        <div className="form-fields">
          <Controller
            control={control}
            name="fontStandard"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select<string>
                label={t('userSettings.thisFontIsUsedInPage')}
                placeholder={t('userSettings.select')}
                value={value}
                className="w-100"
                placement="bottom-start"
                positioning="fixed"
                onChange={_option => onChange(_option.value)}
                options={fontOptions}
                error={error?.message}
              />
            )}
          />
        </div>
      </Container>
      <Container col gap={6} className="w-100">
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('userSettings.fontMenu')}
        </Text>
        <div className="form-fields">
          <Controller
            control={control}
            name="fontMenu"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select<string>
                label={t('userSettings.thisFontIsUsedInMenu')}
                placeholder={t('userSettings.select')}
                value={value}
                className="w-100"
                placement="bottom-start"
                positioning="fixed"
                onChange={_option => onChange(_option.value)}
                options={fontOptions}
                error={error?.message}
              />
            )}
          />
        </div>
      </Container>
    </Container>
  )
}

export default AppearanceFonts
