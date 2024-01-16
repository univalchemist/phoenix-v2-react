import React from 'react'

import { IProject } from '@/types'
import { Container, Text } from '@/components'
import { t } from '@/i18n'

interface Props {
  data: IProject[]
}

const Projects: React.FC<Props> = ({ data }) => {
  if (!data.length) return null

  return (
    <Container col gap={2} className="w-100 search-result projects">
      <Text
        font="medium"
        fontWeight={500}
        size={12}
        lineHeight={16}
        color="--primary-default"
        className="title"
      >
        {t('adminHomePage.projects')}
      </Text>
      {data.map(datum => (
        <Container
          key={datum.id}
          col
          gap={4}
          className="w-100 search-result-item"
        >
          <Text
            ellipsis
            font="medium"
            fontWeight={500}
            size={14}
            lineHeight={20}
            color="--primary-dark"
            className="name"
          >
            {datum.title}
          </Text>
        </Container>
      ))}
    </Container>
  )
}

export default Projects
