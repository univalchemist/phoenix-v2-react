import React, { useCallback, useState } from 'react'

import { useHookForm } from '@/hooks'
import { userSettingsSchema } from '@/utils'
import { Button, Container, Form, Modal, Stepper } from '@/components'
import { t } from '@/i18n'
import General from './general'
import Appearance from './appearance'
import Rights from './rights'
import { IUserSettingsProps } from './types'
import './user-settings.scss'

export const UserSettings: React.FC<IUserSettingsProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0)

  const {
    handler: { control, handleSubmit },
  } = useHookForm(userSettingsSchema(step), {
    defaultValues: {
      primaryColor: '000000',
    },
  })

  const _onSave = useCallback(
    () =>
      handleSubmit(val => {
        if (step === 2) {
          console.log({ val })
          onClose()
        } else {
          setStep(prev => prev + 1)
        }
      }),
    [handleSubmit, step, onClose],
  )

  return (
    <Modal
      className="user-settings-modal"
      isOpen
      onClose={onClose}
      closeOnBackdrop={false}
      header={t('userSettings.settings')}
      footer={
        <>
          <Button
            variant="outline"
            className="modal-footer-button"
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="main"
            className="modal-footer-button"
            onClick={_onSave()}
          >
            {t('save')}
          </Button>
        </>
      }
    >
      <Container col gap={28} className="user-settings-container">
        <Stepper
          steps={[
            {
              index: 0,
              label: t('userSettings.general'),
              optional: false,
            },
            {
              index: 1,
              label: t('userSettings.appearance'),
              optional: false,
            },
            {
              index: 2,
              label: t('userSettings.rights'),
              optional: false,
            },
          ]}
          currentStep={step}
          onStep={(_idx: number) => setStep(_idx)}
        />
        <Form>
          {step === 0 && <General control={control} />}
          {step === 1 && <Appearance control={control} />}
          {step === 2 && <Rights control={control} />}
        </Form>
      </Container>
    </Modal>
  )
}

export default UserSettings
