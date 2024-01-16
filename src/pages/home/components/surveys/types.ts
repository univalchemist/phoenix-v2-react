export interface ISurvey {
  key: string
  total: number
  color: string
}

export interface ISurveysProps {
  category: 'previous' | 'upcoming'
}

export interface ISurveyProps {
  data: ISurvey
  isHidden: boolean
  category: 'previous' | 'upcoming'
  onAction: (_id: string) => void
}
