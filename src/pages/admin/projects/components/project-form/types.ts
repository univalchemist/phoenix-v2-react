import { Control } from 'react-hook-form'
import { TProjectSurveyInterval, TQuestionModeling } from '@/types'

export type TControl = Control<
  {
    title: string
    from: string | undefined
    to: string | undefined
    type: string | undefined
    purpose: string
    goal: string
    goalLinked: string | undefined
    challenge: string | undefined
    vectors: string[] | undefined
    surveyInterval: TProjectSurveyInterval | undefined
    baselineDate: string | undefined
    questionModeling: TQuestionModeling | undefined
  },
  any
>
