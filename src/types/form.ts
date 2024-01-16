import { ICustomer, IProject, IVector } from './data'

export interface ICustomerForm
  extends Omit<
    ICustomer,
    'id' | 'profilePicture' | 'projects' | 'createdAt' | 'updatedAt'
  > {}

export interface IProjectForm
  extends Omit<
    IProject,
    'id' | 'customer' | 'vectors' | 'createdAt' | 'updatedAt'
  > {}

export interface IVectorForm
  extends Omit<
    IVector,
    'id' | 'surveys' | 'goal' | 'value' | 'actions' | 'createdAt' | 'updatedAt'
  > {}

export interface IUserSettingsForm {
  companyName: string
  language: string
  surveySenders: string[]
  apiKey: string
  primaryColor?: string
  useBackgroundColor?: string
  fontHeadline?: string
  fontStandard?: string
  fontMenu?: string
  upperCaseHeader?: boolean
  customerNumber: string
  owner: string
  calculationModel: string
  businessTemplate: string
}
