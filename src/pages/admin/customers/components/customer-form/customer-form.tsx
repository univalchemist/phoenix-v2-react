import React, { useCallback, useEffect, useMemo } from 'react'

import { useHookForm } from '@/hooks'
import { customerSchema } from '@/utils'
import { ICustomer, ICustomerForm, IOption } from '@/types'
import {
  Button,
  Container,
  Form,
  Modal,
  Select,
  TextInput,
  UsersSelector,
} from '@/components'
import { t } from '@/i18n'
import { mockUsers } from '@/utils/mock'

import './customer-form.scss'

interface Props {
  data?: ICustomer
  isOpen: boolean
  onSave?: (_data: ICustomerForm, _id?: string) => void
  onClose: () => void
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

const CustomerForm: React.FC<Props> = ({ data, isOpen, onSave, onClose }) => {
  const initialData: ICustomerForm = useMemo(() => {
    if (!data) {
      return {
        companyName: '',
        representatives: [],
        language: 'English',
      } as ICustomerForm
    }

    return { ...data }
  }, [data])

  const {
    Controller,
    handler: {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    },
  } = useHookForm(customerSchema, {
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
        onSave?.(val, data?.id)
        onClose()
      }),
    [handleSubmit, onSave, data?.id, onClose],
  )

  return (
    <Modal
      className="customer-modal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      header={
        data
          ? t('customerForm.editCustomer')
          : t('customerForm.createNewCustomer')
      }
      subTitle={t('customerForm.formDesc')}
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
      <Form>
        <Container col gap={16}>
          <div className="form-fields">
            <Controller
              control={control}
              name="companyName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  required
                  label={t('customerForm.companyName')}
                  placeholder={t('customerForm.addCompanyName')}
                  error={errors.companyName?.message}
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
              name="customerNumber"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={t('customerForm.customerNumber')}
                  placeholder={t('customerForm.enterCustomerNumber')}
                  error={errors.customerNumber?.message}
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
              render={({ field: { onChange, value } }) => (
                <Select<string>
                  required
                  label={t('customerForm.language')}
                  value={value}
                  className="w-100"
                  placement="bottom-start"
                  positioning="fixed"
                  onChange={_option => onChange(_option.value)}
                  options={languageOptions}
                  error={errors.language?.message}
                />
              )}
            />
          </div>
          <div className="form-fields">
            <Controller
              control={control}
              name="industry"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={t('customerForm.industry')}
                  placeholder="e.g. Finance"
                  error={errors.industry?.message}
                  className="w-50"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="foundedYear"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  type="number"
                  min={2000}
                  max={new Date().getFullYear()}
                  label={t('customerForm.foundedYear')}
                  placeholder="e.g. 2000"
                  error={errors.foundedYear?.message}
                  className="w-50"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="form-fields">
            <Controller
              control={control}
              name="numberOfEmployees"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  type="number"
                  min={0}
                  label={t('customerForm.numOfEmployees')}
                  placeholder="e.g. 24"
                  error={errors.numberOfEmployees?.message}
                  className="w-50"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="numberOfBusinessUnits"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  type="number"
                  min={0}
                  label={t('customerForm.numOfBusinessUnits')}
                  placeholder="e.g. 124"
                  error={errors.numberOfBusinessUnits?.message}
                  className="w-50"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="form-fields">
            <Controller
              control={control}
              name="customerPosition"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={t('customerForm.customerPositionOptional')}
                  placeholder={t('customerForm.enterCustomerNumberPosition')}
                  error={errors.customerPosition?.message}
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
              name="representatives"
              render={({ field: { onChange, value } }) => (
                <UsersSelector<'multi'>
                  label={t('customerForm.customerRepresentatives')}
                  value={value}
                  type="multi"
                  placeholder={t('searchSelect')}
                  className="w-100"
                  placement="bottom-start"
                  positioning="fixed"
                  onChange={_value => onChange(_value)}
                  data={users}
                  error={errors.representatives?.message}
                />
              )}
            />
          </div>
        </Container>
      </Form>
    </Modal>
  )
}

export default CustomerForm
