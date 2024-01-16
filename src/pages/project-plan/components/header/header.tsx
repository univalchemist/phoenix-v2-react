import React from 'react'
import classNames from 'classnames'
import { Trans } from 'react-i18next'

import { Container, Button, Text } from '@/components'
import { t } from '@/i18n'
import { useProjectPlan, useProject } from '@/hooks'
import Projects from '../projects/projects'
import './header.scss'

export const Header: React.FC = () => {
  const { currentProject } = useProject()
  const { viewMode, onChangeViewMode } = useProjectPlan()

  return (
    <Container align="center" className="w-100 project-plan-header">
      <Container col gap={6}>
        <Projects />
        <Container gap={24} align="center">
          <Text
            font="medium"
            size={12}
            fontWeight={500}
            lineHeight={16}
            color="--primary-light"
          >
            <Trans
              i18nKey="projectPlanPage.projectTime"
              values={{ time: 'Mar. 30th - Sep. 31' }}
              components={{
                text: (
                  <Text
                    font="regular"
                    size={12}
                    fontWeight={400}
                    lineHeight={16}
                    color="--primary-default"
                  />
                ),
              }}
            />
          </Text>
          <Text
            font="medium"
            size={12}
            fontWeight={500}
            lineHeight={16}
            color="--primary-light"
          >
            <Trans
              i18nKey="projectPlanPage.surveyInterval"
              values={{ interval: 'Monthly' }}
              components={{
                text: (
                  <Text
                    font="regular"
                    size={12}
                    fontWeight={400}
                    lineHeight={16}
                    color="--primary-default"
                  />
                ),
              }}
            />
          </Text>
          <Text
            font="medium"
            size={12}
            fontWeight={500}
            lineHeight={16}
            color="--primary-light"
          >
            <Trans
              i18nKey="projectPlanPage.vectors"
              values={{ count: currentProject?.vectors.length || 0 }}
              components={{
                text: (
                  <Text
                    font="regular"
                    size={12}
                    fontWeight={400}
                    lineHeight={16}
                    color="--primary-default"
                  />
                ),
              }}
            />
          </Text>
        </Container>
      </Container>
      <div className="flex-1" />
      <Container align="center" className="view-mode-container">
        <Button
          size="lg"
          variant="outline"
          className={classNames('view-mode-button', {
            active: viewMode === 'circle',
          })}
          onClick={() => onChangeViewMode('circle')}
        >
          {t('projectPlanPage.circleView')}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={classNames('view-mode-button', {
            active: viewMode === 'diagram',
          })}
          onClick={() => onChangeViewMode('diagram')}
        >
          {t('projectPlanPage.diagramView')}
        </Button>
      </Container>
    </Container>
  )
}

export default Header
