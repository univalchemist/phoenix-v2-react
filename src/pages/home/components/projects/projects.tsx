import React from 'react'

import { useProject } from '@/hooks'
import { Container, Icon, Popover } from '@/components'
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
        <Container
          gap={12}
          align="flex-start"
          className="project-item-container"
        >
          <ProjectItem project={currentProject} />
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
