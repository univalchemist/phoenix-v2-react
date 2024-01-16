import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { t } from '@/i18n'
import { useHookForm } from '@/hooks'
import { rteImageFormSchema, rteLinkFormSchema } from '@/utils'
import { Container, Popover, TextInput, Button } from '@/components'
import { TFunc } from '@/types'
import ICRTEUnordered from '@/assets/icons/ic-rte-unordered.svg'
import ICRTEOrdered from '@/assets/icons/ic-rte-ordered.svg'
import ICRTEBold from '@/assets/icons/ic-rte-bold.svg'
import ICRTEItalic from '@/assets/icons/ic-rte-italic.svg'
import ICRTEBigH from '@/assets/icons/ic-rte-big-h.svg'
import ICRTESmallH from '@/assets/icons/ic-rte-small-h.svg'
import ICRTEQuote from '@/assets/icons/ic-rte-quote.svg'
import ICRTELink from '@/assets/icons/ic-rte-link.svg'
import ICRTEImage from '@/assets/icons/ic-rte-image.svg'

interface Props {
  config: any
  onChange: any
  currentState: any
}

export const RTEList: React.FC<Props> = ({ currentState, onChange }) => {
  return (
    <div className="rte-toolbar-btn-group">
      <div
        className={classNames('rte-toolbar-btn', {
          active:
            currentState?.listType && currentState.listType === 'unordered',
        })}
        onClick={() => onChange('unordered')}
      >
        <ICRTEUnordered />
      </div>
      <div
        className={classNames('rte-toolbar-btn', {
          active: currentState?.listType && currentState.listType === 'ordered',
        })}
        onClick={() => onChange('ordered')}
      >
        <ICRTEOrdered />
      </div>
    </div>
  )
}

export const RTEInline: React.FC<Props> = ({ currentState, onChange }) => {
  return (
    <div className="rte-toolbar-btn-group">
      <div
        className={classNames('rte-toolbar-btn', {
          active: currentState?.bold,
        })}
        onClick={() => onChange('bold')}
      >
        <ICRTEBold />
      </div>
      <div
        className={classNames('rte-toolbar-btn', {
          active: currentState?.italic,
        })}
        onClick={() => onChange('italic')}
      >
        <ICRTEItalic />
      </div>
    </div>
  )
}

export const RTEBlock: React.FC<Props> = ({ currentState, onChange }) => {
  return (
    <div className="rte-toolbar-btn-group">
      <div
        className={classNames('rte-toolbar-btn', {
          active: currentState?.blockType === 'H1',
        })}
        onClick={() => onChange('H1')}
      >
        <ICRTEBigH />
      </div>
      <div
        className={classNames('rte-toolbar-btn', {
          active: currentState?.blockType === 'H6',
        })}
        onClick={() => onChange('H6')}
      >
        <ICRTESmallH />
      </div>
      <div
        className={classNames('rte-toolbar-btn', {
          active: currentState?.blockType === 'Blockquote',
        })}
        onClick={() => onChange('Blockquote')}
      >
        <ICRTEQuote />
      </div>
    </div>
  )
}

