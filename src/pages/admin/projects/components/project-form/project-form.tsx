import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Trans } from 'react-i18next'

import { useHookForm } from '@/hooks'
import { projectSchema } from '@/utils'
import { IProject, IProjectForm } from '@/types'
import { Button, Container, Form, Modal, Stepper, Text } from '@/components'
import { t } from '@/i18n'

import ProjectInformation from './project-information'
import TypeVector from './type-vector'
import Settings from './settings'
import './project-form.scss'

interface Props {
  data?: IProject
  isOpen: boolean
  onSave?: (_data: IProjectForm, _id?: string) => void
  onClose: () => void
}

const ProjectForm: React.FC<Props> = ({ data, isOpen, onSave, onClose }) => {
  const [step, setStep] = useState<number>(0)
  const [linkedToStrategic, setLinkedToStrategic] = useState<boolean>(false)

  const initialData: IProjectForm = useMemo(() => {
    if (!data) {
      return {
        status: 'pending',
        surveyInterval: 'every-month',
        questionModeling: 'straight',
      } as IProjectForm
    }

    return { ...data, vectors: data.vectors.map(({ id }) => id) }
  }, [data])

  const {
    handler: { control, handleSubmit, reset },
  } = useHookForm(projectSchema(linkedToStrategic, step), {
    defaultValues: initialData,
  })

  useEffect(() => {
    if (!isOpen) {
      reset()
      setStep(0)
      setLinkedToStrategic(false)
      return
    }
    if (isOpen) {
      reset(initialData)
    }
  }, [initialData, isOpen, reset])

  const _onSave = useCallback(
    () =>
      handleSubmit(val => {
        if (step === 2) {
          onSave?.({ ...val, status: data?.status || 'pending' }, data?.id)
          onClose()
        } else {
          setStep(prev => prev + 1)
        }
      }),
    [handleSubmit, step, onSave, data?.status, data?.id, onClose],
  )

  return (
    <Modal
      className="project-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      header={
        data ? t('projectForm.editProject') : t('projectForm.createNewProject')
      }
      subTitle={
        <Container align="center" gap={12} className="w-100 project-header">
          <Text
            font="regular"
            size={14}
            fontWeight={400}
            lineHeight={20}
            color="--primary-light"
          >
            <Trans
              i18nKey="projectForm.header.status"
              values={{ status: 'Running' }}
              components={{
                text: (
                  <Text
                    font="regular"
                    size={14}
                    fontWeight={400}
                    lineHeight={20}
                    color="--primary-default"
                  />
                ),
              }}
            />
          </Text>
          <Button className="header-button info" iconLeft="pause">
            {t('projectForm.pause')}
          </Button>
          <Button className="header-button error" iconLeft="stop">
            {t('projectForm.stop')}
          </Button>
        </Container>
      }
      footer={
        <>
          {step > 0 && (
            <Button
              variant="pure"
              className="project-form-back"
              iconLeft="arrow-left"
              onClick={() => setStep(prev => prev - 1)}
            >
              {t('common.back')}
            </Button>
          )}
          <div className="flex-1" />
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
            {step < 2 ? t('saveChanges') : t('projectForm.launchProject')}
          </Button>
        </>
      }
    >
      <Container col gap={24}>
        <Stepper
          steps={[
            {
              index: 0,
              label: t('projectForm.projectInformation'),
              optional: false,
            },
            {
              index: 1,
              label: t('projectForm.typeVector'),
              optional: false,
            },
            {
              index: 2,
              label: t('projectForm.settings'),
              optional: false,
            },
          ]}
          currentStep={step}
          onStep={(_idx: number) => setStep(_idx)}
        />
        <Form>
          {step === 0 && (
            <ProjectInformation
              control={control}
              linkedToStrategic={linkedToStrategic}
              onChangeLinked={setLinkedToStrategic}
            />
          )}
          {step === 1 && <TypeVector control={control} />}
          {step === 2 && <Settings control={control} />}
        </Form>
      </Container>
    </Modal>
  )
}

export default ProjectForm
