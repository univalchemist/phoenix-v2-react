import React from 'react'
import { Trans } from 'react-i18next'
import classNames from 'classnames'

import { Container, DateTime, Text } from '@/components'
import { getStatusLabel } from '@/utils'
import { IProjectItemProps } from './types'
import './projects.scss'

const ProjectItem: React.FC<IProjectItemProps> = ({
  className,
  project,
  onClick,
}) => {
  return (
    <Container
      col
      gap={6}
      className={classNames('project-item', className)}
      onClick={onClick}
    >
      <Text
        font="semibold"
        size={20}
        lineHeight={24}
        color="--primary-dark"
        className="project-title"
      >
        {project?.title}
      </Text>
      <Container gap={10} align="center" justify="space-between">
        <Trans
          i18nKey="homePage.createdOn"
          components={{
            text: (
              <Text
                font="medium"
                size={12}
                lineHeight={16}
                color="--primary-light"
              />
            ),
            datetime: (
              <DateTime value={project?.createdAt} format="MMM. DD, YYYY" />
            ),
          }}
        />
        <Text font="regular" size={12} lineHeight={16} color="--green-light">
          {getStatusLabel(project?.status)}
        </Text>
      </Container>
    </Container>
  )
}

export default ProjectItem
