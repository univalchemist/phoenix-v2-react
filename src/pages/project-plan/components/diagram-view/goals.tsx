import React, { useMemo } from 'react'
import classNames from 'classnames'

import { t } from '@/i18n'
import { useProject, useProjectPlan } from '@/hooks'
import { IVectorGoal } from '@/types'
import { Container, Text } from '@/components'
import ElementsWrapper from './elements-wrapper'
import ElementWrapper from './element-wrapper'
import DiagramLabel from './diagram-label'
import AddButton from './add-button'

interface Props {
  onAddNewGoal: () => void
}

const Goals: React.FC<Props> = ({ onAddNewGoal }) => {
  const { currentProject } = useProject()
  const { currentGoal, currentVector, onSelectGoal } = useProjectPlan()

  const goals: IVectorGoal[] = useMemo(() => {
    const _goals: IVectorGoal[] = []

    currentProject?.vectors.forEach(v => {
      if (v.goal) {
        _goals.push(v.goal)
      }
    })

    return _goals
  }, [currentProject?.vectors])

  return (
    <Container col gap={4} className="diagram-element goals-container">
      <ElementsWrapper>
        {goals.map(g => (
          <ElementWrapper
            key={g.id}
            className={classNames({ active: g.id === currentGoal?.id })}
            onClick={() => onSelectGoal(g)}
          >
            <Text
              font="medium"
              size={18}
              lineHeight={24}
              fontWeight={500}
              color="--black"
            >
              {g.name}
            </Text>
          </ElementWrapper>
        ))}
        {currentVector && (
          <ElementWrapper className="no-hover">
            <AddButton
              text={t('projectPlanPage.addGoal')}
              onClick={onAddNewGoal}
            />
          </ElementWrapper>
        )}
      </ElementsWrapper>
      <DiagramLabel text={t('projectPlanPage.goal')} />
    </Container>
  )
}

export default Goals
