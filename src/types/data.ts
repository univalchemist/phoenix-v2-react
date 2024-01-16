export type TUserStatus = 'pending' | 'active' | 'in-active'

export interface IUser {
  id: string
  email: string
  phone?: string
  firstName: string
  lastName: string
  status: TUserStatus
  customer: ICustomer
  profilePicture?: string
  createdAt: string
  updatedAt: string
}

export interface ISharePoint extends Object {
  id: number
  name: string
  type: number
  lastModified: string
  uploadedBy: string
  active?: boolean
}

export interface INotification {
  id: string
  title: string
  content: string
  read: boolean
  time: string
}

export interface ISurveyComment {
  id: string
  user: IUser
  comment: string
  createdAt: string
  updatedAt: string
}

export type TSurveyStatus = 'pending' | 'active' | 'in-active'

export interface IVectorSurvey {
  id: string
  question: string
  answer?: string
  value: number
  customer: ICustomer
  vectors: number
  respondents: number
  status: TSurveyStatus
  comments: ISurveyComment[]
  createdAt: string
  updatedAt: string
}

export interface IVectorGoal {
  id: string
  name: string
  target: number
  createdAt: string
  updatedAt: string
}

export type TPriority = 'high' | 'medium' | 'low' | 'crucial'

export type TActionStatus =
  | 'completed'
  | 'pending'
  | 'in-progress'
  | 'not-started'
  | 'on-hold'
  | 'overdue'

export interface IVectorAction {
  id: string
  name: string
  priority: TPriority
  due: string
  assignee: IUser
  status: TActionStatus
  createdAt: string
  updatedAt: string
}

export interface INewVectorAction
  extends Omit<IVectorAction, 'id' | 'assignee' | 'createdAt' | 'updatedAt'> {
  assignee: string
}

export type TVectorStatus = 'completed' | 'pending' | 'in-progress'

export type INewVector = Omit<
  IVector,
  | 'id'
  | 'surveys'
  | 'goal'
  | 'value'
  | 'status'
  | 'actions'
  | 'createdAt'
  | 'updateDat'
>

export interface IVector {
  id: string
  name: string
  description?: string
  measurementType?: string
  vision: string
  surveys: IVectorSurvey[]
  goal?: IVectorGoal | undefined
  value: number
  status: TVectorStatus
  actions: IVectorAction[]
  createdAt: string
  updatedAt: string
}

export type TProjectStatus = 'completed' | 'pending' | 'in-progress'

export type TProjectSurveyInterval =
  | 'every-month'
  | '2-months'
  | '3-months'
  | 'days'

export type TQuestionModeling = 'straight' | 'partly-random' | 'random'

export interface IProjectType {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface IProject {
  id: string
  title: string
  status: TProjectStatus
  vectors: IVector[]
  customer: ICustomer
  type?: string
  from?: string
  to?: string
  purpose: string
  goal: string
  goalLinked?: string
  challenge?: string
  surveyInterval?: TProjectSurveyInterval
  baselineDate?: string
  questionModeling?: TQuestionModeling
  createdAt: string
  updatedAt: string
}

export interface IVectorStat {
  [x: string]: number | string
}

export interface ISurveyStat {
  [x: string]: IVectorStat
}

export interface ICustomer {
  id: string
  email?: string
  profilePicture?: string
  companyName: string
  customerNumber?: string
  language: string
  industry?: string
  foundedYear?: string
  numberOfEmployees?: string
  numberOfBusinessUnits?: string
  customerPosition?: string
  representatives?: string[]
  projects?: number
  createdAt: string
  updatedAt: string
}
