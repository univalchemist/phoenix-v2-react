import React, { useCallback, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Container, Select, Text, Button } from '@/components'
import { t } from '@/i18n'
import { mockProjectTypes } from '@/utils/mock'
import { IOption, IVector } from '@/types'
import VectorForm from '../vector-form/vector-form'
import VectorsList from './vectors-list'
import QuestionsList from './questions-list'

import { TControl } from './types'

interface Props {
  control: TControl
}

const projectTypes = mockProjectTypes(6)

const typeOptions: IOption<string>[] = projectTypes.map(t => ({
  label: t.name,
  value: t.id,
}))

const TypeVector: React.FC<Props> = ({ control }) => {
  const [vector, setVector] = useState<IVector | undefined>()
  const [mode, setMode] = useState<'vector' | 'questions' | undefined>()

  const onBackToVectors = useCallback(() => {
    setMode(undefined)
    setVector(undefined)
  }, [])

  return (
    <Container col gap={16}>
      <Container col gap={8}>
        {mode === 'questions' ? (
          <QuestionsList vector={vector} onBackToVectors={onBackToVectors} />
        ) : (
          <>
            <div className="form-fields">
              <Controller
                control={control}
                name="type"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Select<string>
                    required
                    label={t('projectForm.projectType')}
                    value={value}
                    className="w-100"
                    placement="bottom-start"
                    positioning="fixed"
                    onChange={_option => onChange(_option.value)}
                    options={typeOptions}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <VectorsList
              onSelectVector={(_v, _m) => {
                setVector(_v)
                setMode(_m)
              }}
            />
          </>
        )}
      </Container>
      <Container align="center" gap={8}>
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('projectForm.generateQuestion')}
        </Text>
        <div className="flex-1" />
        <Button className="generate-btn" variant="hybrid-success" size="md">
          {t('projectForm.generate')}
        </Button>
        <Text
          className="question-status"
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-default"
        >
          45%
        </Text>
      </Container>
      <VectorForm
        data={vector}
        isOpen={mode === 'vector'}
        onSave={(_d, _id) => {
          console.log({ _d, _id })
        }}
        onClose={() => {
          setVector(undefined)
          setMode(undefined)
        }}
      />
    </Container>
  )
}

export default TypeVector
