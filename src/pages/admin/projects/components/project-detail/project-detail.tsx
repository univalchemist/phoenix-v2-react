import React from 'react'
import classNames from 'classnames'

import { IProject, TFunc } from '@/types'
import { Avatar, Container, Modal, Text } from '@/components'
import { t } from '@/i18n'

import './project-detail.scss'

interface Props {
  isOpen: boolean
  project: IProject | undefined
  onClose: TFunc
}

const activeSurveys = [
  {
    name: 'All Brand',
    duration: '30 Mar, 23 - 12 Sep, 23',
  },
  {
    name: 'Company culture',
    duration: '01 May, 23 - 01 Sep, 23',
  },
]

const nextSurveys = [
  {
    name: 'All Brand',
    duration: '01 Jun, 23 - 12 Aug, 23',
  },
]

const completedSurveys = [
  {
    name: 'All Brand',
    duration: '01 Jun, 23 - 12 Aug, 23',
  },
  {
    name: 'Company culture',
    duration: '01 Jun, 23 - 12 Aug, 23',
  },
]

const ProjectDetail: React.FC<Props> = ({ isOpen, project, onClose }) => {
  return (
    <Modal
      isOpen={!!project && isOpen}
      className="project-detail-modal"
      header={
        <Container
          align="center"
          gap={8}
          className="project-detail-modal-header"
        >
          <Avatar
            className="project-pic"
            size={40}
            initials={project?.title.split(' ')}
          />
          <Text
            font="medium"
            size={14}
            fontWeight={500}
            lineHeight={20}
            color="--primary-dark"
          >
            {project?.title}
          </Text>
        </Container>
      }
      onClose={onClose}
    >
      <Container col gap={20} className="project-detail-modal-body">
        {!!activeSurveys.length && (
          <Container col className="w-100 project-surveys-container">
            <Text
              font="medium"
              size={16}
              fontWeight={500}
              lineHeight={20}
              color="--primary-default"
              className="container-title"
            >
              {t('adminProjectsPage.modal.activeSurveys')}
            </Text>
            {activeSurveys.map((s, idx) => (
              <Container
                key={`active-${idx}`}
                col
                gap={4}
                className="survey-item"
              >
                <Container align="center" gap={6}>
                  <div
                    className={classNames('survey-status', { active: true })}
                  />
                  <Text
                    font="regular"
                    size={16}
                    fontWeight={500}
                    lineHeight={20}
                    color="--primary-light"
                  >
                    {s.name}
                  </Text>
                </Container>

                <Text
                  font="regular"
                  size={14}
                  fontWeight={400}
                  lineHeight={20}
                  color="--primary-dark"
                >
                  {s.duration}
                </Text>
              </Container>
            ))}
          </Container>
        )}

        {!!nextSurveys.length && (
          <Container col className="w-100 project-surveys-container">
            <Text
              font="medium"
              size={16}
              fontWeight={500}
              lineHeight={20}
              color="--primary-default"
              className="container-title"
            >
              {t('adminProjectsPage.modal.nextSurveys')}
            </Text>
            {nextSurveys.map((s, idx) => (
              <Container
                key={`next-${idx}`}
                col
                gap={4}
                className="survey-item"
              >
                <Container align="center" gap={6}>
                  <div
                    className={classNames('survey-status', { next: true })}
                  />
                  <Text
                    font="regular"
                    size={16}
                    fontWeight={500}
                    lineHeight={20}
                    color="--primary-light"
                  >
                    {s.name}
                  </Text>
                </Container>

                <Text
                  font="regular"
                  size={14}
                  fontWeight={400}
                  lineHeight={20}
                  color="--primary-dark"
                >
                  {s.duration}
                </Text>
              </Container>
            ))}
          </Container>
        )}

        {!!completedSurveys.length && (
          <Container col className="w-100 project-surveys-container">
            <Text
              font="medium"
              size={16}
              fontWeight={500}
              lineHeight={20}
              color="--primary-default"
              className="container-title"
            >
              {t('adminProjectsPage.modal.completedSurveys')}
            </Text>
            {completedSurveys.map((s, idx) => (
              <Container
                key={`completed-${idx}`}
                col
                gap={4}
                className="survey-item"
              >
                <Container align="center" gap={6}>
                  <div
                    className={classNames('survey-status', { completed: true })}
                  />
                  <Text
                    font="regular"
                    size={16}
                    fontWeight={500}
                    lineHeight={20}
                    color="--primary-light"
                  >
                    {s.name}
                  </Text>
                </Container>

                <Text
                  font="regular"
                  size={14}
                  fontWeight={400}
                  lineHeight={20}
                  color="--primary-dark"
                >
                  {s.duration}
                </Text>
              </Container>
            ))}
          </Container>
        )}
      </Container>
    </Modal>
  )
}

export default ProjectDetail
