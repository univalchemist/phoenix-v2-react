import React from 'react'

import { t } from '@/i18n'
import { Container, Text } from '@/components'
import ElementsWrapper from './elements-wrapper'
import ElementWrapper from './element-wrapper'
import DiagramLabel from './diagram-label'

const ProjectGoal: React.FC = () => {
  return (
    <Container col gap={4} className="diagram-element project-goal-container">
      <ElementsWrapper>
        <ElementWrapper>
          <Text
            font="medium"
            size={18}
            lineHeight={24}
            fontWeight={500}
            color="--black"
          >
            {t('projectPlanPage.projectGoalDesc')}
          </Text>
        </ElementWrapper>
      </ElementsWrapper>
      <DiagramLabel text={t('projectPlanPage.projectGoal')} />
    </Container>
  )
}

export default ProjectGoal
