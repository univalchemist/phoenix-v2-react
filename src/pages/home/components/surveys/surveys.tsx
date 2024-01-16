import React, { useMemo } from 'react'

import { t } from '@/i18n'
import { Container, Text } from '@/components'
import { useProject } from '@/hooks'
import Survey from './survey'
import { ISurveysProps, ISurvey } from './types'
import './surveys.scss'

const Surveys: React.FC<ISurveysProps> = ({ category }) => {
  const { surveyStats, hiddenSurveyKeys, onToggleSurvey } = useProject()

  const surveys = useMemo(() => {
    const _surveys: ISurvey[] = []
    if (surveyStats) {
      Object.keys(surveyStats).forEach(s => {
        const total = Object.keys(surveyStats[s]).reduce((acc, cur) => {
          if (cur !== 'color') {
            acc += +surveyStats[s][cur]
          }

          return acc
        }, 0)
        _surveys.push({
          key: s,
          total,
          color: `${surveyStats[s].color}` || '#A4E860',
        })
      })
    }

    return _surveys
  }, [surveyStats])

  if (!surveys.length) return null

  return (
    <Container col gap={14} className="surveys-wrapper">
      <Text font="medium" size={16} lineHeight={20} color="--primary-default">
        {category === 'previous'
          ? t('homePage.prevSurveys')
          : t('homePage.upSurveys')}
      </Text>
      <Container col gap={24}>
        {surveys.map(s => (
          <Survey
            key={s.key}
            category={category}
            data={s}
            isHidden={hiddenSurveyKeys.includes(s.key)}
            onAction={(_key: string) => onToggleSurvey(_key)}
          />
        ))}
      </Container>
    </Container>
  )
}

export default Surveys
