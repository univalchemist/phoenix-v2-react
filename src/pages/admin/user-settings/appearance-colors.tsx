import React from 'react'
import { Controller } from 'react-hook-form'

import { Container, TextInput, Text, Checkbox } from '@/components'
import { t } from '@/i18n'

import { TControl } from './types'

interface Props {
  control: TControl
}

const AppearanceColors: React.FC<Props> = ({ control }) => {
  return (
    <Container col gap={6} className="w-100">
      <Text
        font="medium"
        size={12}
        fontWeight={500}
        lineHeight={16}
        color="--primary-light"
      >
        {t('userSettings.primaryColor')}
      </Text>
      <div className="form-fields">
        <Controller
          control={control}
          name="primaryColor"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Container
              align="flex-start"
              gap={8}
              className="color-container w-100"
            >
              <TextInput
                label={t('userSettings.thisIsYourPrimaryColor')}
                placeholder={t('userSettings.apiKey')}
                error={error?.message}
                value={value}
                onChange={onChange}
              />
              <div
                className="selected-color"
                style={{
                  backgroundColor: value
                    ? `#${value.replace('#', '')}`
                    : 'transparent',
                }}
              />
            </Container>
          )}
        />
      </div>
      <div className="form-fields">
        <Controller
          control={control}
          name="useBackgroundColor"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              label={t('userSettings.useBackgroundColor')}
            />
          )}
        />
      </div>
    </Container>
  )
}

export default AppearanceColors
