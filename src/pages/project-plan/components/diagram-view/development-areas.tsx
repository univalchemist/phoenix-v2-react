import React from 'react'
import classNames from 'classnames'

import { t } from '@/i18n'
import { useProject, useProjectPlan } from '@/hooks'
import { Container, Text } from '@/components'
import ElementsWrapper from './elements-wrapper'
import ElementWrapper from './element-wrapper'
import DiagramLabel from './diagram-label'
import AddButton from './add-button'

interface Props {
  onAddNewVector: () => void
}

const DevelopmentAreas: React.FC<Props> = ({ onAddNewVector }) => {
  const { currentProject } = useProject()
  const { currentVector, onSelectVector } = useProjectPlan()

  return (
    <Container
      col
      gap={4}
      className="diagram-element development-areas-container"
    >
      <ElementsWrapper>
        {currentProject?.vectors.map(v => (
          <ElementWrapper
            key={v.id}
            className={classNames({ active: v.id === currentVector?.id })}
            onClick={() => onSelectVector(v)}
          >
            <Text
              font="medium"
              size={18}
              lineHeight={24}
              fontWeight={500}
              color="--black"
            >
              {v.name}
            </Text>
          </ElementWrapper>
        ))}
        <ElementWrapper className="no-hover">
          <AddButton
            text={t('projectPlanPage.addDevelopmentArea')}
            onClick={onAddNewVector}
          />
        </ElementWrapper>
      </ElementsWrapper>
      <DiagramLabel text={t('projectPlanPage.developmentAreas')} />
    </Container>
  )
}

export default DevelopmentAreas
