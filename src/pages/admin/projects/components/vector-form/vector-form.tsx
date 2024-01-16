import React, { useCallback, useEffect, useMemo } from 'react'

import { useHookForm } from '@/hooks'
import { vectorSchema } from '@/utils'
import {
  Button,
  Container,
  Modal,
  RichTextEditor,
  Select,
  TextInput,
} from '@/components'
import { IVector, IVectorForm } from '@/types'
import { t } from '@/i18n'
import './vector-form.scss'

interface Props {
  data?: IVector
  isOpen: boolean
  onSave: (_data: IVectorForm, _id?: string) => void
  onClose: () => void
}

const VectorForm: React.FC<Props> = ({ data, isOpen, onSave, onClose }) => {
  const initialData: IVectorForm = useMemo(() => {
    if (!data) {
      return {
        status: 'pending',
      } as IVectorForm
    }

    return { ...data }
  }, [data])

  const {
    Controller,
    handler: { control, handleSubmit, reset },
  } = useHookForm(vectorSchema, {
    defaultValues: initialData,
  })

  useEffect(() => {
    if (!isOpen) {
      reset()
      return
    }
    if (isOpen) {
      reset(initialData)
    }
  }, [initialData, isOpen, reset])

  const _onSave = useCallback(
    () =>
      handleSubmit(val => {
        onSave({ ...val, status: data?.status || 'pending' }, data?.id)
        onClose()
      }),
    [handleSubmit, onSave, data?.status, data?.id, onClose],
  )

  return (
    <Modal
      className="vector-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      header={t('vectorForm.vectorSettings')}
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
      <Container col gap={16}>
        <div className="form-fields">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                required
                label={t('vectorForm.vectorName')}
                placeholder={t('vectorForm.findInformation')}
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
            name="description"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <RichTextEditor
                label={t('vectorForm.vectorDescription')}
                placeholder={t('vectorForm.typeHere')}
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
            name="measurementType"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select<string>
                label={t('vectorForm.vectorMeasurementType')}
                value={value}
                className="w-100"
                placement="bottom-start"
                positioning="fixed"
                onChange={_option => onChange(_option.value)}
                options={[]}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className="form-fields">
          <Controller
            control={control}
            name="vision"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                required
                label={t('vectorForm.vectorVision')}
                placeholder={t('vectorForm.enterVectorVision')}
                error={error?.message}
                className="w-100"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
      </Container>
    </Modal>
  )
}

export default VectorForm
