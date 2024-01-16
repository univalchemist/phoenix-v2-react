import React from 'react'

import { t } from '@/i18n'
import { useProjectPlan } from '@/hooks'
import { Container, Text } from '@/components'
import ElementsWrapper from './elements-wrapper'
import ElementWrapper from './element-wrapper'
import DiagramLabel from './diagram-label'
import AddButton from './add-button'

interface Props {
  onAddNewAction: () => void
}

const ActionList: React.FC<Props> = ({ onAddNewAction }) => {
  const { currentVector } = useProjectPlan()

  return (
    <Container col gap={4} className="diagram-element action-list-container">
      <ElementsWrapper>
        {currentVector?.actions.map(a => (
          <ElementWrapper key={a.id}>
            <Text
              font="medium"
              size={18}
              lineHeight={24}
              fontWeight={500}
              color="--black"
            >
              {a.name}
            </Text>
          </ElementWrapper>
        ))}
        {currentVector && (
          <ElementWrapper className="no-hover">
            <AddButton
              text={t('projectPlanPage.addActionItem')}
              onClick={onAddNewAction}
            />
          </ElementWrapper>
        )}
      </ElementsWrapper>
      <DiagramLabel text={t('projectPlanPage.actionLists')} />
    </Container>
  )
}

export default ActionList
