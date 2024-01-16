import React from 'react'
import { Controller } from 'react-hook-form'

import { Accordion, Button, Container, TextInput } from '@/components'
import { t } from '@/i18n'

import AppearanceFiles from './appearance-files'
import AppearanceColors from './appearance-colors'
import AppearanceFonts from './appearance-fonts'
import { TControl } from './types'

interface Props {
  control: TControl
}

const Appearance: React.FC<Props> = ({ control }) => {
  return (
    <Container col gap={24} className="w-100">
      <div className="form-fields">
        <Controller
          control={control}
          name="apiKey"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Container align="flex-start" gap={8} className="w-100">
              <TextInput
                required
                label={t('userSettings.importAppearance')}
                placeholder={t('userSettings.apiKey')}
                helper={t('userSettings.enterAPIKey')}
                error={error?.message}
                className="flex-1"
                value={value}
                onChange={onChange}
              />
              <Button size="lg" variant="secondary" className="import-btn">
                {t('userSettings.import')}
              </Button>
            </Container>
          )}
        />
      </div>
      <Accordion title={t('userSettings.pictures')}>
        <AppearanceFiles />
      </Accordion>
      <Accordion title={t('userSettings.colors')}>
        <AppearanceColors control={control} />
      </Accordion>
      <Accordion title={t('userSettings.fonts')}>
        <AppearanceFonts control={control} />
      </Accordion>
    </Container>
  )
}

export default Appearance