export const RTELink: React.FC<Props> = ({
  currentState,
  config,
  onChange,
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const {
    handler: {
      register,
      handleSubmit,
      trigger,
      setValue,
      clearErrors,
      formState: { errors },
    },
  } = useHookForm(rteLinkFormSchema, {
    defaultValues: {
      text: currentState?.selectionText || currentState?.link?.title || '',
      link: currentState?.link?.target || '',
    },
  })

  useEffect(() => {
    if (opened) {
      if (currentState?.selectionText || currentState?.link?.title) {
        setValue(
          'text',
          currentState?.selectionText || currentState?.link?.title || '',
        )
        trigger('text')
      }
      if (currentState?.link?.target) {
        setValue('link', currentState?.link?.target || '')
        trigger('link')
      }
    } else {
      setValue('text', '')
      setValue('link', '')
      clearErrors()
    }
  }, [
    currentState?.link?.target,
    currentState?.link?.title,
    currentState?.selectionText,
    opened,
    setValue,
    trigger,
    clearErrors,
  ])

  const onAdd: (
    _onClose: TFunc,
  ) => SubmitHandler<yup.InferType<typeof rteLinkFormSchema>> = useCallback(
    onClose => data => {
      onChange('link', data.text, data.link, config.defaultTargetOption)
      onClose()
    },
    [config.defaultTargetOption, onChange],
  )

  return (
    <div className="rte-toolbar-btn-group">
      <Popover
        placement="top-center"
        distance={4}
        WrapEl="div"
        className="rte-popover"
        onOpened={() => setOpened(true)}
        onClosed={() => setOpened(false)}
        button={
          <div
            className={classNames('rte-toolbar-btn', {
              active: currentState?.bold,
            })}
          >
            <ICRTELink />
          </div>
        }
      >
        {onClose => (
          <Container col gap={8} className="link-fields-container">
            <div className="form-fields">
              <TextInput
                label={t('text')}
                className="toolbar-input"
                error={errors.text?.message?.toString()}
                {...register('text')}
              />
            </div>
            <div className="form-fields">
              <TextInput
                label={t('link')}
                className="toolbar-input"
                error={errors.link?.message?.toString()}
                {...register('link')}
              />
            </div>
            <Container reversed align="center">
              <Button
                variant="pure"
                size="md"
                className="rte-popup-btn"
                onClick={handleSubmit(onAdd(onClose))}
              >
                {t('add')}
              </Button>
              <Button
                variant="pure"
                size="md"
                className="rte-popup-btn"
                onClick={onClose}
              >
                {t('cancel')}
              </Button>
            </Container>
          </Container>
        )}
      </Popover>
    </div>
  )
}

export const RTEImage: React.FC<Props> = ({
  currentState,
  config,
  onChange,
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const {
    handler: {
      register,
      handleSubmit,
      trigger,
      setValue,
      clearErrors,
      formState: { errors },
    },
  } = useHookForm(rteImageFormSchema, {
    defaultValues: {
      src: '',
      width: config.defaultSize?.width || 'auto',
      height: config.defaultSize?.height || 'auto',
    },
  })

  useEffect(() => {
    if (opened) {
      setValue('src', '')
      setValue('width', config.defaultSize?.width || 'auto')
      setValue('height', config.defaultSize?.height || 'auto')
      trigger('width')
      trigger('height')
    } else {
      clearErrors()
    }
  }, [
    clearErrors,
    config.defaultSize?.height,
    config.defaultSize?.width,
    opened,
    setValue,
    trigger,
  ])

  const onAdd: (
    _onClose: TFunc,
  ) => SubmitHandler<yup.InferType<typeof rteImageFormSchema>> = useCallback(
    onClose => data => {
      const entityData = { ...data }
      if (
        entityData.height !== undefined &&
        entityData.height !== '' &&
        !isNaN(+entityData.height)
      ) {
        entityData.height += 'px'
      }
      if (
        entityData.width !== undefined &&
        entityData.width !== '' &&
        !isNaN(+entityData.width)
      ) {
        entityData.width += 'px'
      }

      onChange(entityData.src, entityData.height, entityData.height)
      onClose()
    },
    [onChange],
  )

  return (
    <div className="rte-toolbar-btn-group">
      <Popover
        placement="top-center"
        distance={4}
        WrapEl="div"
        className="rte-popover"
        onOpened={() => setOpened(true)}
        onClosed={() => setOpened(false)}
        button={
          <div
            className={classNames('rte-toolbar-btn', {
              active: currentState?.bold,
            })}
          >
            <ICRTEImage />
          </div>
        }
      >
        {onClose => (
          <Container col gap={8} className="image-fields-container">
            <div className="form-fields">
              <TextInput
                label={t('url')}
                className="toolbar-input"
                error={errors.src?.message?.toString()}
                {...register('src')}
              />
            </div>
            <Container gap={10} align="center">
              <div className="form-fields">
                <TextInput
                  label={t('width')}
                  className="toolbar-input"
                  error={errors.width?.message?.toString()}
                  {...register('width')}
                />
              </div>
              <div className="form-fields">
                <TextInput
                  label={t('height')}
                  className="toolbar-input"
                  error={errors.height?.message?.toString()}
                  {...register('height')}
                />
              </div>
            </Container>

            <Container reversed align="center">
              <Button
                variant="pure"
                size="md"
                className="rte-popup-btn"
                onClick={handleSubmit(onAdd(onClose))}
              >
                {t('add')}
              </Button>
              <Button
                variant="pure"
                size="md"
                className="rte-popup-btn"
                onClick={onClose}
              >
                {t('cancel')}
              </Button>
            </Container>
          </Container>
        )}
      </Popover>
    </div>
  )
}
