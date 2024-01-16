import React from 'react'

import { t } from '@/i18n'
import { useProject } from '@/hooks'
import { Container, Icon, Popover, Text } from '@/components'
import ProjectItem from './project'
import './projects.scss'

const Projects: React.FC = () => {
  const { projects, currentProject, onSelectProject } = useProject()
  if (!currentProject) return null

  return (
    <Popover
      placement="bottom-start"
      WrapEl="div"
      className="projects-wrapper"
      button={
        <Container gap={12} align="center" className="project-item-container">
          <Text
            font="semibold"
            fontWeight={600}
            size={20}
            lineHeight={24}
            color="--primary-dark"
          >
            {t('projectPlanPage.selectedProjectPlan', {
              project: currentProject.title,
            })}
          </Text>
          <Icon name="chevron-down" />
        </Container>
      }
    >
      {onClose => (
        <Container col className="projects-container custom-scrollbar">
          {projects.map(project => (
            <ProjectItem
              key={project.id}
              className="select-item hoverable"
              project={project}
              onClick={() => {
                onClose()
                onSelectProject(project.id)
              }}
            />
          ))}
        </Container>
      )}
    </Popover>
  )
}

export default Projects
